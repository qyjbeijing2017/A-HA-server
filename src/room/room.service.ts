import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from './game-state/player.dto';
import RoomState from './room-state';

@Injectable()
export class RoomService {
  private _rooms: Map<string, RoomState> = new Map();

  add(name: string) {
    const room = new RoomState(name);
    this._rooms.set(room.id, room);
    room.onExist.addListener(() => {
      this._rooms[room.id] = undefined;
    });
    return room;
  }

  get(id: string) {
    return this.findRoom(id);
  }

  update(id: string, state: any) {
    const room = this.findRoom(id);
    room.update(state);
  }

  in(id: string, playerDto: PlayerDto) {
    const room = this.findRoom(id);
    room.add(playerDto);
  }

  out(id: string, userId: string) {
    const room = this.findRoom(id);
    room.out(userId);
  }

  private findRoom(id: string) {
    if (!this._rooms.has(id)) {
      throw new NotFoundException();
    }
    return this._rooms.get(id);
  }

  getRooms() {
    const roomOut: { keys: string[]; values: RoomState[] } = {
      keys: [],
      values: [],
    };
    this._rooms.forEach((value, key) => {
      roomOut.keys.push(key);
      roomOut.values.push(value);
    });
    return roomOut;
  }
}
