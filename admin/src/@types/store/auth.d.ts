declare type AuthStateLoggedIn = {
  accessToken: string;
  loggedIn: true;
  loading: boolean;
  user: Admin
}

declare interface AuthStateLoggedOut {
  loggedIn: false;
  loading: boolean;
}

declare type AuthState = AuthStateLoggedIn | AuthStateLoggedOut;