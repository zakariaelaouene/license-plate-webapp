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
import { ViolationService } from './violation.service';
import { Violation, CreateViolationDto, UpdateViolationDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('violation')
@Controller('violation')
export class ViolationController {
  constructor(private readonly violationService: ViolationService) { }

  @ApiOkResponse({ type: [Violation] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.violationService.findAll(query);
  }

  @ApiOkResponse({ type: Violation })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.violationService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Violation })
  @Post()
  create(@Body() data: CreateViolationDto) {
    return this.violationService.create(data);
  }

  @ApiOkResponse({ type: Violation })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateViolationDto) {
    return this.violationService.update(id, data);
  }

  @ApiOkResponse({ type: Violation })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.violationService.remove(id);
  }
}
