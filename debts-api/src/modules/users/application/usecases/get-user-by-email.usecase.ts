import { UserResponse } from '../../domain/contracts/dtos/response/user-response';
import { UserRepository } from '../../domain/contracts/user-repository';

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');
    const userResponse = new UserResponse(user.userId!);
    return userResponse;
  }
}
