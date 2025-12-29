import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthDtoResponse } from '../dtos/auth.dtos';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(userInput: {
    username: string;
    pass: string;
  }): Promise<AuthDtoResponse | null> {
    const response = await this.prisma.user.findUnique({
      where: { username: userInput.username },
    });

    if (!response) {
      throw new UnauthorizedException('Username or password invalid');
    }
    const hash = await bcrypt.compare(userInput.pass, response.password);
    if (!hash) {
      throw new UnauthorizedException('Username or password invalid');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...secureResponse } = response;

    return secureResponse;
  }
}
