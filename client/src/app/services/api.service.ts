import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  fetch(path: string, query?: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}${query}`);;
  }

  post(path: string, payload: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}${path}`, payload);;
  }
}
