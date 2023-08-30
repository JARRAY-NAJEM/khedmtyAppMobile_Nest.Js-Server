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
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-Job.dto';
import { UpdateJobDto } from './dto/update-Job.dto';

// Define a new controller class for handling HTTP requests related to jobs
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // Handle GET requests to the base route
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  // Handle GET requests to a route with a dynamic parameter 'id'
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  // Handle POST requests to the base route
  @Post()
  async createJob(@Body(ValidationPipe) createJobDto: CreateJobDto) {
    // Call the 'createJob' method on the 'jobsService' with the validated 'createJobDto'
    const result = await this.jobService.createJob(createJobDto);
    // Return a success message along with the result of the 'createJob' method
    return { message: 'Job created successfully', data: result };
  }

  // Handle PUT requests to a route with a dynamic parameter 'id'
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateJob(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
    // Call the 'updateJob' method on the 'jobsService' with the validated 'updateJobDto'
    const result = await this.jobService.updateJob(id, updateJobDto);
    // Return a success message along with the result of the 'updateJob' method
    return { message: 'Job updated successfully', data: result };
  }

  // Handle DELETE requests to a route with a dynamic parameter 'id'
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: number) {
    // Call the 'deleteOne' method on the 'jobsService' and return its result
    return this.jobService.deleteOne(id);
  }
}
