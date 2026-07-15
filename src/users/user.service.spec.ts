import * as bcrypt from 'bcryptjs';
import { UserService } from './services/user.service';

describe('UserService', () => {
  const mockPrisma: any = {
    user: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  let service: UserService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = new UserService(mockPrisma);
  });

  it('should hash password and call prisma.user.create when creating a user', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

    const createdAt = new Date();
    const createdUser = {
      id: 'user-id-1',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt,
    };
    mockPrisma.user.create.mockResolvedValue(createdUser);

    const result = await service.createUser({
      username: 'testuser',
      password: 'PlainP4ss!',
      email: 'test@example.com',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('PlainP4ss!', 10);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
      },
    });
    expect(result).toEqual(createdUser);
  });

  it('should call prisma.user.update when updating password', async () => {
    const updated = { id: '1', password: 'newpass', username: 'u' };
    mockPrisma.user.update.mockResolvedValue(updated);

    const res = await service.updatePassword('1', 'newpass');

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { password: 'newpass' },
    });
    expect(res).toEqual(updated);
  });

  it('should call prisma.user.delete when deleting account', async () => {
    const deleted = { id: '1', username: 'u' };
    mockPrisma.user.delete.mockResolvedValue(deleted);

    const res = await service.deleteAccount('1');

    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(res).toEqual(deleted);
  });
});
