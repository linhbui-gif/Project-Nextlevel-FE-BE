import { Field } from "react-final-form";
import { ValidationMessage } from "../../utils/validation.utils";
import { TUserValidation } from "../../types";

type SubmitErrorProps = {
  name: string;
  validation: TUserValidation;
};
export const SubmitError = ({
  name,
  validation,
}: SubmitErrorProps): JSX.Element => (
  <Field
    name={name}
    subscription={{ submitError: true, dirtySinceLastSubmit: true }}
    render={(): JSX.Element => {
      return validation ? (
        <div>
          {validation.map(
            (message: string) =>
              message &&
              message.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
              ValidationMessage(message, message.split(" ").join(""))
          )}
        </div>
      ) : null;
    }}
  />
);
export default SubmitError;
