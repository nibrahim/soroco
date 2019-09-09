import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookListService {
  constructor(private httpClient: HttpClient) { }

  getBooks() {
      const headers = new HttpHeaders().set('Authorization','Basic bm91ZmFsOnNlY3JldA==');
      return this.httpClient.get('https://soroco-api.herokuapp.com', {headers});
  }

  // getClassroom(id: number) {
  //   return this.httpClient.get(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`);
  // }

  // updateStudent(id: number, data: any) {
  //   const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //   return this.httpClient.patch(`https://hamon-interviewapi.herokuapp.com/classrooms/${id}?api_key=5619a`, data, {headers});
  // }
}
