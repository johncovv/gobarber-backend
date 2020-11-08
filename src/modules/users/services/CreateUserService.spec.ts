import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			name: 'John Covv',
			email: 'johncovv@example.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create two accounts with the same email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUser.execute({
			name: 'User Teste 1',
			email: 'user@example.com',
			password: '123456',
		});

		expect(
			createUser.execute({
				name: 'User Teste 2',
				email: 'user@example.com',
				password: '654321',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
