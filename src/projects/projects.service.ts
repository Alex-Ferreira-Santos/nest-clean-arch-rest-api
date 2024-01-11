import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const status: 'success' | 'fail' = 'success';
    const message = '';
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    project.name && (project.name = updateProjectDto.name);
    project.description && (project.description = updateProjectDto.description);

    if (updateProjectDto.started_at) {
      const blockedStatus = [
        ProjectStatus.Active,
        ProjectStatus.Completed,
        ProjectStatus.Cancelled,
      ];

      if (blockedStatus.includes(project.status)) {
        return {
          status: 'fail',
          message: 'Cannot start project with the current status',
        };
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.cancelled_at) {
      const blockedStatus = [ProjectStatus.Completed, ProjectStatus.Cancelled];

      if (blockedStatus.includes(project.status)) {
        return {
          status: 'fail',
          message: 'Cannot cancel project with the current status',
        };
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        return {
          status: 'fail',
          message: 'Cannot cancel project before it started',
        };
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Cancelled;
    }

    if (updateProjectDto.finished_at) {
      const blockedStatus = [ProjectStatus.Completed, ProjectStatus.Cancelled];

      if (blockedStatus.includes(project.status)) {
        return {
          status: 'fail',
          message: 'Cannot finish project with the current status',
        };
      }

      if (updateProjectDto.finished_at < project.started_at) {
        return {
          status: 'fail',
          message: 'Cannot cancel project before it started',
        };
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Completed;
    }

    const updatedProject = await this.projectRepo.save(project);
    return { status, message, updatedProject };
  }

  remove(id: string) {
    return id;
    // return this.projectRepo.remove(id);
  }
}
