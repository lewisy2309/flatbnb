import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnounceService } from 'src/app/core/services/announce.service';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit {
  announce:any;
  announceId: string | null | undefined;
  constructor(private announceService:AnnounceService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.announceId=this.activatedRoute.snapshot.paramMap.get('announceId');
    this.getAnnounce();
  }

  getAnnounce(){
    this.announceService.getAnnounce(Number(this.announceId)).subscribe((announce)=>{
      this.announce=announce;
    })
  }

}
