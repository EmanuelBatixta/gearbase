import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class createTokenDto {
  @ApiProperty({ example: 'Token_name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '7a8aa5477xo75a1s2da6' })
  @IsString()
  id: string;
}

export class revokeTokenDto {
  @ApiProperty({ example: 'Token_name' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  tokenId: number;

  @ApiProperty({ example: '7a8aa5477xo75a1s2da6' })
  @IsString()
  userId: string;
}
