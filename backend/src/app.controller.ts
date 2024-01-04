import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  checkConnection(): string {
    return 'App works fine!';
  }
}
