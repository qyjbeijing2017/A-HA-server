import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
