import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const UserEntity = createParamDecorator((data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user)
