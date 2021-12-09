import { Controller, Get } from '@nestjs/common';
import { AnimalService } from './animal/animal/animal.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly animalService: AnimalService,
  ) {}

  @Get()
  getHello(): string {
    const animals = this.animalService.getMembers();
    return `
    <ul>
      ${animals
        .map(
          ({ name, legs }) => `
        <li><strong>${name}</strong>: ${legs} ${
            legs === 1 ? 'leg' : 'legs'
          }</li>
      `,
        )
        .join('')}
    </ul>
    `;
  }
}
