import { Inject, Injectable, LoggerService } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

@Injectable()
export class EmailService {
  constructor(
    private readonly _mailerService: MailerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  verifyRequest(user: any, token): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Freemance" <noreply@freemance.com>', // Senders email address
        subject: 'Verification request ✔', // Subject line
        template: './verify-email', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL + '/confirm/' + token,
          username: user.username,
        },
      })
      .catch((err) => {
        this.logger.error(err)
      })
  }

  resetPassword(user: any, token): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Freemance" <noreply@freemance.com>', // Senders email address
        subject: 'Reset Password ✔', // Subject line
        template: './reset-password', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL + '/reset/password/' + token,
          username: user.username,
        },
      })
      .catch((err) => {
        this.logger.error(err)
      })
  }

  approvedProfile(user: any): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Freemance" <noreply@freemance.com>', // Senders email address
        subject: 'Profile Approved ✔', // Subject line
        template: './profile-approved', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL,
          username: user.username,
        },
      })
      .catch((err) => {
        this.logger.error(err)
      })
  }

  updateProfile(user: any): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Freemance" <noreply@freemance.com>', // Senders email address
        subject: 'Profile Update ✔', // Subject line
        template: './profile-pending', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL,
          username: user.username,
        },
      })
      .catch((err) => {
        this.logger.error(err)
      })
  }
}
