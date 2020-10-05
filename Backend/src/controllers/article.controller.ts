import { Controller, Post, Get, Request, HttpStatus, UseGuards, Body, Param, Delete, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { ArticleService } from '../services';
import { ArticleCreatedDto, ArticleSummaryDto, DraftDto, DraftSummaryDto, FileDto, UploadDto, UploadedDto } from '../dto';
import { UpdateResult } from 'typeorm';
import { DraftCreatedDto } from 'src/dto/draft.created.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Articles')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('/draft')
  @ApiBody({ type: DraftDto })
  @ApiResponse({ status: HttpStatus.OK,  type: DraftCreatedDto })
  public saveDraft(@Body() draft: DraftDto) {
    return this.articleService.saveDraft(draft);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("draft/:id")
  @ApiResponse({ status: HttpStatus.OK,  type: DraftCreatedDto })
  public getDraftById(@Param('id') draftId: string) {
    return this.articleService.getDraftById(draftId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete("draft/:id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public deleteDraft(@Param('id') draftId: string) {
    return this.articleService.deleteDraft(draftId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('/publish')
  @ApiBody({ type: DraftDto })
  @ApiResponse({ status: HttpStatus.OK,  type: ArticleCreatedDto })
  public publish(@Body() draft: DraftDto) {
    return this.articleService.publishDraft(draft);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: HttpStatus.OK,  type: [ArticleSummaryDto] })
  public getArticles() {
    return this.articleService.getArticles();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("drafts")
  @ApiResponse({ status: HttpStatus.OK,  type: [DraftSummaryDto] })
  public async getDrafts(@Request() req) {
    return this.articleService.getDrafts(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: ArticleCreatedDto })
  public getArticleById(@Param('id') articleId: string) {
    return this.articleService.getArticleById(articleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @ApiResponse({ status: HttpStatus.OK,  type: UpdateResult })
  public deleteArticle(@Param('id') articleId: string) {
    return this.articleService.getDraftById(articleId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FileInterceptor('upload', {
    dest: 'public/upload/article/',
    limits: {
      files: 1,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload pictures to articles, compliant with CKEditor',
    type: UploadDto,
  })
  @ApiResponse({ type: UploadedDto })
  uploadImage(@UploadedFile() file) {
    return {
      mimetype: file.mimetype,
      url: process.env.PUBLIC_API_URL + file.path.replace('public/', ''),
      size: file.size
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('upload/cover')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'public/upload/article/cover',
    limits: {
      files: 1,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload cover image',
    type: FileDto,
  })
  @ApiResponse({ type: UploadedDto })
  uploadCoverImage(@UploadedFile() file) {
    return {
      mimetype: file.mimetype,
      url: file.path.replace('public/', ''),
      size: file.size
    };
  }
}