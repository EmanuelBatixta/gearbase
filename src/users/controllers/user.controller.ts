import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto, UserResponseDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiCreatedResponse({
    description: 'User was created',
  })
  @ApiBadRequestResponse({ description: 'Invalid user data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createUser(@Body() userData: UserDto): Promise<UserResponseDto> {
    const result = await this.userService.createUser(userData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...safeResponse } = result;
    return safeResponse;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteUser(@Param('id') id: string): Promise<UserResponseDto> {
    const result = await this.userService.deleteAccount(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeResponse } = result;
    return safeResponse;
  }
}
