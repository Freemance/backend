import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import { PageInfo } from '@feature/core/data/common/pagination/page-info.model'

interface IEdgeType<T> {
  cursor: number
  node: T
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[]
  totalCount: number
  pageInfo: PageInfo
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => Int)
    cursor: number

    @Field(() => classRef)
    node: T
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[]

    @Field(() => Int)
    totalCount: number

    @Field(() => PageInfo)
    pageInfo: PageInfo
  }
  return PaginatedType as Type<IPaginatedType<T>>
}
