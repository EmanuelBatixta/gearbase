import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CarDto {
  @ApiProperty({ example: 'Honda' })
  @IsString({ message: 'Make must be a string' })
  @Transform(({ value }) => (value as string).trim().toUpperCase())
  make: string;

  @ApiProperty({ example: 'Civic' })
  @IsString({ message: 'Model must be a string' })
  @Transform(({ value }) => (value as string).trim().toUpperCase())
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

  @ApiProperty({ example: 'Sedan' })
  @IsString({ message: 'Category invalid value' })
  @Transform(({ value }) => (value as string).trim().toUpperCase())
  @IsEnum(['SEDAN', 'SUV', 'TRUCK', 'COUPE', 'HATCHBACK', 'VAN'])
  category: 'SEDAN' | 'SUV' | 'TRUCK' | 'COUPE' | 'HATCHBACK' | 'VAN';

  @ApiProperty({ example: 'Automatic' })
  @IsString({ message: 'Transmission invalid value' })
  @Transform(({ value }) => (value as string).trim().toUpperCase())
  @IsEnum(['MANUAL', 'AUTOMATIC'])
  transmission: 'MANUAL' | 'AUTOMATIC';

  @ApiProperty({ example: 'GASOLINE' })
  @Transform(({ value }) => (value as string).trim().toUpperCase())
  @IsString({ message: 'Fuel type invalid value' })
  @IsEnum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'ETHANOL', 'FLEX'])
  fuel_type: 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'ETHANOL' | 'FLEX';

  @ApiProperty({ example: 170 })
  @IsNumber()
  @Min(1)
  torque: number;

  @ApiProperty({ example: 7.5, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  acceleration?: number | null;
}

export class CarDtoPut extends PartialType(CarDto) {}

export class carQuery {
  @ApiProperty({ example: '?make="toyota"' })
  @IsOptional()
  make?: string;
}
