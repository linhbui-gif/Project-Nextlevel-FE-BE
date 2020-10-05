export const ValidationMessage = (
  message: string,
  key?: string
): JSX.Element => (
  <span key={key} className="form-text text-left w-100 text-danger">
    {message}
  </span>
);

export const Required = (value: string): JSX.Element => {
  if (!value) {
    return ValidationMessage("This field cannot be empty.");
  }
  return null;
};

export const PasswordValid = (value: string): JSX.Element => {
  if (
    value.length <= 6 ||
    value.length >= 30 ||
    !/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
  ) {
    return ValidationMessage(
      "Password must be between 6 and 30 characters, containing at least one number and one special character."
    );
  }
  return null;
};

export const EmailValid = (value: string): JSX.Element => {
  if (value.indexOf("@") === -1 && value.indexOf(".") === -1) {
    return ValidationMessage("Please enter a valid email address.");
  }
  return null;
};

export const NoSpaces = (value: string): JSX.Element => {
  if (value.indexOf(" ") > -1) {
    return ValidationMessage("No spaces allowed.");
  }
  return null;
};

export const composeValidators = (
  ...validators: Array<(value: string) => JSX.Element | JSX.Element[]>
) => (value: string): unknown =>
  validators.reduce((error, validator) => error || validator(value), undefined);
