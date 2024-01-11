import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  // Delete,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-projects.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { FinishProjectUseCase } from './use-cases/finish-project.use-case';
import { CancelProjectDto } from './dto/cancel-project.dto';
import { FinishProjectDto } from './dto/finish-project.dto';

@Controller('projects')
export class ProjectsWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectUseCase)
  private readonly findAllProjectUseCase: FindAllProjectUseCase;

  @Inject(FindOneProjectUseCase)
  private readonly findOneProjectUseCase: FindOneProjectUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Inject(CancelProjectUseCase)
  private readonly cancelProjectUseCase: CancelProjectUseCase;

  @Inject(FinishProjectUseCase)
  private readonly finishProjectUseCase: FinishProjectUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProjectUseCase.execute(id);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() updateProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, updateProjectDto);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Body() cancelProjectDto: CancelProjectDto) {
    return this.cancelProjectUseCase.execute(id, cancelProjectDto);
  }

  @Post(':id/finish')
  finish(@Param('id') id: string, @Body() finishProjectDto: FinishProjectDto) {
    return this.finishProjectUseCase.execute(id, finishProjectDto);
  }
}
