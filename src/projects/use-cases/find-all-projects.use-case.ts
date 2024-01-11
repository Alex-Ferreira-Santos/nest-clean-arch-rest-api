import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class FindAllProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private projectRepo: IProjectRepository,
  ) {}
  execute() {
    return this.projectRepo.findAll();
  }
}
