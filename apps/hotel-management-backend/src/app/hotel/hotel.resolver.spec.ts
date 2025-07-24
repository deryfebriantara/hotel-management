import { Test, TestingModule } from '@nestjs/testing';
import { HotelResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';
import { Hotel } from './hotel.model';

describe('HotelResolver', () => {
  let resolver: HotelResolver;
  let service: Partial<Record<keyof HotelService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([{
        id: 1,
        name: 'Test Hotel',
        location: 'City',
        description: 'Desc',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      } as Hotel]),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test Hotel',
        location: 'City',
        description: 'Desc',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      } as Hotel),
      create: jest.fn().mockImplementation((input: CreateHotelInput) => Promise.resolve({
        id: 2,
        ...input,
        image: input.image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      } as Hotel)),
      update: jest.fn().mockImplementation((id: number, input: UpdateHotelInput) => Promise.resolve({
        id,
        ...input,
        image: input.image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      } as Hotel)),
      remove: jest.fn().mockResolvedValue({
        id: 3,
        name: 'Removed',
        location: 'Nowhere',
        description: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      } as Hotel),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelResolver,
        { provide: HotelService, useValue: service },
      ],
    }).compile();

    resolver = module.get<HotelResolver>(HotelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getHotels', () => {
    it('should return list of hotels', async () => {
      const result = await resolver.getHotels('a', 'name', 'desc');
      expect(service.findAll).toHaveBeenCalledWith('a', 'name', 'desc');
      expect(result).toBeInstanceOf(Array);
      expect(result[0].name).toBe('Test Hotel');
    });
  });

  describe('getHotel', () => {
    it('should return a single hotel', async () => {
      const result = await resolver.getHotel(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result.id).toBe(1);
    });
  });

  describe('createHotel', () => {
    it('should create and return a hotel', async () => {
      const input: CreateHotelInput = {
        name: 'New',
        location: 'City',
        description: 'Desc',
        image: null,
      };
      const result = await resolver.createHotel(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result.id).toBe(2);
      expect(result.name).toBe(input.name);
    });
  });

  describe('updateHotel', () => {
    it('should update and return a hotel', async () => {
      const input: UpdateHotelInput = {
        name: 'Upd',
        location: 'City',
        description: 'Desc',
        image: null,
      };
      const result = await resolver.updateHotel(5, input);
      expect(service.update).toHaveBeenCalledWith(5, input);
      expect(result.id).toBe(5);
      expect(result.name).toBe('Upd');
    });
  });

  describe('deleteHotel', () => {
    it('should delete and return a hotel', async () => {
      const result = await resolver.deleteHotel(3);
      expect(service.remove).toHaveBeenCalledWith(3);
      expect(result.id).toBe(3);
    });
  });
});
