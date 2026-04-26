import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
  ) {}

  @Get('/ui')
  @Render('cuadraturaMensual')
  getUI() {
    // return { message: 'hola mundo!' };
    return;
  }
}
