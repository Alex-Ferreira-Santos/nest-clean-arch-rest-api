import { Inject, Injectable } from '@nestjs/common';
import { StartProjectDto } from '../dto/start-project.dto';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}
  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findById(id);

    const result = project.start(input.started_at);

    if (result?.status === 'fail') return result;
    const updatedProject = await this.projectRepo.update(project);
    return { status: 'Success', message: 'project updated', updatedProject };
  }
}
