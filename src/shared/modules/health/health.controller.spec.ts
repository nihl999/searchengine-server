import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

//todo correct tests
describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(healthController.getHello()).toBe({
        status: 'live',
        timestamp: new Date().toISOString(),
      });
    });
  });
});
