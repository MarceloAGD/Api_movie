import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from '../entities/cast.entity';
import { Repository } from 'typeorm';
import { ActorsService } from '../../actors/services/actors.service';
import { Actor } from '../../actors/entities/actor.entity';


@Injectable()
export class CastsService {
    constructor(
        @InjectRepository(Cast) 
        private castsRepository: Repository<Cast>,
        private actorService: ActorsService,
    ){}

    async findAll(): Promise<Cast[]> {
        return this.castsRepository.find({relations: ['movie','actor']});
      }
    
    async findOne(idMovie: number): Promise<Cast[]>{
        return this.castsRepository.find({where:{movie:{id:idMovie}}, relations:['movie', 'actor']})
    }

    async getActor(id: number): Promise<Actor>{
        return this.actorService.findOne(id)
    }
    
}