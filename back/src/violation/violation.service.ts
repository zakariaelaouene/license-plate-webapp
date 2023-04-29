import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateViolationDto, UpdateViolationDto } from './entities';

@Injectable()
export class ViolationService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.violation.count({
      where: options.where,
    });
    const results = await this.prisma.violation.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.violation.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateViolationDto) {
    return await this.prisma.violation.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateViolationDto) {
    return await this.prisma.violation.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.violation.delete({ where: { id } });
  }
}
