import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GameStateDto } from './room/game-state/game-sate.dto';
import { PlayerDto } from './room/game-state/player.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('env')
  env() {
    return process.env;
  }

  @Get()
  state() {
    return this.appService;
  }

  @Post()
  update(@Body() state: GameStateDto) {
    return this.appService.update(state);
  }

  @Put()
  in(@Body() player: PlayerDto) {
    return this.appService.in(player);
  }

  @Delete()
  out(@Body() player: PlayerDto) {
    return this.appService.out(player);
  }
}
