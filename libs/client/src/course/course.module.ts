import { Module } from '@nestjs/common'
import { CourseResolver, CourseService } from '.'

@Module({
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
