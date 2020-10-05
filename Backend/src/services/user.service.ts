import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities';
import { EmailNotUnique } from 'src/errors';
import { UserCreatedDto } from 'src/dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

   async create(user: UserDto): Promise<UserCreatedDto> {
    const exists = await this.findByEmail(user.email)
    if (exists) {
      throw new EmailNotUnique(user.email);
    }
    return this.savePassword(user);
  }

  async savePassword(user): Promise<UserCreatedDto> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {
          return reject(err);
        }
        return bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
          if (err) {
            return reject(err);
          }
          user.password = hash;
          return this.userRepository.save(user).then((result) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...user} = result;
            return resolve(this.userRepository.save(user));
          })
        });
      });
    });
  }

  async update(id: string, user: User | UserCreatedDto): Promise<UserCreatedDto> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  findByCode(code: string): Promise<User> {
    return this.userRepository.findByCode(code);
  }
}
