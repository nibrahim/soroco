import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookListService {
    constructor(private httpClient: HttpClient) { }

    getBooks() {
        const headers = new HttpHeaders().set('Authorization','Basic bm91ZmFsOnNlY3JldA==');
        return this.httpClient.get('http://127.0.0.1:5000/api/book/', {headers});
    }

    saveBook(name: string, author:  string, description?: string) {
        const headers = new HttpHeaders().set('Authorization','Basic bm91ZmFsOnNlY3JldA==').set('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpClient.post('http://127.0.0.1:5000/api/book/', 
                                    `name=${name}&author=${author}&brief=${description}`, // Review
                                    {headers});
    }

    getBookDetails(slug: string) {
        const headers = new HttpHeaders().set('Authorization','Basic bm91ZmFsOnNlY3JldA==');
        return this.httpClient.get(`http://127.0.0.1:5000/api/book/${slug}`, {headers});

    }

    // getClassroom(id: number) {
    //   return this.httpClient.get(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`);
    // }

    // updateStudent(id: number, data: any) {
    //   const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //   return this.httpClient.patch(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`, data, {headers});
    // }
}
