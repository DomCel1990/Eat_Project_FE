import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Observable } from 'rxjs';
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
export class DoughnutComponent implements OnInit{
  chart: any;
  planday: Planday;
  kcalString: number;

  private plantDayService = inject(PlanDayService);

  ngOnInit(): void {

    this.plantDayService.plandayObs$.subscribe(response => {
      this.kcalString = response.energiaTotal
      this.doughnutSetUp(response)});
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip con sfondo scuro
            titleColor: 'white',
            bodyColor: 'white'
          }
        }
      }
    });
  }
}
