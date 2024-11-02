import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PlanDayService } from '../../services/plan-day.service';
import { Planday } from '../../models/plan-day.model';
Chart.register(...registerables);
@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent implements OnInit {
  chartPie: any;

  private plantDayService = inject(PlanDayService);
  
  ngOnInit(): void {

    this.plantDayService.plandayAllObs$.subscribe(response => this.lineChar(response));
    
  }

  lineChar(plantDays: Planday[]) {

    if (!plantDays || plantDays.length === 0) return;


    const labels: string[] = plantDays.map(response => this.transformData(response))
    const dataPlan: number[] = plantDays.map(resp => resp.energiaTotal);
    const dataPlanProtein: number[] = plantDays.map(resp => resp.proteineTotal);
    const dataPlanFat: number[] = plantDays.map(resp => resp.grassiTotal);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Calorie',
          data: dataPlan,
          fill: false,
          borderColor: 'rgba(110, 201, 207, 0.425)',
          tension: 0.1,
        },
        {
          label: 'Proteine',
          data: dataPlanProtein,
          fill: false,
          borderColor: 'rgba(207, 129, 110, 0.425)',
          tension: 0.1,
        },
        {
          label: 'Grassi',
          data: dataPlanFat,
          fill: false,
          borderColor: 'rgba(255, 230, 0, 0.425)',
          tension: 0.1,
        },
      ],
    };

    if (this.chartPie) this.chartPie.destroy();

    this.chartPie = new Chart('line', {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  transformData(planday: Planday): string {
      const data = planday.dateLocale
      const year = data.slice(0, 4);
      const month = data.slice(4, 6);
      const day = data.slice(6, 8);
      return `${day}/${month}/${year}`;
  }


}
