import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {

  constructor(private http: HttpClient) {
  }

  getAllAnnounces(){
    return this.http.get<Array<any>>(environment.apiUrl+"announces");
  }

  getAnnounce(announceId:number){
    return this.http.get(environment.apiUrl+"announces/"+announceId);
  }

  searchAnnounceByCity(city:string){
    return this.http.get<Array<any>>(environment.apiUrl+"announces/announces-by-city/"+city);
  }

  searchAnnouceByDate(checkInDate:string,checkOutDate:string){
    return this.http.get<Array<any>>(environment.apiUrl+"announces/announces-without-reservations/"+checkInDate+"/"+checkOutDate);
  }

  searchAnnounceByCityAndDate(city:string,checkInDate:string,checkOutDate:string){
    return this.http.get<Array<any>>(environment.apiUrl+"announces/search/"+city+"/"+checkInDate+"/"+checkOutDate);
  }
}


