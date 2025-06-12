import { Inject } from '@nestjs/common';
import { mountDbToken } from '../helpers/mountToken';

export const Db = (name?: string) => Inject(mountDbToken(name));
