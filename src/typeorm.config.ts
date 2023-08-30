// src/typeorm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // set to false in production
};

export default config;
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   url: 'postgres://psql:sEfxtxMGwBp51uVV28hv9TUiS0QDWgE9@dpg-cj5pq81itvpc73fpkmgg-a.oregon-postgres.render.com/khedmty',
//   autoLoadEntities: true,
//   synchronize: true,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// export default config;
