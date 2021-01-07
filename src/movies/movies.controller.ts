import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { get } from 'http';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return 'this will return all movies';
    }

    @Get("search")
    search(@Query("year") searchingYear: string){
        return `We are searching for a movie made after: ${searchingYear}`
    }

    @Get("/:id")
    getOne(@Param("id") movieID: string){
        return `this will return one movie with id: ${movieID}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete("/:id")
    remove(@Param("id") movieID: string){
        return `this will delete a movie with an id: ${movieID}`;
    }
    
    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData){
        return {
            updateMovie: movieId,
            ...updateData
        }
    }
}
