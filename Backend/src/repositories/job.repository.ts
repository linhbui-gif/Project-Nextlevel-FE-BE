import { EntityRepository, Repository } from 'typeorm';
import { Job } from '../entities';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
}
