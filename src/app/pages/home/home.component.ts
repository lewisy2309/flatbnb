import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnounceService } from 'src/app/core/services/announce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  announces:Array<any>=[]
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

}
