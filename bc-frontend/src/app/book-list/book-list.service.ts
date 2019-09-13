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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('author', author);
        formData.append('brief', description);
        return this.httpClient.post(`${this.baseUrl}/api/book/`, formData);
    }

    getBookDetails(slug: string) {
        return this.httpClient.get(`${this.baseUrl}/api/book/${slug}`);
    }

    getReviews(slug: string) {
        return this.httpClient.get(`${this.baseUrl}/api/book/${slug}/review/`);
    }

    addReview(slug: string, text: string) {
        const formData = new FormData();
        formData.append('review', text);
        return this.httpClient.post(`${this.baseUrl}/api/book/${slug}/review/`, formData);
    }

    getReview(slug: string, rId: number) {
        return this.httpClient.get(`${this.baseUrl}/api/book/${slug}/review/${rId}`);
    }

    // getClassroom(id: number) {
    //   return this.httpClient.get(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`);
    // }

    // updateStudent(id: number, data: any) {
    //   const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //   return this.httpClient.patch(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`, data, {headers});
    // }
}
