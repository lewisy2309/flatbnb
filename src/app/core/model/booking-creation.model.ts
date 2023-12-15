export interface BookingCreation {
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  numberOfNight?:number,
  totalBooking?:number,
  priceByNigth:number,
  user:number;
  announce:number;
}
