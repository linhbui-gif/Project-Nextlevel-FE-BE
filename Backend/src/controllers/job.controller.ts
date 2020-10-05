import { Controller, Post, Get, HttpStatus, UseGuards, Body, Put, Param, Delete, UploadedFile, UseInterceptors, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { JobService } from '../services';
import { JobDto, FileDto, JobCreatedDto, UploadedDto } from '../dto';

@ApiTags('Jobs')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: JobDto })
  @ApiResponse({ status: HttpStatus.OK,  type: JobCreatedDto })
  public createJob(@Body() job: JobDto) {
    return this.jobService.createJob(job);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: JobCreatedDto })
  public getJobs(@Param('id') jobId: string) {
    return this.jobService.getJobById(jobId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: HttpStatus.OK,  type: JobCreatedDto })
  public getJob() {
    return this.jobService.getJobs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public updateJob(@Param('id') jobId: string, @Body() job: JobDto) {
    return this.jobService.updateJob(jobId, job);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public deleteJob(@Param('id') jobId: string) {
    return this.jobService.deleteJob(jobId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload Job image',
    type: FileDto,
  })
  @ApiResponse({ type: UploadedDto, status: HttpStatus.OK })
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return file;
  }
}