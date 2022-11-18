import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,catchError, throwError } from 'rxjs';
import { ICurrency} from '../models/currency';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
  }
)

export class CurrenciesService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getAll(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(()=>error.message)
  }
}
