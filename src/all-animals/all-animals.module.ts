import { DynamicModule, Module } from '@nestjs/common';
import { AnimalModule } from '../animal/animal.module';
import {
  AllAnimalsOptionType,
  AllAnimalsService,
  ALL_ANIMALS_OPTIONS,
} from './all-animals/all-animals.service';

@Module({
  providers: [AllAnimalsService],
})
export class AllAnimalsModule {
  static register(
    options: Record<string, { legs: number; members: Array<string> }>,
  ): DynamicModule {
    const speciesKeys = Object.keys(options);
    const speciesSymbols: Record<string, symbol> = speciesKeys
      .map((key) => ({ [key]: Symbol(key) }))
      .reduce((a, b) => ({ ...a, ...b }), {});

    const dynamicImports: Array<DynamicModule> = speciesKeys.map((key) =>
      AnimalModule.register(options[key], speciesSymbols[key]),
    );

    const animalsOptions: AllAnimalsOptionType = speciesKeys.map((key) => ({
      key,
      reference: speciesSymbols[key],
      options: options[key],
    }));

    return {
      module: AllAnimalsModule,
      imports: [...dynamicImports],
      providers: [
        AllAnimalsService,
        {
          provide: ALL_ANIMALS_OPTIONS,
          useValue: animalsOptions,
        },
      ],
      exports: [AllAnimalsService],
    };
  }
}
