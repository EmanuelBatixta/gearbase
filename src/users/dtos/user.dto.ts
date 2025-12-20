import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty({ example: 'User_name123' })
  @IsString({ message: 'Username must be a string' })
  @Transform(({ value }) => (value as string).trim())
  username: string;

  @ApiProperty({ example: 'Str@ngP4ssword123' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Transform(({ value }) => (value as string).trim())
  password: string;
}

export class UserDtoPut extends PartialType(UserDto) {}

export class UserResponseDto {
  @ApiProperty({ example: 'User_name123' })
  username: string;

  @ApiProperty({ example: '2025-12-20T17:40:46.842Z' })
  createdAt: Date;
}
