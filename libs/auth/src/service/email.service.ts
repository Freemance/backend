import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private readonly _mailerService: MailerService) {}

  verifyRequest(user: any, token): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Verification request" <no-replay@example.com>', // Senders email address
        subject: 'Verification request ✔', // Subject line
        template: './verify-email', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: 'https://freemance.herokuapp.com/confirm/' + token,
          username: user.username,
        },
      })
      .catch((err) => {
        console.log(err)
      })
  }

  resetPassword(user: any, token): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Reset Password" <no-replay@example.com>', // Senders email address
        subject: 'Reset Password ✔', // Subject line
        template: './reset-password', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: 'https://freemance.herokuapp.com/reset-password/' + token,
          username: user.username,
        },
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
