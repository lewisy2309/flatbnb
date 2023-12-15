import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingCreation } from 'src/app/core/model/booking-creation.model';
import { AnnounceService } from 'src/app/core/services/announce.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit {
  announce:any;
  announceId: string | null | undefined;
  bookingForm: UntypedFormGroup=new UntypedFormGroup({
    checkInDate: new UntypedFormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    checkOutDate: new UntypedFormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  checkInDate="";
  checkOutDate="";
  bookingCreation:BookingCreation;
  myDate = new Date();
  date:string="";
  userId:any;
  constructor(private tokenService:TokenService,private router:Router,private announceService:AnnounceService,private activatedRoute: ActivatedRoute) {
    this.bookingCreation={
      checkInDate:"",
      checkOutDate:"",
      bookingDate: "",
      status: "",
      priceByNigth:0,
      user:0,
      announce:0,
    }
   }

  ngOnInit(): void {
    this.announceId=this.activatedRoute.snapshot.paramMap.get('announceId');
    this.getAnnounce();
    this.userId=this.tokenService.getUserId();
  }

  getAnnounce(){
    this.announceService.getAnnounce(Number(this.announceId)).subscribe((announce)=>{
      this.announce=announce;
    })
  }

  bookAnnounce(){
    this.bookingCreation.checkInDate = this.bookingForm.value.checkInDate;
    this.bookingCreation.checkOutDate = this.bookingForm.value.checkOutDate;
    var str = new Date().setSeconds(0,0);
    var dt = new Date(str).toISOString();
    this.bookingCreation.bookingDate=dt;
    this.bookingCreation.numberOfNight=this.calculateDiff(this.bookingForm.value.checkInDate,this.bookingForm.value.checkOutDate);
    let numberOfNight=this.calculateDiff(this.bookingForm.value.checkInDate,this.bookingForm.value.checkOutDate);
    this.bookingCreation.priceByNigth=Number(this.announce.priceByNigth);
    let priceByNigth=Number(this.announce.priceByNigth);
    let totalBooking=numberOfNight*priceByNigth
    this.bookingCreation.totalBooking=totalBooking;
    this.bookingCreation.status="réservé";
    this.bookingCreation.announce=Number(this.announceId);
    this.bookingCreation.user=Number(this.announceId);
    console.log(this.bookingCreation)
    if((this.checkInDate.length==0 || this.checkOutDate.length==0)){
      this.announceService.bookAnnouce(this.bookingCreation).subscribe((announce)=>{
        console.log(announce)
        this.router.navigateByUrl('/my-bookings')
      })
    }
  }


  calculateDiff(checkingDate:string,checkOutDate:string){
    let date1 = new Date(checkingDate);
    let date2= new Date(checkOutDate)
    return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}
