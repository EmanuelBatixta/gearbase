import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from 'src/users/dtos/user.dto';
import { UserService } from 'src/users/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User was created' })
  @ApiBadRequestResponse({ description: 'Invalid user data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createUser(@Body() userData: UserDto): Promise<UserDto> {
    return await this.userService.createUser(userData);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteUser(@Param('id', ParseIntPipe) id: string): Promise<UserDto> {
    return await this.userService.deleteAccount(id);
  }
}
