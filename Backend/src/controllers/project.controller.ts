import { Controller, Post, Get, HttpStatus, UseGuards, Body, Put, Param, Delete, UploadedFile, UseInterceptors, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { ProjectService } from '../services';
import { ProjectDto, FileDto, UploadedDto, FilesDto } from '../dto';
import { ProjectCreatedDto } from 'src/dto/project.created.dto';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: ProjectDto })
  @ApiResponse({ status: HttpStatus.OK,  type: ProjectCreatedDto })
  public createProject(@Body() project: ProjectDto) {
    return this.projectService.createProject(project);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: ProjectCreatedDto })
  public getProjects(@Param('id') projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: HttpStatus.OK,  type: ProjectCreatedDto })
  public getProject() {
    return this.projectService.getProjects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public updateProject(@Param('id') projectId: string, @Body() project: ProjectDto) {
    return this.projectService.updateProject(projectId, project);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public deleteProject(@Param('id') projectId: string) {
    return this.projectService.deleteProject(projectId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload Project image',
    type: FilesDto,
  })
  @ApiResponse({ type: [UploadedDto], status: HttpStatus.OK })
  uploadFile(@UploadedFile() files) {
    return files.map((file) => ({
      mimetype: file.mimetype,
      url: file.path.replace('public/', ''),
      size: file.size
    }));
  }
}