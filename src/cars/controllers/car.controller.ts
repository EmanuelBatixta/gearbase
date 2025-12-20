import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from '../services/car.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CarDto, CarDtoGet, CarDtoPut } from '../dtos/car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @ApiOkResponse({ description: 'List of cars' })
  @ApiQuery({
    name: 'make',
    required: false,
    type: String,
    description: 'Make of car',
  })
  @ApiQuery({
    name: 'model',
    required: false,
    type: String,
    description: 'Model of car',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: 'Year of car',
  })
  async getCars(
    @Query('make') make?: string,
    @Query('model') model?: string,
    @Query('year') year?: number,
  ): Promise<CarDtoGet[]> {
    return await this.carService.findByQueries(make, model, year);
  }

  @UsePipes(ValidationPipe)
  @Post()
  @ApiCreatedResponse({ description: 'Car created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid car data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createCar(@Body() carData: CarDto): Promise<CarDto> {
    return await this.carService.createCar(carData);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Car deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteCar(@Param('id', ParseIntPipe) id: number): Promise<CarDto> {
    return await this.carService.deleteCar(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  @ApiOkResponse({ description: 'Car updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid car data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() carData: CarDtoPut,
  ): Promise<CarDtoPut> {
    return await this.carService.updateCar(id, carData);
  }
}
