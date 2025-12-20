import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async createToken(id: string, name: string) {
    const token = `gear_` + crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, 10);

    const data = {
      userId: id,
      token: hash,
      name,
    };
    await this.prisma.token.create({
      data,
    });
    return token;
  }

  async revokeToken(tokenId: number, userId: string) {
    await this.prisma.token.update({
      where: { id: tokenId, userId },
      data: { revoke: true },
    });
  }

  async verifyToken(apiKey: string, userId: string) {
    //const hash = await bcrypt.hash(apiKey, 10);
    const tokens = await this.prisma.token.findMany({
      where: {
        userId,
        revoke: false,
      },
    });

    if (!tokens || tokens.length === 0) {
      return false;
    }

    for (const t of tokens) {
      const isValid = await bcrypt.compare(apiKey, t.token);
      if (isValid) {
        return true;
      }
    }
  }
}
