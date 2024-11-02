import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Planday } from '../../models/plan-day.model';
import { PlanDayService } from '../../services/plan-day.service';
import { CaloriesPipe } from '../../pipes/calories.pipe';

@Component({
  selector: 'app-doughnut',
  standalone: true,
  imports: [CaloriesPipe],
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.css'
})
export class DoughnutComponent implements OnInit, OnDestroy {
  chart: any;
  kcalString: number;

  private plantDayService = inject(PlanDayService);

  ngOnInit(): void {

    this.plantDayService.plandayObs$.subscribe(response => {
      this.kcalString = response?.energiaTotal
      this.doughnutSetUp(response)

    });
  }

  doughnutSetUp(planday: Planday) {
    if (this.chart) this.chart.destroy();
    if (planday)
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: [
            'Carboidrati',
            'Grassi',
            'Zuccheri',
            'Proteine',
            'Fibre'
          ],
          datasets: [{
            data: [
              planday.carboidratiTotal,
              planday.grassiTotal,
              planday.zuccheriTotal,
              planday.proteineTotal,
              planday.fibreTotal
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)'
            ],
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleColor: 'white',
              bodyColor: 'white'
            }
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
