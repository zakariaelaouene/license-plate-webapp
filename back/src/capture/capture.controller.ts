import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CaptureService } from './capture.service';
import { Capture, CreateCaptureDto, UpdateCaptureDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('capture')
@Controller('capture')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) { }

  @ApiOkResponse({ type: [Capture] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.captureService.findAll(query);
  }

  @ApiOkResponse({ type: Capture })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.captureService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Capture })
  @Post()
  create(@Body() data: CreateCaptureDto) {
    return this.captureService.create(data);
  }

  @ApiOkResponse({ type: Capture })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCaptureDto) {
    return this.captureService.update(id, data);
  }

  @ApiOkResponse({ type: Capture })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.captureService.remove(id);
  }
}
