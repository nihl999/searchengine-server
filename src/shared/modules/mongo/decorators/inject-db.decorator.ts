import { Inject } from '@nestjs/common';
import { mountDbToken } from '../helpers/mountToken';

export const InjectDb = (name?: string) => Inject(mountDbToken(name));
