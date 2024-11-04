import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { User } from "../models/user.model";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    maxKcal = new BehaviorSubject<number>(0);
    private http = inject(HttpClient);

    getUser(userId = 1) {
        const param = new HttpParams()
        .set('id', userId)
        return this.http.get<User>('http://localhost:8080/user', {
            params: param
        });
    }

    getUserBRM(userId = 1) {
        const param = new HttpParams()
        .set('id', userId)
        return this.http.get<number>('http://localhost:8080/user/brm', {
            params: param
        }).pipe(
            tap(res => this.maxKcal.next(res))
        );
    }
}