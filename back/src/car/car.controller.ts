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
import { CarService } from './car.service';
import { Car, CreateCarDto, UpdateCarDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @ApiOkResponse({ type: [Car] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.carService.findAll(query);
  }

  @ApiOkResponse({ type: Car })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.carService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Car })
  @Post()
  create(@Body() data: CreateCarDto) {
    return this.carService.create(data);
  }

  @ApiOkResponse({ type: Car })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCarDto) {
    return this.carService.update(id, data);
  }

  @ApiOkResponse({ type: Car })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carService.remove(id);
  }
}
