import { Form, Field } from "react-final-form";
import { TUser, TCreateProject, TProject } from "../../types";
import { InputField, SubmitError, SubmitButton } from "../common";
import { Required, composeValidators } from "../../utils/validation.utils";

type TProps = {
  user?: TUser;
  project?: TProject;
  requestActionProject: (payload: TCreateProject) => void;
  loading: boolean;
  validation?: string[];
};

const ProjectForm = ({
  project,
  requestActionProject,
  loading,
  validation,
}: TProps): JSX.Element => {
  return (
    <div>
      <Form
        onSubmit={requestActionProject}
        initialValues={project}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <Field<string>
                validate={composeValidators(Required)}
                placeholder="Project Name"
                name="name"
                type="text"
                component={InputField}
              />
              <SubmitError name="name" validation={validation} />
            </div>
            <div className="form-group">
              <Field<string>
                validate={composeValidators(Required)}
                placeholder="Project Description"
                name="description"
                type="text"
                component={InputField}
                componentClass="textarea"
              />
              <SubmitError name="description" validation={validation} />
            </div>
            <SubmitButton caption="Save" loading={loading} />
          </form>
        )}
      />
    </div>
  );
};

export default ProjectForm;
