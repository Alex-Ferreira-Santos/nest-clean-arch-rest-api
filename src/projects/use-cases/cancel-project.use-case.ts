import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';
import { CancelProjectDto } from '../dto/cancel-project.dto';

@Injectable()
export class CancelProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}
  async execute(id: string, input: CancelProjectDto) {
    const project = await this.projectRepo.findById(id);

    const result = project.cancel(input.cancelled_at);

    if (result?.status === 'fail') return result;
    const updatedProject = await this.projectRepo.update(project);
    return { status: 'Success', message: 'project cancelled', updatedProject };
  }
}
