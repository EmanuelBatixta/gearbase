import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async createToken(data: { id: string; name: string }) {
    const token = `gear_` + crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, 10);

    const result = await this.prisma.token.create({
      data: {
        userId: data.id,
        token: hash,
        name: data.name,
      },
    });
    if (!result) throw new Error('Failed to create API Key');
    return token;
  }

  async revokeToken(data: { tokenId: number; userId: string }) {
    const result = await this.prisma.token.update({
      where: { id: data.tokenId, userId: data.userId },
      data: { revoke: true },
    });
    if (!result) throw new Error('Failed to revoke API Key');
    return result;
  }

  async verifyToken(data: { apiKey: string; userId: string }) {
    //const hash = await bcrypt.hash(apiKey, 10);
    const tokens = await this.prisma.token.findMany({
      where: {
        userId: data.userId,
        revoke: false,
      },
    });

    if (!tokens || tokens.length === 0) {
      throw new UnauthorizedException('Invalid API Key');
    }

    for (const t of tokens) {
      const isValid = await bcrypt.compare(data.apiKey, t.token);
      if (isValid) {
        return true;
      }
    }
    throw new UnauthorizedException('Invalid API Key');
  }
}
