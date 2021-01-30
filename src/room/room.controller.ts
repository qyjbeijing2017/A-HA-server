import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameStateDto } from './game-state/game-sate.dto';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // 获取房间状态
  @Get('/:id')
  @ApiOperation({ description: '获取某个房间状态' })
  getState(@Query('id') id: string) {
    return this.roomService.get(id);
  }

  // 获得房间
  @Get()
  @ApiOperation({ description: '获取所有房间状态' })
  getRooms() {
    return this.roomService.getRooms();
  }

  // 玩家进入房间
  @Post('in/:id/:userId')
  @ApiOperation({ description: '进入某个房间' })
  addplayer(@Query('userId') userId: string, @Query('id') id: string) {
    return this.roomService.in(id, userId);
  }

  // 更新房间状态
  @Put(':id')
  @ApiOperation({ description: '更新房间状态' })
  upload(@Query('id') id: string, @Body() state: GameStateDto) {
    return this.roomService.update(id, state);
  }

  // 创建房间
  @Post('create/:name')
  @ApiOperation({ description: '创建一个房间' })
  createRoom(@Query('name') name: string) {
    return this.roomService.add(name);
  }

  // 玩家离开房间
  @Delete('/:id/:user')
  @ApiOperation({ description: '离开这个房间' })
  outRoom(@Query('id') id: string, @Query('user') userId: string) {
    return this.roomService.out(id, userId);
  }
}
