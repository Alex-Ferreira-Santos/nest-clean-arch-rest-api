import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-projects.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { StartProjectUseCase } from './use-cases/start-project.use-case';

@Controller('projects')
export class ProjectsWithUseCaseController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectUseCase: FindAllProjectUseCase,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
    private readonly startProjectUseCase: StartProjectUseCase,
  ) {}

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectsService.update(id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
