import { Form, Field } from "react-final-form";
import {
  Required,
  composeValidators,
  EmailValid,
} from "../../utils/validation.utils";
import { TForgot } from "../../types";
import { InputField, SubmitError, SubmitButton } from "../common";

type TProps = {
  requestForgot: (payload: TForgot) => void;
  loading: boolean;
  validation?: string[];
};

const ForgotForm = ({
  validation,
  requestForgot,
  loading,
}: TProps): JSX.Element => (
  <div>
    <Form
      onSubmit={requestForgot}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Email address:</label>
            <Field<string>
              validate={composeValidators(Required, EmailValid)}
              placeholder="Email"
              name="email"
              type="email"
              component={InputField}
            />
            <SubmitError name="email" validation={validation} />
          </div>

          <SubmitButton caption="Forgot password" loading={loading} />
        </form>
      )}
    />
  </div>
);

export default ForgotForm;
