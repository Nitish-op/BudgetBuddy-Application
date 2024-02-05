import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { ExpressdbService } from '../services/expressdb.service';
import { Color,ScaleType } from '@swimlane/ngx-charts';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-expencetracking',
  templateUrl: './expencetracking.component.html',
  styleUrl: './expencetracking.component.css'
})

export class ExpencetrackingComponent{

  constructor(private service:ExpressdbService){}
  cards:any;user:any;
  username:any;
  myCards:any;
  ob:any;
  selectedCard:any;
  spendings:any;
  details:any;
  getDetails(){
    console.log("selected value is "+this.selectedCard)
    this.details={
      "userName":this.username,
      "cardNumber":this.selectedCard
    }
    this.service.getCardData(this.details).subscribe((result)=>{
      this.spendings=result
      console.log(this.spendings)
      this.display()
    })
  }

  single: any[] = [];   
  view: [number, number] = [500, 400];
  colorScheme:Color = {
    domain: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
    name: 'Custom Scheme', 
    selectable: true,      
    group: ScaleType.Ordinal, 
   };
   sortKey = 'date';
   sortReverse = false;
 
  

    display(){
    const totalSpendingByType = this.calculateTotalSpending(this.spendings);

    this.single = Object.keys(totalSpendingByType).map(transactionType => ({
      name: transactionType,
      value: totalSpendingByType[transactionType]
    }));
  }

  calculateTotalSpending(data: any[]) {
    const totalSpendingByType: { [key: string]: number } = {};

    data.forEach(item => {
      if (totalSpendingByType[item.transactionType]) {
        totalSpendingByType[item.transactionType] += item.amountSpent;
      } else {
        totalSpendingByType[item.transactionType] = item.amountSpent;
      }
    });

    return totalSpendingByType;
  }


  ngOnInit(){
    this.user = localStorage.getItem("logeduser");
  this.user = JSON.parse(this.user);
  this.username = this.user.username;
  console.log(this.username);
  this.service.allcards(this.username).subscribe((res)=>{
    this.myCards = Object.values(res);
    console.log(this.myCards);
  })
  }

  getHeaderClass(key: string): string {
    return this.sortKey === key ? 'sorted-header' : '';
  }

  sortTable(key: string) {
    // If the same key is clicked again, reverse the order
    if (this.sortKey === key) {
      this.sortReverse = !this.sortReverse;
    } else {
      // If a new key is clicked, reset the order to ascending
      this.sortKey = key;
      this.sortReverse = false;
    }

    // Sort the transactions array based on the selected key and order
    this.spendings.sort((a:any, b:any) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === 'string') {
        return this.sortReverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      }

      return this.sortReverse ? valueB - valueA : valueA - valueB;
    });
  }
}

// export class ExpencetrackingComponent {
//   public ngAfterViewInit(): void {
//     this.createChartGauge();
//     this.createChartPie();
//     this.createChartColumn();
//     this.createChartLine();
//   }

//   private getRandomNumber(min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1) + min)
//   }

//   private createChartGauge(): void {
//     const chart = Highcharts.chart('chart-gauge', {
//       chart: {
//         type: 'solidgauge',
//       },
//       title: {
//         text: 'Gauge Chart',
//       },
//       credits: {
//         enabled: false,
//       },
//       pane: {
//         startAngle: -90,
//         endAngle: 90,
//         center: ['50%', '85%'],
//         size: '160%',
//         background: {
//             innerRadius: '60%',
//             outerRadius: '100%',
//             shape: 'arc',
//         },
//       },
//       yAxis: {
//         min: 0,
//         max: 100,
//         stops: [
//           [0.1, '#55BF3B'], // green
//           [0.5, '#DDDF0D'], // yellow
//           [0.9, '#DF5353'], // red
//         ],
//         minorTickInterval: null,
//         tickAmount: 2,
//         labels: {
//           y: 16,
//         },
//       },
//       plotOptions: {
//         solidgauge: {
//           dataLabels: {
//             y: -25,
//             borderWidth: 0,
//             useHTML: true,
//           },
//         },
//       },
//       tooltip: {
//         enabled: false,
//       },
//       series: [{
//         name: null,
//         data: [this.getRandomNumber(0, 100)],
//         dataLabels: {
//           format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
//         },
//       }],
//     } as any);

