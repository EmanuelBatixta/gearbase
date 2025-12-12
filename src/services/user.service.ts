import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: { username: string; password: string }) {
    const hash = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        username: data.username,
        password: hash,
      },
    });
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

  async login(username: string, pass: string) {
    const response = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!response) {
      return false;
    }
    //const passHash = await bcrypt.hash(password, 10);
    const hash = await bcrypt.compare(pass, response.password);
    if (!hash) {
      return false;
    }

    const { password, ...secureResponse } = response;

    return secureResponse;
  }
}
