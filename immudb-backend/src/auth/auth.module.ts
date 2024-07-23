import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { AuthGuard } from './auth.guard';
import { ImmudbService } from '../immudb/immudb.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    ConfigModule,
  ],
  providers: [AuthService, AuthGuard, ImmudbService],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
