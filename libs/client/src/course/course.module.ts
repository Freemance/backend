import { Module } from '@nestjs/common'

@Module({
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
