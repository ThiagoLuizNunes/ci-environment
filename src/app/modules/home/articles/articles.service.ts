import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import ICallback from '../../../shared/types/icallback.types';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private api = environment.ci_auth_service;

  emitterIsAuthenticated = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient) { }

  getLatestArticles(): Observable<any> {
    return this.http.get<any>(`${this.api}/articles/latest`)
      .pipe(
        retry(1), // retry a failed request up to 1 times
        catchError(err => of(`An error occurred:: ${err}`))
      );
  }

  getTopRatedArticles(): Observable<any> {
    return this.http.get<any>(`${this.api}/articles/top-rated`)
      .pipe(
        retry(1),
        catchError(err => of(`An error occurred:: ${err}`))
      );
  }

  getArticleById(_id: String): Observable<any> {
    return this.http.get<any>(`${this.api}/article/${_id}`)
      .pipe(
        retry(1),
        catchError(err => of(`An error occurred:: ${err}`))
      );
  }
}
