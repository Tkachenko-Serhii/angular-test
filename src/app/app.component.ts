import { Component, OnInit } from '@angular/core';
import { ICurrency } from './models/currency';
import { CurrenciesService } from './services/currencies.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency app';
  loading = false;

  constructor(
    private currenciesService: CurrenciesService
  ){}
  currencies$: Observable<ICurrency[]>;
  ngOnInit(): void {
    this.loading = true;
    this.currencies$ = this.currenciesService.getAll().pipe(
        tap(()=>this.loading=false)
    )
  }
}
