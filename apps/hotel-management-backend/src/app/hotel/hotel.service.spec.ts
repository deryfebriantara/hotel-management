import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('HotelService (integration)', () => {
  let service: HotelService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [HotelService],
    }).compile();

    service = module.get<HotelService>(HotelService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.hotel.deleteMany();
  });

  afterAll(async () => {
    await prisma.hotel.deleteMany();
    await prisma.$disconnect();
  });

  it('creates and finds hotels', async () => {
    const created = await service.create({
      name: 'Test Hotel',
      location: 'Test City',
      description: 'Integration test',
      image: null,
    });
    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Test Hotel');

    const all = await service.findAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(1);
    expect(all[0].id).toBe(created.id);
  });
});