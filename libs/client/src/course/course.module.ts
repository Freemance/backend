import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { CourseResolver, CourseService } from '.'

@Module({
  imports: [DataModule],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
