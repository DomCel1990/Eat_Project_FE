import { Routes } from '@angular/router';
import { EatDayComponent } from './pages/eat-day/eat-day.component';
import { CreateEatComponent } from './pages/create-eat/create-eat.component';
import { PlanDayComponent } from './pages/plan-day/plan-day.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/eat-day',
        pathMatch: 'full',
    },
    {
        path: 'eat-day',
        component: EatDayComponent
    },
    {
        path: 'creat-eat',
        component: CreateEatComponent
    },
    {
        path: 'plan-day',
        component: PlanDayComponent
    },
];
