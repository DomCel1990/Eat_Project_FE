import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Planday } from "../models/plan-day.model";
import { BehaviorSubject, tap } from "rxjs";

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
        return this.http.put<Planday>('http://localhost:8080/planday', null, {
            params: param
        }).pipe(
            tap(response => this.plandayObs$.next(response))
        );
    }

    getPlanDay() {
        const newDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        const param = new HttpParams()
            .set('date', newDate)
        return this.http.get<Planday>('http://localhost:8080/planday', {
            params: param
        }).pipe(
            tap(response => this.plandayObs$.next(response))
        );
    }

    getAllPlanDay() {
        return this.http.get<Planday[]>('http://localhost:8080/planday/all',).pipe(
            tap(response => this.plandayAllObs$.next(response))
        );
    }
}