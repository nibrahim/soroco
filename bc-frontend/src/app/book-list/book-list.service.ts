import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BookListService {
    baseUrl: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getBooks() {
        return this.httpClient.get(`${this.baseUrl}/api/book/`);
    }

    saveBook(name: string, author: string, description?: string) {
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.httpClient.post(`${this.baseUrl}/api/book/`, {name, author, description}, { headers });
    }

    getBookDetails(slug: string) {
        return this.httpClient.get(`${this.baseUrl}/api/book/${slug}`);
    }

    // getClassroom(id: number) {
    //   return this.httpClient.get(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`);
    // }

    // updateStudent(id: number, data: any) {
    //   const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //   return this.httpClient.patch(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`, data, {headers});
    // }
}
