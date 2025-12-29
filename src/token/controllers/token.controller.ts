import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiKeyService } from '../service/token.service';
import { createTokenDto, revokeTokenDto } from '../dtos/token.dtos';

@Controller('token')
export class ApiKeyController {
  constructor(private readonly ApiKeyService: ApiKeyService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Token was created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createToken(@Body() data: createTokenDto): Promise<object> {
    const token = await this.ApiKeyService.createToken(data);
    return { token };
  }

  @Post('revoke')
  @ApiOkResponse({ description: 'Token was revoked' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async revokeToken(@Body() data: revokeTokenDto): Promise<any> {
    return this.ApiKeyService.revokeToken(data);
  }
}
