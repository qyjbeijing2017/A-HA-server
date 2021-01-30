import { ApiProperty } from '@nestjs/swagger';

export class Player {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
