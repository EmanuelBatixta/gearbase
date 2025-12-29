import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: {
    username: string;
    password: string;
    email: string;
  }) {
    const hash = await bcrypt.hash(data.password, 10);
    const result = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hash,
      },
    });
    return result;
  }

  async updatePassword(id: string, password: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }

  async deleteAccount(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
