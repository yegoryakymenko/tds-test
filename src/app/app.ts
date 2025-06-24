import { Component, inject, signal } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CurrenciesConvert, CurrencyConvertResult } from './shared/interfaces/currencies-convert.interface';
import { CurrencyPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly apiService =  inject(ApiService);
  private readonly fb =  inject(FormBuilder);

  private readonly submitTrigger = signal(0);

  readonly currencies = toSignal(this.apiService.getCurrenciesList().pipe(
    map(data => Object.values(data))
  ), {
    initialValue: []
  });
  readonly resource = rxResource<CurrencyConvertResult, void>({
    params: () => this.submitTrigger() || undefined,
    stream: () => this.apiService.convertCurrencies(this.formGroup.getRawValue() as unknown as CurrenciesConvert),
    defaultValue: undefined
  });

  protected readonly formGroup = this.fb.group({
    // Custom validators also could be used here, but API is working correct with same currency
    to: [null, [Validators.required]],
    from: [null, [Validators.required]],
    amount: [null, [Validators.required]],
  })

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitTrigger.update(state => state + 1);
  }

}
