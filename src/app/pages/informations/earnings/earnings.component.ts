import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {
  isMonthSelected:boolean=false
  chosenMonth:string="";
  months={
    "Juin":{
      "ca":1155.00,
      "nights":21
    },
    "Juillet":{
      "ca":1540.00,
      "nights":28
    },
    "Aout":{
      "ca":1485.00,
      "nights":27
    },
    "Septembre":{
      "ca":0.00,
      "nights":4
    },
    "Octobre":{
      "ca":0.00,
      "nights":0
    },
    "Novembre":{
      "ca":0.00,
      "nights":0
    },
    "Décembre":{
      "ca":0.00,
      "nights":0
    },
  }
  constructor() { }

  ngOnInit(): void {
  }

  changeMonth(month:string){
    this.chosenMonth=month
  }

}
