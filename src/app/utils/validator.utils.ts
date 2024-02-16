import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

const EMAIL_PATTERN: RegExp = new RegExp(/^[\w\-.]+@[\w\-]+[.][a-zA-Z]{2,}$/g)

function isEmptyInputValue(value: any): boolean {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  return value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return EMAIL_PATTERN.test(control.value) ? null : {email: true};
  }
}
