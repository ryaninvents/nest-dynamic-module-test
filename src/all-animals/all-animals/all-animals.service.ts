import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  AnimalService,
  AnimalServiceOptions,
} from '../../animal/animal/animal.service';

export const ALL_ANIMALS_OPTIONS = Symbol('ALL_ANIMALS_OPTIONS');
export type AllAnimalsOptionType = Array<{
  key: string;
  reference: symbol;
  options: AnimalServiceOptions;
}>;

@Injectable()
export class AllAnimalsService {
  constructor(
    @Inject(ALL_ANIMALS_OPTIONS) private readonly options: AllAnimalsOptionType,
    private moduleRef: ModuleRef,
  ) {}

  getKeys() {
    return this.options.map(({ key }) => key);
  }

  getServiceByKey(key: string) {
    const opt = this.options.find((opt) => opt.key === key);
    if (!opt) return null;
    return this.moduleRef.get(opt.reference);
  }

  allServices() {
    return this.options.map(({ reference }) =>
      this.moduleRef.get<AnimalService>(reference, { strict: false }),
    );
  }

  getMembers() {
    const services = this.allServices();
    return services
      .map((s) => s.getMembers())
      .reduce((a, b) => a.concat(b), []);
  }
}
