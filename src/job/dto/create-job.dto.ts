import { IsOptional, IsString, Length } from 'class-validator';

export class CreateJobDto {
  @Length(3, 16, { message: 'invalid length', groups: ['create'] })
  // @Length(5, 16, { message: 'invalid length', groups: ['update'] })
  @IsString()
  job: string;
  //  @IsEmail(undefined, { message: 'invalid email' })
  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  howMatch?: string;
}
