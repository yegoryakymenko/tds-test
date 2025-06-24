import { apiParamsEnum } from '../enums/api-params.enum';

export interface CurrenciesConvert {
  [apiParamsEnum.AMOUNT]: string;
  [apiParamsEnum.FROM]: string;
  [apiParamsEnum.TO]: string;
}

export interface CurrencyConvertResult {
    value: number;
    to: string;
}
