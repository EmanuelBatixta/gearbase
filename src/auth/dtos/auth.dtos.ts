import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthDto {
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
  pass: string;
}

export class AuthDtoResponse {
  @ApiProperty({ example: 'User_name123' })
  @IsString({ message: 'Username must be a string' })
  @Transform(({ value }) => (value as string).trim())
  username: string;

  @ApiProperty({ example: ' ' })
  createdAt: Date;

  @ApiProperty({ example: ' ' })
  updatedAt: Date;
}
