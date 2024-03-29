import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ShelfListService {
    baseUrl: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getShelves() {
        return this.httpClient.get(`${this.baseUrl}/api/shelf/`);
    }

    saveShelf(name: string) {
        const formData = new FormData();
        formData.append('name', name);
        return this.httpClient.post(`${this.baseUrl}/api/shelf/`, formData);
    }

    getShelfDetails(id: number) {
        return this.httpClient.get(`${this.baseUrl}/api/shelf/${id}`);
    }

    addBookToShelf(id: number, slug: string) {
        const formData = new FormData();
        formData.append('book', slug);
        return this.httpClient.put(`${this.baseUrl}/api/shelf/${id}`, formData);
    }

    removeBookFromShelf(id: number, slug: string) {
        const formData = new FormData();
        formData.append('book', slug);
        return this.httpClient.request(`delete`, `${this.baseUrl}/api/shelf/${id}`, {body: formData});
    }
}
