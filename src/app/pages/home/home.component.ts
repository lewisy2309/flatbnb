import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnounceService } from 'src/app/core/services/announce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  researchForm: UntypedFormGroup=new UntypedFormGroup({
    city: new UntypedFormControl('', [
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    checkInDate: new UntypedFormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    checkOutDate: new UntypedFormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  cityToResearch="";
  checkInDate="";
  checkOutDate="";
  announces:Array<any>=[]
  searchedAnnounces:Array<any>=[];
  constructor(private router:Router,private announceService: AnnounceService) { }

  ngOnInit(): void {
    this.getAllAnnouces();
  }

  getAllAnnouces(){
    this.announceService.getAllAnnounces().subscribe((announces:Array<any>)=>{
      this.announces=announces
    })
  }

  goToAnnounce(announceId: string){
    this.router.navigateByUrl('/announces/'+announceId)
  }

  researchAnnounce(){
    this.cityToResearch = this.researchForm.value.city;
    this.checkInDate = this.researchForm.value.checkInDate;
    this.checkOutDate = this.researchForm.value.checkOutDate;
    if(this.cityToResearch.length>0 && this.checkInDate.length>0 && this.checkOutDate.length>0){
      this.announceService.searchAnnounceByCityAndDate(this.cityToResearch,this.checkInDate,this.checkOutDate).subscribe((searchedAnnounces:Array<any>)=>{
        this.searchedAnnounces=searchedAnnounces
      })
    }
    if(this.cityToResearch.length>0 && (this.checkInDate.length==0 || this.checkOutDate.length==0)){
      this.announceService.searchAnnounceByCity(this.cityToResearch).subscribe((searchedAnnounces:Array<any>)=>{
        this.searchedAnnounces=searchedAnnounces
      })
    }
    if(this.cityToResearch.length==0 && (this.checkInDate.length>0 && this.checkOutDate.length>0)){
      this.announceService.searchAnnouceByDate(this.checkInDate,this.checkOutDate).subscribe((searchedAnnounces:Array<any>)=>{
        this.searchedAnnounces=searchedAnnounces
      })
    }
  }

}
