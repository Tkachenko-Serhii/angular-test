import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  amount: any;
  convertedAmount: number;
  index: number;
  showConfirm: boolean;
  showMenuFrom: boolean;
  showMenuTo: boolean;
  fromDropdownName: string;
  fromRate: number;
  toDropdownName: string;
  toRate: number;
  conversions = [
    {
      id: 1,
      name: 'UAH',
    },
    {
      id: 2,
      name: 'USD',
    },
    {
      id: 3,
      name: 'EUR',
    },
  ];

  constructor(private CurrenciesService: CurrenciesService) {}

  ngOnInit() {
    this.showConfirm = true;
    this.index = 1;
    this.fromDropdownName = 'UAH';
    this.toDropdownName = 'USD';
    this.showMenuFrom = false;
    this.showMenuTo = false;
  }

  conversionFromChange(id: number, conversionName: string) {
    this.resetConversion();
    this.fromDropdownName = conversionName;
    this.showCurrencyMenuFrom();
  }

  showCurrencyMenuFrom() {
    this.showMenuFrom = !this.showMenuFrom;
  }

  conversionToChange(id: number, conversionName: string) {
    this.resetConversion();
    this.toDropdownName = conversionName;
    this.showCurrencyMenuTo();
  }

  showCurrencyMenuTo() {
    this.showMenuTo = !this.showMenuTo;
  }

  convertCurrency() {
    this.CurrenciesService.getAll().subscribe(response => {
      response.map(item => {
        if (this.fromDropdownName === 'UAH') {
          this.fromRate = 1;
        } else if (item.cc === this.fromDropdownName) {
          this.fromRate = item.rate;
        }
      });
      response.map(item => {
        if (this.toDropdownName === 'UAH') {
          this.toRate = 1;
        } else if (item.cc === this.toDropdownName) {
          this.toRate = item.rate;
        }
      });
      this.convertedCurrency(this.fromRate, this.toRate);
    });
  }

  convertedCurrency(from: number, to: number) {
    const diff = from - to;
    if (from == 1) {
      this.convertedAmount = this.amount * to;
    } else if (to == 1) {
      this.convertedAmount = this.amount * from;
    } else if (diff < 0) {
      this.convertedAmount = this.amount * (diff * -1);
    } else if (diff == 0) {
      this.convertedAmount = this.amount;
    } else this.convertedAmount = this.amount * diff;
    this.showConfirm = false;
  }

  resetConversion() {
    this.showConfirm = true;
    this.amount = '';
  }
}
