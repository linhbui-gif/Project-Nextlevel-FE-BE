import { Form, Field } from "react-final-form";
import Link from "next/link";
import {
  Required,
  composeValidators,
  PasswordValid,
  EmailValid,
} from "../../utils/validation.utils";
import { TUser, TUserCredetials } from "../../types";
import {
  InputField,
  SubmitError,
  CheckboxField,
  SubmitButton,
} from "../common";

type TProps = {
  user?: TUser;
  requestLogin: (payload: TUserCredetials) => void;
  loading: boolean;
  validation?: string[];
};

const LoginForm = ({
  validation,
  requestLogin,
  loading,
}: TProps): JSX.Element => (
  <div>
    <Form
      onSubmit={requestLogin}
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
          </div>

          <SubmitButton caption="Login" loading={loading} />
          <div className="form-group">
            <Field<string>
              name="remember"
              type="checkbox"
              component={CheckboxField}
              label="Remember me"
            />
          </div>
          <Link href="/user/forgot" passHref>
            <a>Forgot password</a>
          </Link>
        </form>
      )}
    />
  </div>
);

export default LoginForm;
