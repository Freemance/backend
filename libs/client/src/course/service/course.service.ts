import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateCourseInput } from '../dto/create-course.input'
import { UpdateCourseInput } from '../dto/update-course.input'

@Injectable()
export class CourseService {
  constructor(private readonly _service: DataService) {}
  private readonly includes = { profile: true }

  async createCourse(input: CreateCourseInput) {
    return this._service.course.create({
      data: {
        ...input,
      },
    })
  }

  async getAllCourse() {
    return this._service.course.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getCourseById(id: number) {
    const found = await this._service.course.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Course with id: ${id} not found`)
    }
    return found
  }

  async updateCourse(id: number, input: UpdateCourseInput) {
    const found = await this.getCourseById(id)
    return this._service.course.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteCourse(id: number) {
    const found = await this.getCourseById(id)
    const deleted = this._service.course.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
