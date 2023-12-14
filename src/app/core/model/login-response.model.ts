export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
  phoneNumber: string;
  userId:Number;
}
