import { Controller, Delete, Get } from '@nestjs/common';

@Controller('room')
export class RoomController {
  @Get('/:id')
  getState() {
    return 'test';
  }

  @Delete('/:id')
  outRoom() {
    return 'out';
  }
}
