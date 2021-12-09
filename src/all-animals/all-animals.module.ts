import { DynamicModule, Module } from '@nestjs/common';
import { AnimalModule } from '../animal/animal.module';
import { AllAnimalsService } from './all-animals/all-animals.service';

@Module({
  providers: [AllAnimalsService],
})
export class AllAnimalsModule {
  static register(
    options: Record<string, { legs: number; members: Array<string> }>,
  ) {
    const speciesKeys = Object.keys(options);
    const speciesSymbols: Record<string, symbol> = speciesKeys
      .map((key) => ({ [key]: Symbol(key) }))
      .reduce((a, b) => ({ ...a, ...b }), {});

    const dynamicImports: Array<DynamicModule> = speciesKeys.map((key) =>
      AnimalModule.register(options[key]),
    );

    return {
      module: AllAnimalsModule,
      providers: [],
      exports: [],
    };
  }
}
