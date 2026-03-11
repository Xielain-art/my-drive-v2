import 'dotenv/config';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { APP_GUARD } from '@nestjs/core'
import { KeycloakConnectModule, AuthGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';
import {
  ZodValidationPipe,
  ZodSerializerInterceptor,
} from 'nestjs-zod';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileEntity } from './file.entity';
import { S3Module } from './s3/s3.module';


@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'my-drive',
      clientId: 'my-drive-front',
      secret: 'secret',
      useNestLogger: true,
      tokenValidation: TokenValidation.OFFLINE,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [FileEntity],
      synchronize: true,
    }),
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
