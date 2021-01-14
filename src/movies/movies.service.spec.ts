import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  function createMovie() {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  }

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      createMovie();
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      createMovie();
      const allMoviesCount = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteCount = service.getAll().length;

      expect(afterDeleteCount).toEqual(allMoviesCount - 1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should create movie', () => {
      const beforCreateCount = service.getAll().length;
      createMovie();
      const afterCreateCount = service.getAll().length;
      expect(afterCreateCount).toEqual(beforCreateCount + 1);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      createMovie();
      service.update(1, { year: 2020 });
      const afterUpdate = service.getOne(1);
      expect(afterUpdate.year).toEqual(2020);
    });

    it('should throw a NotFoundException', () => {
      try {
        createMovie();
        service.update(1, { year: 2020 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
