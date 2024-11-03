import { Controller, HttpCode, HttpStatus, UseInterceptors, UseGuards, Get, Request } from '@nestjs/common';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('profile')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseInterceptors(new TransformInterceptor('Profile fetched successfully'))
    getProfile(@Request() req) {
        return this.profilesService.findOne(req.user.id);
    }
}
