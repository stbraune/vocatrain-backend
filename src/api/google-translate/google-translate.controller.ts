import { Controller, Get, Query } from '@nestjs/common';

import { GoogleTranslateService } from './google-translate.service';
import { GoogleTranslateResult } from './google-translate-result';

import { Observable, of } from 'rxjs';
import { ApiModelPropertyOptional, ApiModelProperty, ApiImplicitQuery } from '@nestjs/swagger';

@Controller('translate')
export class GoogleTranslateController {
  public constructor(
    private googleTranslateService: GoogleTranslateService
  ) {
  }

  @Get()
  @ApiImplicitQuery({ name: 'from', description: 'The source language' })
  @ApiImplicitQuery({ name: 'to', description: 'The target language' })
  @ApiImplicitQuery({ name: 'text', description: 'The text to translate' })
  public translate(
    @Query('from') fromLanguage: string,
    @Query('to') toLanguage: string,
    @Query('text') text: string
  ): Observable<GoogleTranslateResult> {
    return this.googleTranslateService.translate(text, {
      from: fromLanguage,
      to: toLanguage
    });
  }
}