import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { WorkerModule } from './worker/worker.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Job } from './job/job.entity';
import { Worker } from './worker/worker.entity';
import config from './typeorm.config';

@Module({
  imports: [
    JobModule,
    AuthModule,
    WorkerModule,
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Job, Worker]),
  ],
  controllers: [AppController],
  providers: [JobModule, AuthModule, WorkerModule, AppService],
})
export class AppModule {}
