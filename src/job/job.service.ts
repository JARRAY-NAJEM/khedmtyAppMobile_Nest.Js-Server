import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findOne(id: string): Promise<Job> {
    const options: FindOneOptions = {
      where: { id },
    };
    const jobs = await this.jobRepository.findOne(options);
    if (!jobs) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return jobs;
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const { job, image, howMatch } = createJobDto;
    const jobs = new Job();
    jobs.job = job;
    jobs.image = image;
    jobs.howMatch = howMatch;
    return this.jobRepository.save(jobs);
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      const options: FindOneOptions = {
        where: { id },
      };
      const jobs = await this.jobRepository.findOne(options);
      if (!jobs) throw new Error('Job not found');
      const { job, image } = updateJobDto;
      jobs.job = job ?? jobs.job;
      jobs.image = image ?? jobs.image;

      return this.jobRepository.save(jobs);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Job not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteOne(id: number): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }
}
