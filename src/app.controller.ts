import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService
  ) {
  }

  @Get()
  welcome() {
    return {
      'vocatrain-backend': 'Welcome',
      'version': '1.0.0'
    };
  }
}
