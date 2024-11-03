import { Injectable, Inject } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProfilesService {
    constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

    async create(createProfileDto: CreateProfileDto) {
        const { data, error } = await this.supabase.from('profiles').insert({
            ...createProfileDto
        }).select().maybeSingle();

        if (error) {
            throw new Error(error.message);
        }
      
        return data;
    }

    async findOne(id: number) {
        const { data, error } = await this.supabase.from('profiles').select('*').eq('id', id).maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}
