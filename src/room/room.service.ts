import { Injectable, NotFoundException } from '@nestjs/common';
import RoomState from './room-state';

@Injectable()
export class RoomService {
  private _rooms: { [key: string]: RoomState } = {};

  add(name: string) {
    const room = new RoomState(name);
    this._rooms[room.id] = room;
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

  in(id: string, userId: string) {
    const room = this.findRoom(id);
    room.add(userId);
  }

  out(id: string, userId: string) {
    const room = this.findRoom(id);
    room.out(userId);
  }

  private findRoom(id: string) {
    const room = this._rooms[id];
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  getRooms() {
    return this._rooms;
  }
}
