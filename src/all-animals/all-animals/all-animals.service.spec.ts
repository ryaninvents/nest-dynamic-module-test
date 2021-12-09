import { Test, TestingModule } from '@nestjs/testing';
import { AllAnimalsService } from './all-animals.service';

describe('AllAnimalsService', () => {
  let service: AllAnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllAnimalsService],
    }).compile();

    service = module.get<AllAnimalsService>(AllAnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
