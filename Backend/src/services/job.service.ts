import { Injectable } from '@nestjs/common';
import { JobRepository } from 'src/repositories/job.repository';
import { JobDto } from 'src/dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  getJobById(id: string): Promise<JobDto> {
    return this.jobRepository.findOne(id);
  }

  getJobs(): Promise<JobDto[]> {
    return this.jobRepository.find();
  }

  updateJob(id: string, job: JobDto): Promise<UpdateResult> {
    return this.jobRepository.update(id, job);
  }

  createJob(job: JobDto): Promise<JobDto> {
    return this.jobRepository.save(job);
  }

  deleteJob(id: string): Promise<DeleteResult> {
    return this.jobRepository.delete(id);
  }
}
