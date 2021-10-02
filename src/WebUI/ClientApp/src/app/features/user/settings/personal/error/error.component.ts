import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { PluralForm } from 'src/app/core/utils/plural-form';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  static symbolPluralForms = ['символ', 'символа', 'символов'];
  errorMsgList: any = [];
  @Input() controlName!: AbstractControl | AbstractControlDirective;

  errorMessage: Record<string, any> = {
    required: (params?: any) => `Заполните поле`,
    maxlength: (params?: any) =>
      `Максимальная длина имени пользователя: ${
        params.requiredLength
      } ${PluralForm.getPluralForm(
        params.requiredLength,
        ErrorComponent.symbolPluralForms
      )}`,
    minlength: (params?: any) =>
      `Минимальная длина имени пользователя: ${
        params.requiredLength
      } ${PluralForm.getPluralForm(
        params.requiredLength,
        ErrorComponent.symbolPluralForms
      )}`,
    pattern: (params?: any) =>
      `В имени пользователя могут быть только латинские буквы, цифры, символы подчеркивание, точка и тире`,
    unavailable: (params?: any) => `Данное имя пользователя уже занято`,
  };

  listErrors() {
    if (!this.controlName) return [];
    if (this.controlName.errors) {
      this.errorMsgList = [];
      Object.keys(this.controlName.errors).map((error) => {
        this.controlName.touched || this.controlName.dirty
          ? this.errorMsgList.push(
              this.errorMessage[error](this.controlName.errors![error])
            )
          : '';
      });
      return this.errorMsgList;
    } else {
      return [];
    }
  }
}
