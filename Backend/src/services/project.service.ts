import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/repositories/project.repository';
import { ProjectDto } from 'src/dto';
import { DeleteResult } from 'typeorm';
import { ProjectNameNotUnique } from 'src/errors';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  getProjectById(id: string): Promise<ProjectDto> {
    return this.projectRepository.findOne(id);
  }

  getProjects(): Promise<ProjectDto[]> {
    return this.projectRepository.find();
  }

  async updateProject(id: string, project: ProjectDto): Promise<ProjectDto> {
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOne(id);
  }

  async createProject(project: ProjectDto): Promise<ProjectDto> {
    try {
      return await this.projectRepository.save(project)
    } catch (e) {
      if (e.message.indexOf('IDX_dedfea394088ed136ddadeee89') > -1) {
        throw new ProjectNameNotUnique();
      }
      return e;
    }
  }

  deleteProject(id: string): Promise<DeleteResult> {
    return this.projectRepository.delete(id);
  }
}
