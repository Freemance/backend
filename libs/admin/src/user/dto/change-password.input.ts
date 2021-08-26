import {InputType, Int, Field} from '@nestjs/graphql';
import {IsNotEmpty, IsString, MinLength} from 'class-validator'

@InputType()
export class ChangePasswordInput {
    @Field()
    @IsNotEmpty()
    @MinLength(8)
    oldPassword: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}
