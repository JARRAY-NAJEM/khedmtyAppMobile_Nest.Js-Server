// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(number: string, password: string): Promise<any> {
//     const worker = await this.authService.validateLogin(number, password);
//     if (!worker) {
//       throw new UnauthorizedException();
//     }
//     return worker;
//   }
// }
