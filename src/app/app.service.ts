import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = 'https://newsapi.org/v2/top-headlines'; // Example base URL

  constructor(private http: HttpClient) {}

  getTopHeadlines(
    country: any,
    dateTime: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('country', country)
      .set('from', dateTime) // Assuming your API supports a 'from' parameter for date/time filtering
      .set('apiKey', '7d81283e788b4211a61f8b8a25597554') // Replace with your actual API key
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get(this.baseUrl, { params });
  }
}
