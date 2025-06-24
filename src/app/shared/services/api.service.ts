import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiRoutesEnum } from '../enums/api-routes.enum';
import { CurrenciesType } from '../types/currencies.type';
import { CurrenciesConvert, CurrencyConvertResult } from '../interfaces/currencies-convert.interface';
import { Currency } from '../interfaces/currency.interface';
import { payloadToHttpParamsHelper } from '../utils/payload-to-http-params.helper';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  convertCurrencies(payload: CurrenciesConvert): Observable<CurrencyConvertResult> {
    return this.http.get<CurrencyConvertResult>(environment.API_BASE + apiRoutesEnum.CONVERT + payloadToHttpParamsHelper(payload));
  }

  getCurrenciesList(type : CurrenciesType = 'fiat'): Observable<Currency[]> {
    return this.http.get<Currency[]>(environment.API_BASE + apiRoutesEnum.CURRENCIES + `?type=${type}`);
  }
}
