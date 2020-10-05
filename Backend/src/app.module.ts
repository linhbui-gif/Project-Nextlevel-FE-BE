import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as controllers  from './controllers';
import * as entities from './entities';
import * as ormConfig from './ormconfig';
import * as repositories from './repositories';
import * as services from './services';
import { RolesGuard } from './guards';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature(
        [
            ...Object.values(entities),
            ...Object.values(repositories),
        ],
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    MulterModule.register({
      dest: './public/upload',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from:`"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
      preview: true,
    }),
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(services), {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
