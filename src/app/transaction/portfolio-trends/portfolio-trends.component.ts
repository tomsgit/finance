import { Component, OnInit, Input } from '@angular/core';
import { PortfolioTrendsService } from 'app/transaction/portfolio-trends.service';
import { ActivatedRoute } from '@angular/router';

import { Chart,ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'portfolio-trends',
  templateUrl: './portfolio-trends.component.html',
  styleUrls: ['./portfolio-trends.component.css']
})
export class PortfolioTrendsComponent implements OnInit {

  constructor(private _trendService:PortfolioTrendsService,private route: ActivatedRoute) { }
  
  chart: Chart;
  chart_dates:string[];
  chart_cost:number[];
  chart_value:number[];
  chart_profit:number[];
  chart_painted:boolean;
  @Input() folioId:string;

  ngOnInit() {
    //this.folioId = this.route.snapshot.parent.params['folioId'];
    //console.log("folioId"+this.folioId);
    this.performanceLog();
  }
  

  performanceLog(){
    this.chart_painted=false;
    this.chart_dates=new Array();
    this.chart_cost=new Array();
    this.chart_value=new Array();
    this.chart_profit=new Array();
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    this._trendService.getTrends(this.folioId)
      .subscribe(
        data => {
          data.forEach(trend => {
            
            //this.chart_dates.push(trend.date.toLocaleDateString("en-IN",options));
            this.chart_dates.push(trend.date.toISOString());
            this.chart_cost.push(+(trend.cost/100000).toFixed(2));
            this.chart_value.push(+(trend.value/100000).toFixed(2));
            this.chart_profit.push(+(trend.gain/1000).toFixed(2));
          });
         if(this.chart){
          this.chart.update();
         }
          console.log('Trends data received');
          if(!this.chart_painted){
            this.chart = new Chart("canvas", {
              type: 'line',
              data: this.chartData(),
              options: this.chartOptions()
            });
            this.chart_painted=true;
          }
          
        },
        err => console.error('error doing Trends'+err.message),
        () => console.log('Trends complete')
      );
    
    
  }
  chartData():ChartData{
    return {
			labels: this.chart_dates,
			datasets: [{
				label: 'Value',
				borderColor: 'red',
				backgroundColor: 'red',
				fill: false,
				data: this.chart_value,
				yAxisID: 'topline',
      },
      {
				label: 'Cost',
				borderColor: 'black',
				backgroundColor: 'black',
				fill: false,
				data: this.chart_cost,
				yAxisID: 'topline',
			}
      , {
				label: 'Profit',
				borderColor: 'blue',
				backgroundColor: 'blue',
				fill: false,
				data: this.chart_profit,
				yAxisID: 'bottomline'
			}]
		}
  }
  chartOptions():ChartOptions {
    return {
      events:['click'],
      responsive: true,
      //hoverMode: 'index',
      //stacked: false,
      title: {
        display: true,
        text: 'Portfolio Performance'
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            unit: 'day'
          }

        }],
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          scaleLabel:{labelString:'Topline (Lakhs)',display:true},
          position: 'left',
          id: 'topline',
        },
        {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'bottomline',
          scaleLabel:{labelString:'Bottomline (000)',display:true},
          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
    
  }
}
