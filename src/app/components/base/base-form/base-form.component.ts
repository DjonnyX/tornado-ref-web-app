import { FormGroup } from '@angular/forms';

/** Компонент - контейнер для валидируемых форм */
export abstract class BaseForm {
  public hasErrorMessage(fieldName: string, errorName: string, form: FormGroup) {
    let field = !!fieldName ? form.get('' + fieldName) : form;
    return !!field ? field.hasError(errorName) && (field.dirty || field.touched) : false;
  }
}