import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateCourseInput } from '../dto/create-course.input'
import { UpdateCourseInput } from '../dto/update-course.input'

@Injectable()
export class CourseService {
  constructor(private readonly _service: DataService) {}

  async getAllProfileCourses(profileId: number) {
    return this._service.course.findMany({ where: { profileId }, orderBy: { id: 'asc' } })
  }

  async getProfileCourseById(id: number, profileId: number) {
    const found = await this._service.course.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Course with id: ${id} not found`)
    }
    if (found.profileId !== profileId) {
      throw new UnauthorizedException()
    }
    return found
  }

  async createProfileCourse(profileId: number, input: CreateCourseInput) {
    return this._service.course.create({
      data: {
        ...input,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  async updateProfileCourse(id: number, profileId: number, input: UpdateCourseInput) {
    const found = await this.getProfileCourseById(id, profileId)
    return this._service.course.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteProfileCourse(id: number, profileId: number) {
    const found = await this.getProfileCourseById(id, profileId)
    const deleted = await this._service.course.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
