import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker } from './worker.entity';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
  ) {}
  async findAll(): Promise<Worker[]> {
    return this.workerRepository.find();
  }
  //!----------------------------------

  async findOne(id: string): Promise<Worker> {
    const options: FindOneOptions = {
      where: { id },
    };
    const worker = await this.workerRepository.findOne(options);
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return worker;
  }
  //!----------------------------------

  async findById(id: string): Promise<Worker> {
    const options: FindOneOptions = {
      where: { id },
    };
    const worker = await this.workerRepository.findOne(options);
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return worker;
  }
  //!----------------------------------
  async findByWork(work: string): Promise<Worker[]> {
    const options: FindManyOptions = {
      where: { work },
    };
    const workers = await this.workerRepository.find(options);
    if (!workers || workers.length === 0) {
      throw new NotFoundException(`No workers found with work ${work}`);
    }
    return workers;
  }

  //!----------------------------------

  async findByNumber(number: string): Promise<Worker> {
    const options: FindOneOptions = {
      where: { number },
    };
    const worker = await this.workerRepository.findOne(options);
    if (!worker) {
      throw new NotFoundException(`Worker with number ${number} not found`);
    }
    return worker;
  }
  //!----------------------------------

  async createWorker(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const {
      firstName,
      lastName,
      password,
      number,
      address,
      work,
      description,
    } = createWorkerDto;
    const worker = new Worker();
    const hashedPassword = await bcrypt.hash(password, 10);

    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.password = hashedPassword;
    worker.number = number;
    worker.address = address;
    worker.work = work;
    worker.description = description;
    return this.workerRepository.save(worker);
  }
  //   async createWorker(createWorkerDto: CreateWorkerDto): Promise<Worker> {
  //     const worker = this.workerRepository.create(createWorkerDto);
  //     return this.workerRepository.save(worker);
  //   }
  //!----------------------------------

  async updateWorker(
    id: string,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<Worker> {
    try {
      const options: FindOneOptions = {
        where: { id },
      };
      const worker = await this.workerRepository.findOne(options);
      if (!worker) throw new Error('Worker not found');
      const {
        firstName,
        lastName,
        password,
        number,
        address,
        work,
        description,
      } = updateWorkerDto;
      worker.firstName = firstName ?? worker.firstName;
      worker.lastName = lastName ?? worker.lastName;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
        worker.password = hashedPassword;
      }
      worker.number = number ?? worker.number;
      worker.address = address ?? worker.address;
      worker.work = work ?? worker.work;
      worker.description = description ?? worker.description;
      return this.workerRepository.save(worker);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Worker not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //   async updateWorker(
  //     id: number,
  //     updateWorkerDto: UpdateWorkerDto,
  //   ): Promise<Worker> {
  //     const options: FindOneOptions = {
  //       where: { id },
  //     };
  //     const worker = await this.workerRepository.findOne(options);
  //     if (!worker) {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.NOT_FOUND,
  //           error: 'Worker not found',
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     Object.assign(worker, updateWorkerDto);
  //     return this.workerRepository.save(worker);
  //   }
  //!----------------------------------

  async deleteOne(id: number): Promise<void> {
    const result = await this.workerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
  }
}
