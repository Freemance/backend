import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { CourseService } from './course.service'

const courseId = 1
const profileId = 1
const courseTest = 'Angular Expert'
const courseInstitution = 'JEST'
const courseDescription = 'Some learning'
const courseArray = [
  {
    id: courseId,
    course: courseTest,
    institution: courseInstitution,
    description: courseDescription,
    startDate: new Date(),
    endDate: new Date(),
    profileId: profileId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    course: 'test 2',
    institution: 'UCI',
    description: 'make test',
    startDate: new Date(),
    endDate: new Date(),
    profileId: profileId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const oneCourse = courseArray[0]

const db = {
  course: {
    findMany: jest.fn().mockResolvedValue(courseArray),
    findUnique: jest.fn().mockResolvedValue(oneCourse),
    create: jest.fn().mockReturnValue(oneCourse),
    update: jest.fn().mockResolvedValue(oneCourse),
    delete: jest.fn().mockResolvedValue(oneCourse),
  },
}
describe('CourseService', () => {
  let service: CourseService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<CourseService>(CourseService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GetAllProfileCourses', () => {
    it('should return a ProfileCourses Array', async () => {
      const courses = await service.getAllProfileCourses(profileId)
      expect(courses).toEqual(courseArray)
    })
  })
  describe('GetProfileCourseById', () => {
    it('should return a ProfileCourse', async () => {
      expect(service.getProfileCourseById(courseId, profileId)).resolves.toEqual(courseArray)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.course, 'findUnique').mockReturnValue(undefined)
      expect(service.getProfileCourseById(5, profileId)).rejects.toThrow(NotFoundException)
    })
    it('should return UnauthorizedException', () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue({ ...oneCourse, profileId: 2 })
      expect(service.getProfileCourseById(courseId, profileId)).rejects.toThrow(UnauthorizedException)
    })
  })
  describe('CreateProfileCourse', () => {
    it('should successfully insert a course', () => {
      expect(service.createProfileCourse(profileId, { ...oneCourse })).resolves.toEqual(oneCourse)
    })
  })
  describe('UpdateProfileCourse', () => {
    it('should call the update method', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue({ ...oneCourse, createdAt: null, updatedAt: null })
      const lang = await service.updateProfileCourse(courseId, profileId, { ...oneCourse })
      expect(lang).toEqual(oneCourse)
    })
    it('should return NotFoundException', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(undefined)
      await expect(service.updateProfileCourse(courseId, profileId, { ...oneCourse })).rejects.toThrow(
        NotFoundException,
      )
    })
  })
  describe('DeleteProfileCourse', () => {
    it('should return true', () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue({ ...oneCourse, createdAt: null, updatedAt: null })
      expect(service.deleteProfileCourse(courseId, profileId)).resolves.toEqual(true)
    })

    it('should return Error', () => {
      jest.spyOn(prisma.course, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'))
      expect(service.deleteProfileCourse(courseId, profileId)).rejects.toEqual(Error('Bad Delete Method.'))
    })
  })
})
