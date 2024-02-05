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
  constructor(private myrouter:Router,private service:ExpressdbService) {}
  chart: Highcharts.Chart | null = null;
  user: any;
  username: any;
  expenses: any;
  monthsarray: number[] = [];
  janamount=0;
  febamount=0;
  filterexpense:any;
  
  myCards: any[] = [];
  displayCreditCard = false;
  creditCardData: any = {};
  totalSalary=0;
  _id : any;
  cardlen=0;expenseslen=0;
  findlen(){
   
    this.expenseslen=this.expenses.length
  }
  findcardlen(){
    this.cardlen=this.myCards.length;
  }
  userDetails:any;
  
  ngOnInit(){


    if(localStorage.getItem('logeduser')==null)
      this.myrouter.navigateByUrl("");
    else{
      this.user = localStorage.getItem("logeduser");
      this.user = JSON.parse(this.user);
      this.username = this.user.username;

      this.service.getUser(this.username).subscribe((result)=>{
        this.userDetails=result
        console.log(this.userDetails)
      })

    }
    this.user={
      "userName":this.username
    }
    this.service.allcards(this.username).subscribe((res)=>{
      this.myCards = Object.values(res);
      this.findcardlen()
    })
   


    this.service.getCardDatabyName(this.user).subscribe((result)=>{
      this.expenses=result;
      console.log(result)
      this.calculateMonthlyAmounts(); // Calculate monthly amounts
      this.initChart();// Initialize chart after calculating monthly amounts
      this.findlen()
        for(let s of this.monthsarray){
          this.totalSalary+=s;
        }
      
    })
    
  }
  
  calculateMonthlyAmounts() {
    const monthsData: any = {};
    for (const expense of this.expenses) {
      const month = expense.date.substring(5, 7); // Extract month from date (format: 'yyyy-mm-dd')
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month] += expense.amountSpent;
    }
    this.monthsarray = Object.values(monthsData);
    console.log("Monthly amounts:", this.monthsarray);
  }  



  initChart() {
    this.chart = Highcharts.chart('container', {
      title: {
        text: 'Amount Spent',
        align: 'left'
      },
      subtitle: {
        text: 'Chart option: Plain',
        align: 'left'
      },
      colors: ['#191970', '#4169E1'],
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        type: 'column',
        name: 'Spent Amount',
        borderRadius: 5,
        colorByPoint: true,
        data: this.monthsarray,
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