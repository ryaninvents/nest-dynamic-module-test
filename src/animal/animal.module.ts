import { ClassProvider, DynamicModule, Module, Type } from '@nestjs/common';
import {
  AnimalService,
  AnimalServiceOptions,
  ANIMAL_SERVICE_OPTIONS,
} from './animal/animal.service';
import {
  AnimalServiceRefService,
  ANIMAL_SERVICE_REF_SERVICE_TOKEN,
} from './animal-service-ref/animal-service-ref.service';

@Module({
  providers: [AnimalService, AnimalServiceRefService],
})
export class AnimalModule {
  static register(
    { members, legs }: AnimalServiceOptions,
    reference: ClassProvider['provide'] = Symbol(),
  ): DynamicModule {
    return {
      module: AnimalModule,
      providers: [
        {
          provide: ANIMAL_SERVICE_OPTIONS,
          useValue: { members, legs },
        },
        AnimalService,
        {
          provide: ANIMAL_SERVICE_REF_SERVICE_TOKEN,
          useValue: reference,
        },
        { provide: reference, useClass: AnimalServiceRefService },
      ],
      exports: [AnimalService, AnimalServiceRefService],
    };
  }
}
