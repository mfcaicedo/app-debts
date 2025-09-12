import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: +(process.env.SUPABASE_PORT || 5432),
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DB,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true, //dev
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: +(process.env.REDIS_PORT || 6379),
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
