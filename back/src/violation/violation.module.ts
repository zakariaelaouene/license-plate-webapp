import { Module } from '@nestjs/common';
import { ViolationService } from './violation.service';
import { ViolationController } from './violation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ViolationController],
  providers: [ViolationService, PrismaService],
})
export class ViolationModule {}
