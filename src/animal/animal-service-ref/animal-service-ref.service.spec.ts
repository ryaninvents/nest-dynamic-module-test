import { Test, TestingModule } from '@nestjs/testing';
import { AnimalServiceRefService } from './animal-service-ref.service';

describe('AnimalServiceRefService', () => {
  let service: AnimalServiceRefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalServiceRefService],
    }).compile();

    service = module.get<AnimalServiceRefService>(AnimalServiceRefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
