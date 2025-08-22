import { PrivateRoutes, PublicRoutes, Roles } from '../models';

export const getRoleRoute = (role: Roles): string => {
  
  switch (role) {
    case Roles.ADMIN:
      return `/${PrivateRoutes.ADMIN}`;
    case Roles.USER:
      return `/${PrivateRoutes.USER}`;
    default:
      return `/${PublicRoutes.LOGIN}`;
  }
};
