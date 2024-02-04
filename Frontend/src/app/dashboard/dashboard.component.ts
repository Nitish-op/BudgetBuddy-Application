import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import { ExpressdbService } from '../services/expressdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chart: Highcharts.Chart | null = null;
  constructor(private myrouter:Router,private service:ExpressdbService) {}
  user:any;
  username:any;expenses:any;janamount=0;febamount=0;filterexpense:any;
  ngOnInit(){

    if(localStorage.getItem('logeduser')==null)
      this.myrouter.navigateByUrl("");
    else{
      this.user = localStorage.getItem("logeduser");
      this.user = JSON.parse(this.user);
      this.username = this.user.username;
    }
    this.user={
      "userName":this.username
    }
    this.service.allcards(this.username).subscribe((res)=>{
      this.myCards = Object.values(res);
    })
    this.service.getCardDatabyName(this.user).subscribe((result)=>{
      this.expenses=result;
      console.log(result)
      this.caljanamount()
      this.calfebamount();
    })

  }
  
  calfebamount(){
    this.filterexpense=this.expenses.filter((item:any)=>item.date.startsWith('2024-02'))
      console.log(this.filterexpense)
    for(let i of this.filterexpense){
      this.febamount=this.febamount+i.amountSpent;
      
    }
    console.log(this.febamount)

  }

  caljanamount(){
      
    this.filterexpense=this.expenses.filter((item:any)=>item.date.startsWith('2024-01'))
      console.log(this.filterexpense)
    for(let i of this.filterexpense){
      this.janamount=this.janamount+i.amountSpent;
      
    }
    console.log(this.janamount)

  }  

  myCards: any[] = [];
  displayCreditCard = false;
  creditCardData: any = {};
 
  _id : any;


  ngAfterViewInit() {
    this.chart = Highcharts.chart('container', {
      title: {
          text: 'Amount Spent',
          align: 'left'
      },
      subtitle: {
          text: 'Chart option: Plain',
          align: 'left'
      },
      colors: ['#191970','#4169E1'],
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
          type: 'column',
          name: 'Spent Amount',
          borderRadius: 5,
          colorByPoint: true,
          data: [5412, 4977, 4730, 4437, 3947, 3707, 4143, 3609,3311, 3072, 2899, 2887],
          showInLegend: false
      }]
    });
  }
  
  updateChart(chartType: string) {
    if (this.chart) {
      if (chartType === 'plain') {
        this.chart.update({
          chart: {
            inverted: false,
            polar: false
          },
          subtitle: {
            text: 'Chart option: Plain'
          }
        });
      } else if (chartType === 'inverted') {
        this.chart.update({
          chart: {
            inverted: true,
            polar: false
          },
          subtitle: {
            text: 'Chart option: Inverted'
          }
        });
      } else if (chartType === 'polar') {
        this.chart.update({
          chart: {
            inverted: false,
            polar: true
          },
          subtitle: {
            text: 'Chart option: Polar'
          }
        });
      }
    }
  }
  }