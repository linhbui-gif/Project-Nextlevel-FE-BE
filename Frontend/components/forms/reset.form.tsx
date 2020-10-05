import { Form, Field } from "react-final-form";
import {
  Required,
  composeValidators,
  PasswordValid,
} from "../../utils/validation.utils";
import { InputField, SubmitError, SubmitButton } from "../common";

type TProps = {
  requestReset: (payload: { password: string }) => void;
  loading: boolean;
  validation?: string[];
};

const ResetForm = ({
  validation,
  requestReset,
  loading,
}: TProps): JSX.Element => (
  <div>
    <Form
      onSubmit={requestReset}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Password:</label>
            <Field<string>
              validate={composeValidators(Required, PasswordValid)}
              placeholder="Password"
              name="password"
              type="password"
              component={InputField}
            />
            <SubmitError name="password" validation={validation} />
            <SubmitError name="code" validation={validation} />
          </div>

          <SubmitButton caption="Reset password" loading={loading} />
        </form>
      )}
    />
  </div>
);

export default ResetForm;
