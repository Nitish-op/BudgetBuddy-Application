import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chart: Highcharts.Chart | null = null;
  constructor(private myrouter:Router) {}
  user:any;
  username:any;
  ngOnInit(){
    if(localStorage.getItem('logeduser')==null)
      this.myrouter.navigateByUrl("");
    else{
      this.user = localStorage.getItem("logeduser");
      this.user = JSON.parse(this.user);
      this.username = this.user.username;
    }
  }
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