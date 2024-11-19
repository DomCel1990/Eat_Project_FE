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
        return this.http.get<User>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/user', {
            params: param
        });
    }

    getUserBRM(userId = 1) {
        const param = new HttpParams()
        .set('id', userId)
        return this.http.get<number>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/user/brm', {
            params: param
        }).pipe(
            tap(res => this.maxKcal.next(res))
        );
    }
}