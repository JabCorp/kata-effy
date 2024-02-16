import { emailValidator } from './validator.utils';
import {FormControl} from "@angular/forms";

describe('Test for validator utils', () => {

  describe('emailValidator', () => {

    test('should return null for a valid email', () => {
      const control = new FormControl<string>('test@example.com' );
      const result = emailValidator()(control);
      expect(result).toBeNull();
    });

    test('should return null for an empty email', () => {
      const control = new FormControl<string>('');
      const result = emailValidator()(control);
      expect(result).toBeNull();
    });

    test('should return null for a control with null value', () => {
      const control = new FormControl<string| null>( null );
      const result = emailValidator()(control);
      expect(result).toBeNull();
    });

    test('should return an error object for an invalid email', () => {
      const control = new FormControl<string>( 'invalid_email' );
      const result = emailValidator()(control);
      expect(result).toEqual({ email: true });
    });
  });
});
