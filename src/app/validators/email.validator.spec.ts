import { EmailValidator } from './email.validator';
import { FormControl } from '@angular/forms';
import {createDirectiveFactory, SpectatorDirective} from "@ngneat/spectator";

describe('Test of email validator directive', () => {
  let directive: EmailValidator;
  let spectator: SpectatorDirective<EmailValidator>;
  const createDirective = createDirectiveFactory({
    directive: EmailValidator,
    template: `<input type="text" appEmail>`,
  });


  beforeEach(() => {
    spectator = createDirective();
  });

  it('should create an instance', () => {
    directive = spectator.directive;
    expect(directive).toBeTruthy();
  });

  it('should return null for a valid email', () => {
    const control = new FormControl('test@example.com');
    expect(directive.validate(control)).toBeNull();
  });

  it('should return an error object for an invalid email', () => {
    const control = new FormControl('invalid_email');
    expect(directive.validate(control)).toEqual({ 'email': true });
  });
});
