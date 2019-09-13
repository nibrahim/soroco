import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  loginUser(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: `Basic ${btoa(`${username}:${password}`)}` });
    return this.httpClient.get(`${this.baseUrl}/api/token/`, { headers }).toPromise()
      .then((res: any) => {
        localStorage.setItem('token', res.data.token);
      });
  }

  logout() {
    return new Observable(observer => {
      observer.next(localStorage.removeItem('token'));
    });
  }
}
