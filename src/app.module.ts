import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalModule } from './animal/animal.module';
import { AllAnimalsModule } from './all-animals/all-animals.module';

@Module({
  imports: [
    AnimalModule.register({ members: ['Bandit', 'Pepper', 'Dexter'], legs: 4 }),
    AllAnimalsModule.register({
      dog: { members: ['Bandit', 'Pepper', 'Dexter'], legs: 4 },
      cat: { members: ['Nallah', 'Nacho'], legs: 4 },
      parrot: { members: ['Mikey'], legs: 2 },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
