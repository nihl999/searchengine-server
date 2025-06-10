import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './core.controller';
import { HelloService } from './core.service';

describe('AppController', () => {
  let appController: CoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [HelloService],
    }).compile();

    appController = app.get<CoreController>(CoreController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
