import { Test, TestingModule } from '@nestjs/testing';
import { SerializeService } from './serialize.service';

describe('SerializeService', () => {
  let service: SerializeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerializeService],
    }).compile();

    service = module.get<SerializeService>(SerializeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
