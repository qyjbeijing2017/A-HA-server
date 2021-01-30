import { FileExpressEvent } from 'src/util/fileexpress-event';
import { v4 as uuidv4 } from 'uuid';
import { PlayerDto } from './game-state/player.dto';

export default class RoomState {
  id: string;
  constructor(readonly name: string) {
    this.id = uuidv4();
    this.lastmodified = new Date().getTime();
    this.state = {};
  }
  private _players: PlayerDto[] = [];
  lastmodified: number;
  state: any;
  onExist: FileExpressEvent<void> = new FileExpressEvent();

  add(playerDto: PlayerDto) {
    this._players.push(playerDto);
  }

  out(playerId: string) {
    let index = -1;
    this._players.find((value, i) => {
      index = i;
      return value.id === playerId;
    });
    if (index > -1) {
      this._players.splice(index, 1);
    }
    if (this._players.length < 1) {
      this.onExist.emit();
    }
  }

  update(state: any) {
    this.state = state;
    this.lastmodified = new Date().getTime();
  }
}
