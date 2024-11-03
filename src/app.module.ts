import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './home/home.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [JwtModule, AuthModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), ProfilesModule],
  controllers: [AppController, HomeController, ProfilesController],
  providers: [AppService],
})
export class AppModule {}
