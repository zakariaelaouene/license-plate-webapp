import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateCarDto, UpdateCarDto } from './entities';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.car.count({
      where: options.where,
    });
    const results = await this.prisma.car.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.car.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateCarDto) {
    return await this.prisma.car.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateCarDto) {
    return await this.prisma.car.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.car.delete({ where: { id } });
  }
}
