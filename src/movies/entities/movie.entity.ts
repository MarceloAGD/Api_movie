import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import { ObjectType, Field, Int, Directive} from '@nestjs/graphql';
import { Cast } from '../../casts/entities/cast.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Movie{

    @PrimaryColumn({type: 'int'})
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field({nullable: true})
    poster_path: string;

    @Column()
    @Field({nullable: true})
    overview: string;

    @OneToMany(() => Cast, cast => cast.movie)
    @Field(() => [Cast],{nullable: true})
    cast: Cast[];

}