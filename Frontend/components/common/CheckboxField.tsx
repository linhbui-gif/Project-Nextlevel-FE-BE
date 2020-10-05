/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Form } from "react-bootstrap";
import { ValidationMessage } from "../../utils/validation.utils";

type TProps = {
  input?: any;
  meta?: any;
  name?: string;
  placeholder?: string;
  handleOnChange?: (value: any) => void;
  onChange?: (value: any) => void;
  value?: any;
  error?: any;
  touched?: boolean;
};
// eslint-disable-next-line react/display-name
export const CheckboxField = React.memo((props: TProps) => {
  const { input, meta, name, handleOnChange, placeholder, ...rest } = props;
  const onChange = (value: string) => {
    input.onChange(value);
    if (handleOnChange) handleOnChange(value);
  };
  return (
    <>
      <Form.Check
        {...input}
        {...rest}
        value={input.value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {meta.error && meta.touched && ValidationMessage(meta.error)}
    </>
  );
});
export default CheckboxField;
