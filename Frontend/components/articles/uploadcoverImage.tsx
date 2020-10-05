import { ListGroup } from "react-bootstrap";
import { FileUpload } from "../common/FileUpload";
import { TUploadedFile } from "../../types";

type TProps = {
  resetUploadCoverImages: (payload: string) => void;
  validation?: string[];
  requestUploadCoverImages: (payload: string) => void;
  uploadedFile?: TUploadedFile;
};

const UploadCoverImage = ({
  resetUploadCoverImages,
  uploadedFile,
  requestUploadCoverImages,
}: TProps): JSX.Element => {
  return (
    <ListGroup className="pointer border mt-5 p-3">
      <h3> Cover Image </h3>
      <FileUpload
        onSelect={requestUploadCoverImages}
        onDeselect={resetUploadCoverImages}
        file={uploadedFile}
        dropzoneText="Drop cover images"
      />
    </ListGroup>
  );
};
export default UploadCoverImage;
