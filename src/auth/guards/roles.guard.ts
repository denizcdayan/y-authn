import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log('required roles:', requiredRoles);
    // const { userbefore } = context.switchToHttp().getRequest();
    // console.log('before user', userbefore.username);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    console.log(`user obj -> ${user}`);
    console.log(`username -> ${user.username}`);
    console.log(`user roles -> ${user.roles}`);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

// RolesGuard class will compare
// the roles assigned to the current user
// to the actual roles required by the
// current route being processed.
