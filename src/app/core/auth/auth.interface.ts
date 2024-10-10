export interface Auth {
  access_token: AccessToken;
  user: AuthUser;
}

export interface AccessToken {
  original: OriginalAccessToken;
}

export interface OriginalAccessToken {
  access_token: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}
