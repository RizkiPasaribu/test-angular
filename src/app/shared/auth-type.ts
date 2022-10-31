export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  scope: null;
  refresh_token: string;
}
