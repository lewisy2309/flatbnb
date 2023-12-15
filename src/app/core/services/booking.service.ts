import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookingsByUsername(userId:string){
    return this.http.get<Array<any>>(environment.apiUrl+"bookings/username/"+userId);
  }

  getHostBookingsByUsername(userId:string){
    return this.http.get<Array<any>>(environment.apiUrl+"bookings/username/"+userId);
  }
}
