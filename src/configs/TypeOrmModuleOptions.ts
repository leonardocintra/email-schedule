import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MailEntity } from 'src/app/mail/mail.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // TODO: pegar parametros da .env que não esta funcionano aqui
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'schedulemail',
  password: 'schedulemail',
  database: 'schedulemail',
  entities: [MailEntity],
  synchronize: true,
};
