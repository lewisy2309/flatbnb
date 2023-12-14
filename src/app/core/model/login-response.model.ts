export interface LoginResponse {
  token: string;
  refreshToken: string;
  expirationDate: Date;
  phoneNumber: string;
  userId:Number;
}
