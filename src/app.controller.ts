import { Controller, Get } from '@nestjs/common';
import { AllAnimalsService } from './all-animals/all-animals/all-animals.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly allAnimalsService: AllAnimalsService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const animals = await this.allAnimalsService.getMembers();
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
