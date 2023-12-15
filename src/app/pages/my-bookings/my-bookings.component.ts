import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings:Array<any>=[];
  username:any;
  constructor(private tokenService:TokenService, private bookingService:BookingService) { }

  ngOnInit(): void {
    this.username=this.tokenService.getUsername();
    this.getUserBookings()
  }

  getUserBookings(){
    this.bookingService.getBookingsByUsername(this.username).subscribe((bookings)=>{
      console.log(bookings)
      this.bookings=bookings
    })
  }

}
