/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
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
  url?: string;
};
// eslint-disable-next-line react/display-name
export const InputUrlField = React.memo((props: TProps) => {
  const { input, meta, name, handleOnChange, placeholder, ...rest } = props;
  const onChange = (value: string) => {
    input.onChange(value);
    if (handleOnChange) handleOnChange(value);
  };
  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
          {props.url && (
            <InputGroup.Text id="basic-addon1">{props.url}</InputGroup.Text>
          )}
        </InputGroup.Prepend>
        <Form.Control
          {...input}
          {...rest}
          value={input.value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </InputGroup>
      {meta.error && meta.touched && ValidationMessage(meta.error)}
    </>
  );
});
export default InputUrlField;
