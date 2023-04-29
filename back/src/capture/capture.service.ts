import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateCaptureDto, UpdateCaptureDto } from './entities';

@Injectable()
export class CaptureService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.capture.count({
      where: options.where,
    });
    const results = await this.prisma.capture.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.capture.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateCaptureDto) {
    return await this.prisma.capture.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateCaptureDto) {
    return await this.prisma.capture.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.capture.delete({ where: { id } });
  }
}
