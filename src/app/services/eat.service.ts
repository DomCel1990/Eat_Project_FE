import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Alimento, AlimentoImage, AlimentoImagePeageble } from "../models/alimento.model";
import { Image } from "../models/image.model";


@Inject({
    provideIn: 'root'
})
export class EatService {
    eatName = new BehaviorSubject<string>(null);

    private http = inject(HttpClient);

    getEat(name: string) {
        const paramsName = new HttpParams()
            .set('name', name)
        return this.http.get<Alimento>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/alimento', { params: paramsName });
    }

    createeat(eat: Alimento) {
        return this.http.post<Alimento>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/alimento', eat);
    }

    getAllEats() {
        return this.http.get<Alimento[]>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/alimento/all');
    }

    getAllEatsPaginate(page?: number, size?: number) {
        const paramsPage = new HttpParams()
            .set('pagNum', page)
            .set('pageSize', size)
        return this.http.get<AlimentoImagePeageble>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/alimento/page', {
            params: paramsPage
        })
    }

    getAllEatsImage() {
        return this.http.get<AlimentoImage[]>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/alimento/eats');
    }

    uploadImage(name: string, fileData: FormData) {
        const params = new HttpParams()
            .set('name', name)

        return this.http.post<Image>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/image', fileData, {
            params: params,
            reportProgress: true,
            observe: 'events'
        });
    }

    getImage(name: string) {
        const params = new HttpParams()
            .set('name', name)
        return this.http.get<Image>('https://6dd0-2001-b07-646f-b52b-f06d-9b89-eeb7-2974.ngrok-free.app/image', {
            params: params
        });
    }
}