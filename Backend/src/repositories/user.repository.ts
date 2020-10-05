import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<any> {
    return this.createQueryBuilder("u")
      .addSelect("u.password")
      .where({ email })
      .getOne();
  }

  findByCode(code: string): Promise<any> {
    return this.createQueryBuilder("u")
      .addSelect("u.password")
      .where({ code })
      .getOne();
  }
}
