import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}
  execute() {
    return this.projectRepo.find();
  }
}
