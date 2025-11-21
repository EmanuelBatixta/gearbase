import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from '../services/car.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CarDto, CarDtoGet, CarDtoPut } from '../dtos/car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @ApiOkResponse({ description: 'List of cars' })
  async getCars(): Promise<CarDtoGet[]> {
    return await this.carService.findAll();
  }

  @Get(':model')
  @ApiOkResponse({ description: 'List of cars by model' })
  async getCarByModel(
    @Param('model') model: string,
  ): Promise<CarDtoGet[] | null> {
    return await this.carService.findByModel(model);
  }

  @Get('make/:make')
  @ApiOkResponse({ description: 'List of cars by make' })
  async getCarByMake(@Param('make') make: string): Promise<CarDtoGet[] | null> {
    return await this.carService.findByMake(make);
  }

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
