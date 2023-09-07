import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';
// import { ChartDataset, ChartOptions } from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  chart: Chart<"pie", any, string>;
  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
  pieChartData4: any;

  constructor(private dashboardService: DashboardService) { }


  ngOnInit(): void {

    this.dashboardService.getCountOfActiveVehicle().subscribe(data => {
      this.pieChartData = data;
      this.dashboardService.getCountOfNonActiveVehicle().subscribe(data => {
        this.pieChartData2 = data;
        this.dashboardService.getCountOfActiveDriver().subscribe(data => {
          this.pieChartData3 = data;
          this.dashboardService.getCountOfNonActiveDriver().subscribe(data => {
            this.pieChartData4 = data;


            this.chart = new Chart('pieChart', {
              type: 'pie',
              data: {
                labels: ['Active', 'Non-active'],
                datasets: [{
                  label: 'Vehicle Data',
                  data: [this.pieChartData, this.pieChartData2],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                  ]
                }]
              }
            })

            this.chart = new Chart('pieChart2', {
              type: 'pie',
              data: {
                labels: ['Active', 'Non-active'],
                datasets: [{
                  label: 'Vehicle Data',
                  data: [this.pieChartData3, this.pieChartData4],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                  ]
                }]
              }
            })

          })
        })
      })
    })

  }
}
