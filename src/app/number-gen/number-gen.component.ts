import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { NumberGeneSrvice, ICommand, IRealTime, IReport } from "../number-gen/number-gen.service";
/*
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'

*/
import { SignalrService } from "../number-gen/real-time.service";
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-number-gen',
  templateUrl: './number-gen.component.html',
  providers:[NumberGeneSrvice],
  styleUrls: ['./number-gen.component.css']
})
export class NumberGenComponent implements OnInit {
  inputSize = 0;
  isNumeric = false;
  isAlpha:boolean = false;
  isDouble = false;
  isStartClick = false;
  isEndClick = true;

  counter1 = 0;
  counter2 = 0;
  counter3 = 0;
  reportData: IReport = {totalAlph : 0, totalDouble : 0, totalInt : 0, totalNumbers : 0, numbers : []};
  isReportShow = false;
  
progressTimer = interval(10);
progressSubscription: any;

  constructor(private numGent: NumberGeneSrvice,public signalRService: SignalrService) { }

  ngOnInit(): void {
   // this.signalRService.connect();
    this.progressSubscription = this.progressTimer.subscribe(val => this.getCountMessage());
  }

  onClickStart(){
    if(this.isValid()){
      let model : ICommand = {inputSize : this.inputSize, isAlpha : this.isAlpha, isDouble : this.isDouble, isNumeric : this.isNumeric,
        cType : 1  };
      this.isStartClick = true;
      this.isEndClick = false;
      this.isReportShow = false;
      this.numGent.sendStartReq(model).subscribe(res=>{
          //console.log(this.isNumeric);
          this.isEndClick = false;
          this.isStartClick = false;
      });
    }
    else
      alert("Please select ... ");
  }

  onClickEnd(){
    if(this.isValid()){
      let model : ICommand = {inputSize : this.inputSize, isAlpha : this.isAlpha, isDouble : this.isDouble, isNumeric : this.isNumeric,
        cType : 0  };
       
      this.numGent.sendEndReq(model).subscribe(res=>{
          this.isEndClick = true;
          this.isStartClick = false;
      });
    }
    else
      alert("Please check or input size ... ");
  }

  onClickReport(){
    this.isReportShow = true;
      this.numGent.getReport().subscribe(res=>{
         this.reportData.totalAlph = res.totalAlph;
         this.reportData.totalDouble = res.totalDouble;
         this.reportData.totalInt = res.totalInt;
         this.reportData.totalNumbers = res.totalNumbers;
         this.reportData.numbers = res.list;
      });
  }
  

  isValid() : boolean{
    if( (this.isNumeric || this.isDouble || this.isAlpha ) && this.inputSize > 0)
      return true;
    else
      return false;
  }

  getCountMessage(){
     this.numGent.getCount().subscribe(res=>{
          //console.log(res);
          this.counter1 = res.counter1;
          this.counter2 = res.counter2;
          this.counter3 = res.counter3;
      });
  }
  ngOnDestroy() {
    this.progressSubscription && this.progressSubscription.unsubscribe();
  }


}
