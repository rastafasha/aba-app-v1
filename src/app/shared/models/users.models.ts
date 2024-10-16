import { AuthUser } from 'src/app/core/auth/auth.interface';

export interface AppUser extends AuthUser {
  roles: string[];
  permissions: string[];
  location_id: number;
  avatar?: string;
}
