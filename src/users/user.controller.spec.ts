import { UserController } from './controllers/user.controller';

describe('UserController', () => {
  const mockUserService: any = {
    createUser: jest.fn(),
    deleteAccount: jest.fn(),
  };
  let controller: UserController;

  beforeEach(() => {
    jest.resetAllMocks();
    controller = new UserController(mockUserService);
  });

  it('createUser should return user data without id and password', async () => {
    const createdAt = new Date();
    const serviceResult = {
      id: 'abc-1',
      username: 'alice',
      email: 'alice@example.com',
      password: 'secret',
      createdAt,
    };

    mockUserService.createUser.mockResolvedValue(serviceResult);

    const dto = { username: 'alice', email: 'alice@example.com', password: 'secret' };
    const res = await controller.createUser(dto as any);

    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
    expect(res).not.toHaveProperty('password');
    expect(res).not.toHaveProperty('id');
    expect(res).toMatchObject({ username: 'alice', email: 'alice@example.com', createdAt });
  });

  it('deleteUser should return user data without password', async () => {
    const serviceResult = {
      id: 'abc-2',
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret',
      createdAt: new Date(),
    };

    mockUserService.deleteAccount.mockResolvedValue(serviceResult);

    const res = await controller.deleteUser('abc-2');

    expect(mockUserService.deleteAccount).toHaveBeenCalledWith('abc-2');
    expect(res).not.toHaveProperty('password');
    expect(res).not.toHaveProperty('id');
    expect(res).toMatchObject({ username: 'bob', email: 'bob@example.com', createdAt: expect.any(Date) });
  });
});
