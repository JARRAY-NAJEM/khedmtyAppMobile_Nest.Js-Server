// Import necessary modules, services, and DTOs
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}
  @Get()
  findAll() {
    return this.workerService.findAll();
  }
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.workerService.findById(id);
  }

  @Get('work/:work')
  findOneByWork(@Param('work') work: string) {
    return this.workerService.findByWork(work);
  }

  @Post()
  async createWorker(@Body(ValidationPipe) createWorkerDto: CreateWorkerDto) {
    const result = await this.workerService.createWorker(createWorkerDto);
    return { message: 'Worker created successfully', data: result };
  }

  @UsePipes(ValidationPipe)
  @Put('update/:id')
  async updateWorker(
    @Param('id') id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    const result = await this.workerService.updateWorker(id, updateWorkerDto);
    return { message: 'Worker updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: number) {
    return this.workerService.deleteOne(id);
  }
}
