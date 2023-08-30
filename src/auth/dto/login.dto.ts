import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  number: string;

  @IsString()
  password: string;
}
