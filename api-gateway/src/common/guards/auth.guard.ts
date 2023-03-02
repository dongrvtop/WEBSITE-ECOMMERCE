import type { IAuthGuard, Type } from '@nestjs/passport';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export function AuthGuard(
  options?: Partial<{ public: boolean; accessToken: boolean }>,
): Type<IAuthGuard> {
  const strategies = ['api-key'];

  if (options?.accessToken) {
    strategies.pop();
    strategies.push('access-token');
  }

  if (options?.public) {
    strategies.push('public');
  }

  return NestAuthGuard(strategies);
}
