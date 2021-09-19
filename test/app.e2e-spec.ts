import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import initialData from './util/initialData'

const gql = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe(gql, () => {
    describe('filterTags', () => {
      it('should get the tags connection', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              '{filterTags(orderBy: { direction: asc, field: id }) {' +
              '    edges {' +
              '      cursor' +
              '      node {' +
              '        id' +
              '        name' +
              '      }' +
              '    }' +
              '    pageInfo {' +
              '      endCursor' +
              '      hasNextPage' +
              '      hasPreviousPage' +
              '      startCursor' +
              '    }' +
              '   totalCount' +
              '}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.filterTags).toEqual(initialData().tagConnection)
          })
      })
    })
  })
})
