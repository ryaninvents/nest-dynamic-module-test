import { Inject, Injectable } from '@nestjs/common';

export const ANIMAL_SERVICE_OPTIONS = Symbol('ANIMAL_SERVICE_OPTIONS');
export type AnimalServiceOptions = { members: Array<string>; legs: number };

@Injectable()
export class AnimalService {
  private members: Array<string>;
  private legs: number;
  constructor(@Inject(ANIMAL_SERVICE_OPTIONS) opts: AnimalServiceOptions) {
    this.members = opts.members;
    this.legs = opts.legs;
  }

  getMembers() {
    return this.members.map((name) => ({ name, legs: this.legs }));
  }
}
