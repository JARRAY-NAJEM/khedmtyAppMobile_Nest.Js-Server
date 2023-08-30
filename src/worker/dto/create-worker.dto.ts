import { IsString } from 'class-validator';

export class CreateWorkerDto {
  //   @Length(3, 16, { message: 'invalid length', groups: ['create'] })
  // @Length(5, 16, { message: 'invalid length', groups: ['update'] })
  @IsString()
  firstName: string;
  //  @IsEmail(undefined, { message: 'invalid email' })
  @IsString()
  lastName: string;
  @IsString()
  password: string;
  @IsString()
  number: string;
  @IsString()
  address: string;
  @IsString()
  work: string;
  @IsString()
  description: string;
}
