import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/contracts/user-repository';
import { User } from '../../domain/entities/user.entity';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async executeCreateUser(email: string, password: string): Promise<User> {
    const exists = await this.userRepository.findByEmail(email);
    if (exists) throw new Error('El email ya ha sido registrado');

    const hash = await bcrypt.hash(password, 10);
    const user = new User(email, hash);
    return this.userRepository.save(user);
  }
}
