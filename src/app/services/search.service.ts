import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SearchService {

  private reqPath = "repos/giorgiebanoidze25/personal/commits";
  private currentPage: number = 1;

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private newSearchSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  newSearch$: Observable<boolean> = this.newSearchSubject.asObservable();

  private totalCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalCount$: Observable<number> = this.totalCountSubject.asObservable();

  private commitsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  commits$: Observable<any[]> = this.commitsSubject.asObservable();

  private overlayTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('No List');
  overlayText$: Observable<string> = this.overlayTextSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  getCommits(page?: number) {
    this.loadingSubject.next(true);
    this.currentPage = page ? page : 1;

    this.http
      .get(encodeURI(`${environment.apiBaseUrl}${this.reqPath}?page=${this.currentPage}&per_page=9`))
      .pipe(
        catchError(error => {
          this.commitsSubject.next([])
          this.overlayTextSubject.next((error instanceof HttpErrorResponse) ? error.error.message : error.message)
          return of({});
        })
      )
      .subscribe(
          (data) => {
          if (data) {
            let arr = Object.values(data);
            this.commitsSubject.next(arr);
            this.totalCountSubject.next(arr.length);
            this.newSearchSubject.next(!page);
            this.overlayTextSubject.next(arr.length ? '' : 'No List Found');
          }
          this.loadingSubject.next(false)
        })
  }
  

  moveToPage(page: number) {
    this.getCommits(page);
  }
}
