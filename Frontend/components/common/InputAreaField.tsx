/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import dynamic from "next/dynamic";
import { CKUploadAdapter } from "../../utils/upload.utils";
import { ValidationMessage } from "../../utils/validation.utils";

// TODO: Provide better solution
// https://stackoverflow.com/questions/58447134/ckeditor-window-is-not-defined-reactjs-while-implementing/58576912#58576912
let CKEditor;
let ClassicEditor;
if (typeof window !== "undefined") {
  CKEditor = require("@ckeditor/ckeditor5-react");
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
} else {
  CKEditor = () => null;
}

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
export const InputAreaField = React.memo(
  ({ input, meta, name, handleOnChange }: TProps) => {
    const onChange = (event, editor) => {
      const value = editor.getData();
      input.onChange(value);
      if (handleOnChange) handleOnChange(value);
    };
    const uploadUrl = process.env.NEXT_PUBLIC_EDITOR_UPLOAD_URL;
    return (
      <>
        <CKEditor
          name={name}
          onInit={(editor) => {
            // eslint-disable-next-line no-param-reassign
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => new CKUploadAdapter(loader);
          }}
          onChange={onChange}
          data={input.value}
          editor={ClassicEditor}
          config={{
            ckfinder: {
              uploadUrl,
            },
          }}
        />
        {meta.error && meta.touched && ValidationMessage(meta.error)}
      </>
    );
  }
);
export default dynamic(() => Promise.resolve(InputAreaField), {
  ssr: false,
});
