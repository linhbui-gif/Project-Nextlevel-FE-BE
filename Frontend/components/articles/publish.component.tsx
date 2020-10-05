import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import DialogModal from "../modal/dialog.modal";
import { TCreateDraft, TUploadedFile } from "../../types";
import UploadCoverImage from "./uploadcoverImage";

type TProps = {
  loading: boolean;
  publish: (payload: TCreateDraft) => void;
  saveDraft: (payload: TCreateDraft) => void;
  deleteDraft: (payload: string) => void;
  deleteArticle: (payload: string) => void;
  resetUploadCoverImages: (payload: string) => void;
  draft: TCreateDraft;
  uploadedFile?: TUploadedFile;
  validation?: string[];
  requestUploadCoverImages: (payload: string) => void;
};

const PublishComponent = ({
  loading,
  publish,
  saveDraft,
  deleteDraft,
  deleteArticle,
  draft,
  resetUploadCoverImages,
  uploadedFile,
  validation,
  requestUploadCoverImages,
}: TProps): JSX.Element => {
  const [confirmDeleteDraft, setDeleteDraftConfirmation] = useState(false);
  const [confirmDeleteArticle, setDeleteArticleConfirmation] = useState(false);
  return (
    <>
      <ListGroup className="pointer">
        <ListGroup.Item
          className="text-primary"
          disabled={loading}
          onClick={() => publish(draft)}
        >
          Publish Article
        </ListGroup.Item>
        <ListGroup.Item
          className="text-secondary text-bold"
          disabled={loading}
          onClick={() => saveDraft(draft)}
        >
          Save Draft
        </ListGroup.Item>
        <ListGroup.Item
          className="text-dark"
          disabled={loading || !draft.id}
          onClick={() => setDeleteDraftConfirmation(true)}
        >
          Delete Draft
        </ListGroup.Item>
        <ListGroup.Item
          className="text-danger"
          disabled={loading || !draft.article}
          onClick={() => setDeleteArticleConfirmation(true)}
        >
          Delete Article
        </ListGroup.Item>
      </ListGroup>
      <DialogModal
        title="Confirm your actions"
        body="Are you sure that you want to delete this draft. This action is irreversible."
        onCancel={() => setDeleteDraftConfirmation(false)}
        onSubmit={() => {
          deleteDraft(draft.id);
          setDeleteDraftConfirmation(false);
        }}
        show={confirmDeleteDraft}
      />
      <DialogModal
        title="Confirm your actions"
        body="Are you sure that you want to delete this article and any related drafts. This action is irreversible."
        onCancel={() => setDeleteArticleConfirmation(false)}
        onSubmit={() => {
          deleteArticle(draft.article);
          setDeleteArticleConfirmation(false);
        }}
        show={confirmDeleteArticle}
      />
      <UploadCoverImage
        resetUploadCoverImages={resetUploadCoverImages}
        uploadedFile={uploadedFile}
        validation={validation}
        requestUploadCoverImages={requestUploadCoverImages}
      />
    </>
  );
};

export default PublishComponent;
