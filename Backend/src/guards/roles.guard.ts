import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/entities';
import { JwtService } from '@nestjs/jwt';
import { UserCreatedDto } from 'src/dto';

const matchRoles = (requiredRoles: UserRole[], userRoles: UserRole[]): boolean => {
  return !userRoles.find(role => requiredRoles.indexOf(role) === -1);
}

@Injectable()
export class RolesGuard implements CanActivate  {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split('Bearer ')[1];
    const user: UserCreatedDto  = this.jwtService.decode(token) as UserCreatedDto;
    return token && user && matchRoles(roles, user.roles);
  }
}