//     setInterval(() => {
//       chart.series[0].points[0].update(this.getRandomNumber(0, 100));
//     }, 1000);
//   }

//   private createChartPie(): void {
//     let date = new Date();
//     const data: any[] = [];

//     for (let i = 0; i < 5; i++) {
//       date.setDate(new Date().getDate() + i);
//       data.push({
//         name: `${date.getDate()}/${date.getMonth() + 1}`,
//         y: this.getRandomNumber(0, 1000),
//       });
//     }

//     const chart = Highcharts.chart('chart-pie', {
//       chart: {
//         type: 'pie',
//       },
//       title: {
//         text: 'Pie Chart',
//       },
//       credits: {
//         enabled: false,
//       },
//       tooltip: {
//         headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
//         pointFormat: '<span>Amount: {point.y}</span>',
//         useHTML: true,
//       },
//       series: [{
//         name: null,
//         innerSize: '50%',
//         data,
//       }],
//     } as any);

//     setInterval(() => {
//       date.setDate(date.getDate() + 1);
//       chart.series[0].addPoint({
//         name: `${date.getDate()}/${date.getMonth() + 1}`,
//         y: this.getRandomNumber(0, 1000),
//       }, true, true);
//     }, 1500);
//   }

//   private createChartColumn(): void {
//     let date = new Date();
//     const data: any[] = [];

//     for (let i = 0; i < 10; i++) {
//       date.setDate(new Date().getDate() + i);
//       data.push({
//         name: `${date.getDate()}/${date.getMonth() + 1}`,
//         y: this.getRandomNumber(0, 1000),
//       });
//     }

//     const chart = Highcharts.chart('chart-column' as any, {
//       chart: {
//         type: 'column',
//       },
//       title: {
//         text: 'Column Chart',
//       },
//       credits: {
//         enabled: false,
//       },
//       legend: {
//         enabled: false,
//       },
//       yAxis: {
//         min: 0,
//         title: undefined,
//       },
//       xAxis: {
//         type: 'category',
//       },
//       tooltip: {
//         headerFormat: `<div>Date: {point.key}</div>`,
//         pointFormat: `<div>{series.name}: {point.y}</div>`,
//         shared: true,
//         useHTML: true,
//       },
//       plotOptions: {
//         bar: {
//           dataLabels: {
//             enabled: true,
//           },
//         },
//       },
//       series: [{
//         name: 'Amount',
//         data,
//       }],
//     } as any);

//     setInterval(() => {
//       date.setDate(date.getDate() + 1);
//       chart.series[0].addPoint({
//         name: `${date.getDate()}/${date.getMonth() + 1}`,
//         y: this.getRandomNumber(0, 1000),
//       }, true, true);
//     }, 1500);
//   }

//   private createChartLine(): void {
//     let date = new Date();
//     const data: any[] = [];

//     for (let i = 0; i < 10; i++) {
//       date.setDate(new Date().getDate() + i);
//       data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
//     }

//     const chart = Highcharts.chart('chart-line', {
//       chart: {
//         type: 'line',
//       },
//       title: {
//         text: 'Line Chart',
//       },
//       credits: {
//         enabled: false,
//       },
//       legend: {
//         enabled: false,
//       },
//       yAxis: {
//         title: {
//           text: null,
//         }
//       },
//       xAxis: {
//         type: 'category',
//       },
//       tooltip: {
//         headerFormat: `<div>Date: {point.key}</div>`,
//         pointFormat: `<div>{series.name}: {point.y}</div>`,
//         shared: true,
//         useHTML: true,
//       },
//       series: [{
//         name: 'Amount',
//         data,
//       }],
//     } as any);

//     setInterval(() => {
//       date.setDate(date.getDate() + 1);
//       chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
//     }, 1500);
//   }
  
// }
