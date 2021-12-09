import { Global, Inject, Injectable } from '@nestjs/common';
import { AnimalService } from '../animal/animal.service';

export const ANIMAL_SERVICE_REF_SERVICE_TOKEN = Symbol(
  'ANIMAL_SERVICE_REF_SERVICE_TOKEN',
);

@Global()
@Injectable()
export class AnimalServiceRefService {
  constructor(
    @Inject(ANIMAL_SERVICE_REF_SERVICE_TOKEN) token: symbol,
    private readonly animalService: AnimalService,
  ) {}

  getAnimalService() {
    return this.animalService;
  }
}
