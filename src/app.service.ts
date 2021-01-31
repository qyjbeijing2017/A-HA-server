import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlayerDto } from './room/game-state/player.dto';

@Injectable()
export class AppService {
  players: PlayerDto[] = [];
  state: any = {};
  timeStemp = new Date().getTime();

  constructor(private readonly configService: ConfigService) {}

  in(player: PlayerDto) {
    if (
      this.players.length >= this.configService.get<number>('AHA_MAX_PLAYER')
    ) {
      throw new BadRequestException();
    }
    const playerFound = this.players.find((value) => {
      return value.id === player.id;
    });
    if (!playerFound) {
      this.players.push(player);
      return player;
    } else {
      return playerFound;
    }
  }

  out(player: PlayerDto) {
    let index = -1;
    this.players.find((value, i) => {
      index = i;
      return value.id === player.id;
    });

    if (index < 0) {
      throw new NotFoundException();
    }

    this.players.splice(index, 1);
    if (this.players.length <= 0) {
      this.state = {};
    }
  }

  update(state: any) {
    this.state = state;
    this.timeStemp = new Date().getTime();
  }

  clear() {
    this.state = {};
    this.players = [];
  }
}
