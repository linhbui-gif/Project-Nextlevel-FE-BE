import Dropzone from "react-dropzone";
import { useState } from "react";
import { FaFilePdf, FaTrashAlt, FaFileImage } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { TUploadedFile } from "../../types";

const DROPZONE_TEXT_DEFAULT = "Drop some files here, or click to select files";

type TProps = {
  onSelect: (file: any) => void;
  onDeselect: () => void;
  dropzoneText?: string;
  multiple?: boolean;
  file?: TUploadedFile;
};

export const FileUpload = ({
  onSelect,
  onDeselect,
  dropzoneText = DROPZONE_TEXT_DEFAULT,
  multiple = false,
  file,
}: TProps): JSX.Element => {
  const [dragEntered, setDragEntered] = useState(false);
  const dropzoneClass = `card p-3${
    dragEntered ? " text-white bg-primary" : ""
  }`;
  const onDragEnter = () => setDragEntered(true);
  const onDragLeave = () => setDragEntered(false);
  const onDrop = (acceptedFiles) => {
    setDragEntered(false);
    if (multiple) {
      onSelect(acceptedFiles);
    } else {
      onSelect(acceptedFiles[0]);
    }
  };
  const onRemove = () => {
    setDragEntered(false);
    onDeselect();
  };
  const fileName = file && file.url.split("/").pop();
  const isPDF = file && file.mimetype === "application/pdf";
  const isImage = file && file.mimetype.indexOf("image") > -1;
  return (
    <>
      {!file && (
        <Dropzone
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className={dropzoneClass}>
                <input {...getInputProps()} />
                <>{dropzoneText}</>
              </div>
            </section>
          )}
        </Dropzone>
      )}
      {file && (
        <Card body className="text-primary bg-white">
          {isPDF && <FaFilePdf size={32} />}
          {isImage && <FaFileImage size={32} />}
          <span className="mx-3">{fileName}</span>
          <FaTrashAlt
            className="float-right mt-2 pointer text-secondary"
            onClick={onRemove}
          />
        </Card>
      )}
    </>
  );
};
export default FileUpload;
