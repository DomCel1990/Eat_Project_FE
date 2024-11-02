import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private http = inject(HttpClient);

    getUser(userId = 1) {
        const param = new HttpParams()
        .set('id', userId)
        return this.http.get<User>('http://localhost:8080/user', {
            params: param
        });
    }
}