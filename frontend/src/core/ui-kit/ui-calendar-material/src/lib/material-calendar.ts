import { Component, ViewEncapsulation, forwardRef, model } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HlmInputDirective } from '@core/ui-kit/ui-input-helm/src';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'material-calendar',
  templateUrl: './material-calendar.html',
  styleUrl: './material-calendar.component.scss',
  imports: [MatNativeDateModule, MatDatepickerModule, HlmInputDirective],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialCalendarComponent),
      multi: true,
    },
  ],
})
export class MaterialCalendarComponent implements ControlValueAccessor {
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Gets the value
  get value(): any {
    return this.innerValue;
  }

  // Sets the value and notifies the change
  set value(val: any) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state here if needed
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  onBlur(): void {
    this.onTouched();
  }
}
