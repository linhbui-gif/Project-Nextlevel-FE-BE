import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserCreatedDto, UserTokenDto } from 'src/dto';
import { UserNotFound, CodeNotFound, CodeExpired, UserPasswordEmpty } from 'src/errors';
import { createForgotPasswordEmail, createFromField } from 'src/utils/email.template.utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService) {}

  async validateUser(email: string, pass: string): Promise<UserCreatedDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, user.password, (err: Error, res) => {
        if (err) {
          reject(err);
        }
        if (res === false) {
          reject(false);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user;
          return resolve(result);
        }
      });
    });
  }

  async login(user: UserCreatedDto): Promise<UserTokenDto> {
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(user),
    };
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UserNotFound();
    }
    const code = moment().add(2, 'weeks').unix().toString(16);
    await this.userService.update(user.id, { ...user, code });
    const html = await createForgotPasswordEmail({ ...user, code });
    await this.mailerService
      .sendMail({
        to: email,
        from: createFromField(process.env.EMAIL_FROM_NAME, process.env.EMAIL_FROM),
        subject: 'Next Level: Reset your password',
        // text: 'welcome', // plaintext body
        html,
      });
    return true;
  }

  async resetPassword(code: string, password: string): Promise<UserTokenDto> {
    if (!code) {
      throw new CodeNotFound();
    }
    if (!password) {
      throw new UserPasswordEmpty();
    }
    const expires = moment.unix(parseInt(code, 16));
    if (moment().isAfter(expires)) {
      throw new CodeExpired();
    }
    const user = await this.userService.findByCode(code);
    if (!user) {
      throw new CodeNotFound();
    }
    const updatedUser = await this.userService.savePassword({...user, password, code: null });
    return this.login(updatedUser);
  }
}