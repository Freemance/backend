import { ObjectType, Field, HideField } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { User } from '@feature/auth'
import { Skill, Tag } from '@feature/admin'
import { ProfileStatus } from './profileStatus.enum'
import { SocialLink, Job, Course, Portfolio, Language } from '@feature/client'

@ObjectType()
export class Profile extends BaseModel {
  @Field({ description: 'Slyk Username' })
  slykUser: string

  @Field({ description: 'First name' })
  firstName: string

  @Field({ description: 'Last name' })
  lastName: string

  @Field(() => ProfileStatus, { description: 'Profile Status' })
  profileStatus: ProfileStatus

  @Field({ description: 'Avatar name', nullable: true })
  avatar?: string

  @Field({ description: 'JobTitle name', nullable: true })
  jobTitle?: string

  @Field({ description: 'Bio description', nullable: true })
  bio?: string

  @Field({ description: 'Country name', nullable: true })
  country?: string

  @Field({ description: 'City name', nullable: true })
  city?: string

  @Field({ description: 'Address', nullable: true })
  address?: string

  @Field({ description: 'PostalCode', nullable: true })
  postalCode?: string

  @Field({ description: 'Place of birth', nullable: true })
  placeOfBirth?: string

  @Field(() => Date, { description: 'Date of birth', nullable: true })
  dateOfBirth?: Date

  @Field({ description: 'Phone number', nullable: true })
  phone?: string

  @HideField()
  @Field(() => User, { description: 'User associated  to the profile' })
  user: User

  @Field(() => Tag, { description: 'Tag associated  to the profile', nullable: true })
  tag?: Tag

  @Field(() => [Skill], { description: 'Skills associated  to the profile' })
  skills: [Skill]

  @Field(() => SocialLink, { description: 'Social links associated  to the profile', nullable: true })
  socialLinks?: SocialLink

  @Field(() => [Job], { description: 'Jobs associated  to the profile', nullable: true })
  employmentHistory?: [Job]

  @Field(() => [Course], { description: 'Courses associated  to the profile', nullable: true })
  courses?: [Course]

  @Field(() => [Portfolio], { description: 'Portfolio associated  to the profile', nullable: true })
  portfolioItem?: [Portfolio]

  @Field(() => [Language], { description: 'Languages associated  to the profile', nullable: true })
  languages?: [Language]
}
