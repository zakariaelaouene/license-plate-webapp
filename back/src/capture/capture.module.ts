import { Module } from '@nestjs/common';
import { CaptureService } from './capture.service';
import { CaptureController } from './capture.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CaptureController],
  providers: [CaptureService, PrismaService],
})
export class CaptureModule {}
