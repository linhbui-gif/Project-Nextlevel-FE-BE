import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
  Required,
  composeValidators,
  NoSpaces,
} from "../../utils/validation.utils";
import {
  InputField,
  InputAreaField,
  InputUrlField,
  SubmitError,
} from "../common";
import { TUser, TCreateDraft } from "../../types";
import { noop } from "../../utils/common.utils";

type TProps = {
  user?: TUser;
  draft?: TCreateDraft;
  onChange: (payload: TCreateDraft) => void;
  loading: boolean;
  validation?: string[];
};

type FormProps = {
  handleSubmit: () => void;
  values: TCreateDraft;
  onChange?: (payload: TCreateDraft) => void;
  loading?: boolean;
  validation?: string[];
};

const DraftFormRender = ({
  handleSubmit,
  values,
  onChange,
  loading,
  validation,
}: FormProps): JSX.Element => {
  useEffect(() => {
    onChange(values);
  }, [onChange, values]);
  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <Field<string>
            validate={composeValidators(Required)}
            placeholder="Title..."
            name="title"
            type="text"
            component={InputField}
            disabled={loading}
          />
          <SubmitError name="title" validation={validation} />
        </div>
        <div className="form-group">
          <Field<string>
            validate={composeValidators(Required, NoSpaces)}
            placeholder="Slug..."
            name="slug"
            type="text"
            url={process.env.NEXT_PUBLIC_SLUG_URL}
            component={InputUrlField}
            disabled={loading}
          />
          <SubmitError name="slug" validation={validation} />
        </div>
        <div className="form-group">
          <Field<string>
            validate={composeValidators(Required)}
            name="body"
            component={InputAreaField}
            disabled={loading}
            initialValue={values && values.body}
          />
          <SubmitError name="body" validation={validation} />
        </div>
      </form>
    </>
  );
};

const DraftForm = ({
  onChange,
  draft,
  loading,
  validation,
}: TProps): JSX.Element => {
  return (
    <Form
      onSubmit={noop}
      initialValues={draft}
      render={({ handleSubmit, values }) => (
        <DraftFormRender
          handleSubmit={handleSubmit}
          values={values}
          onChange={onChange}
          loading={loading}
          validation={validation}
        />
      )}
    />
  );
};

export default DraftForm;
