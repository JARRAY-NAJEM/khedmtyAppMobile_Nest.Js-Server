import { WorkerService } from 'src/worker/worker.service';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { WorkerModule } from 'src/worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/typeorm.config';
import { Worker } from '../worker/worker.entity';

@Module({
  imports: [
    WorkerModule,
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Worker]),
  ],
  controllers: [AuthController],
  providers: [AuthService, WorkerService],
})
export class AuthModule {}
