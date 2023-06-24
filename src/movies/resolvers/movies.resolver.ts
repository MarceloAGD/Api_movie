import { Args, Mutation, Parent, ResolveField, ResolveReference, Resolver } from '@nestjs/graphql';
import {MoviesService} from '../services/movies.service';
import { Query } from '@nestjs/graphql';
import {Movie} from '../entities/movie.entity'

@Resolver()
export class MoviesResolver {
    constructor(private movieService: MoviesService) {}

    @Mutation(returns => Boolean)
    async loadData(): Promise<boolean>{
        return this.movieService.loadMovieJSON();
    }

    @Query(() => [Movie])
    async Movies() {
        return this.movieService.findAll();
    }

    @Query(() => Movie)
    MovieId(@Args('id') id: number): Promise<Movie>{
        return this.movieService.findOne(id);
    }

    @ResolveReference()
    resolvereference(ref: {__typename: string, id: number}){
        return this.movieService.findOne(ref.id);
    }
}
