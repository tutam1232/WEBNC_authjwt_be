import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly profilesService: ProfilesService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findOne(createAuthDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = await this.usersService.create({
      email: createAuthDto.email,
      password: createAuthDto.password,
    });
    await this.profilesService.create({
      id: newUser.id,
      name: createAuthDto.name,
      hobby: createAuthDto.hobby,
    });

    return { ...newUser };
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      access_token: await this.jwtService.signAsync(user),
      email: user.email,
    };
  }
}
