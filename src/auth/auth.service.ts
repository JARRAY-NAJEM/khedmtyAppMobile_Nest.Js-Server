import { Injectable } from '@nestjs/common';
import { WorkerService } from 'src/worker/worker.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly workerService: WorkerService) {}
  async validateLogin(number: string, password: string): Promise<any> {
    const worker = await this.workerService.findByNumber(number);

    if (worker && (await bcrypt.compare(password, worker.password))) {
      return worker;
    }
    return null;
  }
}
