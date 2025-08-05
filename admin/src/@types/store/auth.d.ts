


interface BaseAuthenticatedState {
  accessToken: string;
  loggedIn: true;
  loading: boolean;
}
declare interface AccountAuthenticatedState extends BaseAuthenticatedState {
  user: Account;
  role: UserRole.Account;
}

declare interface AdminAuthenticatedState extends BaseAuthenticatedState {
  user: Admin;
  role: UserRole.Admin;
}
declare type AuthStateLoggedIn = AccountAuthenticatedState | AdminAuthenticatedState;

declare interface AuthStateLoggedOut {
  loggedIn: false;
  loading: boolean;
}

declare type AuthState = AuthStateLoggedIn | AuthStateLoggedOut;