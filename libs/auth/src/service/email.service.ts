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
          url: process.env.APP_URL + '/confirm/' + token,
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
          url: process.env.APP_URL + '/reset/password/' + token,
          username: user.username,
        },
      })
      .catch((err) => {
        console.log(err)
      })
  }

  approvedProfile(user: any): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Profile Approved" <no-replay@example.com>', // Senders email address
        subject: 'Profile Approved ✔', // Subject line
        template: './profile-approved', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL,
          username: user.username,
        },
      })
      .catch((err) => {
        console.log(err)
      })
  }

  updateProfile(user: any): void {
    this._mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: '"Profile Update" <no-replay@example.com>', // Senders email address
        subject: 'Profile Update ✔', // Subject line
        template: './profile-pending', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url: process.env.APP_URL,
          username: user.username,
        },
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
