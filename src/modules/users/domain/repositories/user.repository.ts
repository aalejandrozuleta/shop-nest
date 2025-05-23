import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract save(user: UserEntity): Promise<void>;
}
