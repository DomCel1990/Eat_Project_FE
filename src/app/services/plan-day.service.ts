import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

import { Planday } from "../models/plan-day.model";

@Injectable({
    providedIn: 'root'
})
export class PlanDayService {
    plandayObs$ = new BehaviorSubject<Planday>(null);
    plandayAllObs$ = new BehaviorSubject<Planday[]>(null);

    private http = inject(HttpClient);

    addPlanday(name: string, date: string, grammi: number) {
        const param = new HttpParams()
            .set('name', name)
            .set('date', date)
            .set('grammi', grammi)
        return this.http.put<Planday>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/planday', null, {
            params: param
        }).pipe(
            tap(response => this.plandayObs$.next(response))
        );
    }

    getPlanDay() {
        const newDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        const param = new HttpParams()
            .set('date', newDate)
        return this.http.get<Planday>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/planday', {
            params: param
        }).pipe(
            tap(response => this.plandayObs$.next(response))
        );
    }

    getAllPlanDay() {
        return this.http.get<Planday[]>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/planday/all',).pipe(
            tap(response => this.plandayAllObs$.next(response))
        );
    }
}