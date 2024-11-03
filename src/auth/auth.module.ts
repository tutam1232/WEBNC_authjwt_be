import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, ProfilesModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
      // global: true,
      // secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s' },
    })
    
  ],
})
export class AuthModule {}
