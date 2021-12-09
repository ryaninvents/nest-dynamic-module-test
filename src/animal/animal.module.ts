import { DynamicModule, Module } from '@nestjs/common';
import {
  AnimalService,
  AnimalServiceOptions,
  ANIMAL_SERVICE_OPTIONS,
} from './animal/animal.service';

@Module({
  providers: [AnimalService],
})
export class AnimalModule {
  static register({ members, legs }: AnimalServiceOptions): DynamicModule {
    return {
      module: AnimalModule,
      providers: [
        {
          provide: ANIMAL_SERVICE_OPTIONS,
          useValue: { members, legs },
        },
        AnimalService,
      ],
      exports: [AnimalService],
    };
  }
}
