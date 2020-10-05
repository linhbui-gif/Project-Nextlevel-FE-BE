import { Form, Field } from "react-final-form";
import {
  Required,
  composeValidators,
  PasswordValid,
  EmailValid,
} from "../../utils/validation.utils";
import { TUser, TCreateUser, TUploadedFile } from "../../types";
import { InputField, SubmitError, SubmitButton } from "../common";
import { FileUpload } from "../common/FileUpload";

type TProps = {
  user?: TUser;
  requestSignUp: (payload: TCreateUser) => void;
  requestUploadCV: (payload: string) => void;
  loading: boolean;
  validation?: string[];
  uploadedFile?: TUploadedFile;
  resetUploadedCV: () => void;
};

const SignUpForm = ({
  user,
  validation,
  requestSignUp,
  requestUploadCV,
  resetUploadedCV,
  loading,
  uploadedFile,
}: TProps): JSX.Element => {
  return (
    <div>
      <Form
        onSubmit={requestSignUp}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>First name: </label>
              <Field
                validate={composeValidators(Required)}
                placeholder="First name"
                name="firstName"
                component={InputField}
              />
              <SubmitError name="firstName" validation={validation} />
            </div>
            <div className="form-group">
              <label>Last name:</label>
              <Field<string>
                validate={composeValidators(Required)}
                placeholder="Last name"
                name="lastName"
                component={InputField}
              />
              <SubmitError name="lastName" validation={validation} />
            </div>
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
            <div className="form-group">
              <label>Upload CV:</label>
              <Field
                name="cv"
                value={user && user.cv}
                initialValue={user && user.cv}
              >
                {(props) => (
                  <FileUpload
                    onSelect={requestUploadCV}
                    onDeselect={resetUploadedCV}
                    file={uploadedFile}
                    dropzoneText="Drop your CV here!"
                    {...props}
                  />
                )}
              </Field>
              <SubmitError name="cv" validation={validation} />
            </div>
            <SubmitButton caption="Sign Up" loading={loading} />
          </form>
        )}
      />
    </div>
  );
};

export default SignUpForm;
