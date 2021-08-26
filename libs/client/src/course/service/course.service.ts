import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { CreateCourseInput, UpdateCourseInput } from '..'

@Injectable()
export class CourseService {
  constructor(private readonly data: DataService) {}
  private readonly includes = {}

  async createCourse(input: CreateCourseInput) {
    return this.data.course.create({
      data: {
        ...input,
      },
    })
  }

  async getAllCourse() {
    return this.data.course.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getCourseById(id: number) {
    const found = await this.data.course.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Course with id: ${id} not found`)
    }
    return found
  }

  async updateCourse(id: number, input: UpdateCourseInput) {
    const found = await this.getCourseById(id)
    return this.data.course.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteCourse(id: number) {
    const found = await this.getCourseById(id)
    const deleted = this.data.course.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
