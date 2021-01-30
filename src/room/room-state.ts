import { v4 as uuidv4 } from 'uuid';

export default class RoomState {
  id: string;
  constructor(private readonly name: string) {
    this.id = uuidv4();
  }
}
