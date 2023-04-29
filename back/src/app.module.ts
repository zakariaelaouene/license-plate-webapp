import { ViolationModule } from './violation/violation.module';
import { CaptureModule } from './capture/capture.module';
import { CarModule } from './car/car.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ViolationModule, CaptureModule, CarModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
