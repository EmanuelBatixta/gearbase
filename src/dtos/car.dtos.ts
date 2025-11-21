import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CarDto {
  @ApiProperty({ example: 'Honda' })
  @IsString({ message: 'Make must be a string' })
  make: string;

  @ApiProperty({ example: 'Civic' })
  @IsString({ message: 'Model must be a string' })
  model: string;

  @ApiProperty({ example: 2020 })
  @IsInt({ message: 'Year must be a number' })
  @Min(1500)
  year: number;

  @ApiProperty({ example: 205 })
  @IsInt({ message: 'Horsepower must be a number' })
  @Min(1)
  hp: number;

  @ApiProperty({ example: 12.7 })
  @IsNumber()
  @Min(1)
  city_mpg: number;

  @ApiProperty({ example: 15.8 })
  @IsNumber()
  @Min(1)
  hwy_mpg: number;
}

export class CarDtoGet extends CarDto {
  @ApiProperty({ example: 2580 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;
}

export class CarDtoPut extends PartialType(CarDto) {}
