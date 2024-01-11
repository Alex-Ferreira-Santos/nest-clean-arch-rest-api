import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}
  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({
      where: { id },
    });

    const result = project.start(input.started_at);

    if (result.status === 'Fail') return result;
    const updatedProject = await this.projectRepo.save(project);
    return { status: 'Success', message: 'updated project', updatedProject };
  }
}
