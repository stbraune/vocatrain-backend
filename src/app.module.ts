import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleTranslateService, GoogleTranslateController } from 'api';

@Module({
  imports: [],
  controllers: [
    AppController,
    GoogleTranslateController
  ],
  providers: [
    AppService,
    GoogleTranslateService
  ]
})
export class AppModule {
}
