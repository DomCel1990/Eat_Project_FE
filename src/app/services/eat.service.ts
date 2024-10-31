import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Inject } from "@angular/core";
import { Alimento, AlimentoImage } from "../models/alimento.model";
import { Image } from "../models/image.model";
import { BehaviorSubject } from "rxjs";

@Inject({
    provideIn: 'root'
})
export class EatService {
    eatName = new BehaviorSubject<string>(null);

    private http = inject(HttpClient);

    getEat(name: string) {
        const paramsName = new HttpParams()
        .set('name', name)
        return this.http.get<Alimento>('http://localhost:8080/alimento', {params: paramsName});
    }

    createeat(eat: Alimento) {
        return this.http.post<Alimento>('http://localhost:8080/alimento', eat);
    }
    getAllEats() {
        return this.http.get<Alimento[]>('http://localhost:8080/alimento/all');
    }

    getAllEatsImage() {
        return this.http.get<AlimentoImage[]>('http://localhost:8080/alimento/eats');
    }

    uploadImage(name: string, fileData: FormData) {
        const params = new HttpParams()
        .set('name', name)

        return this.http.post<Image>('http://localhost:8080/image', fileData, {
            params: params,
            reportProgress: true,
            observe: 'events'
        });
    }

    getImage(name: string) {
        const params = new HttpParams()
        .set('name', name)
        return this.http.get<Image>('http://localhost:8080/image', {
            params: params
        });
    }
}