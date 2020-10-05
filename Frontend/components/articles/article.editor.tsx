import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import DraftForm from "../forms/draft.form";
import PublishComponent from "./publish.component";
import {
  requestLogoutAction,
  saveDraftAction,
  publishDraftAction,
  deleteDraftAction,
  deleteArticleAction,
  receivedDraftValidationAction,
} from "../../store/actions";
import {
  TUser,
  TCreateDraft,
  TUploadedFile,
  TDraftValidation,
} from "../../types";

type TProps = {
  user?: TUser;
  draft?: TCreateDraft;
  loading: boolean;
  validation?: TDraftValidation;
  requestLogout: () => void;
  saveDraft: (payload: TCreateDraft) => void;
  publishDraft: (payload: TCreateDraft) => void;
  deleteDraft: (payload: string) => void;
  deleteArticle: (payload: string) => void;
  receivedDraft: (payload: undefined) => void;
  setDraftValidation: (payload: TDraftValidation) => void;
  setValues: () => void;
  setUploadedFile: () => void;
  requestUploadCoverImages: () => void;
};

const ArticleEditor = ({
  user,
  loading,
  validation,
  saveDraft,
  publishDraft,
  deleteDraft,
  deleteArticle,
  setValues,
  setUploadedFile,
  uploadedFile,
  values,
  requestUploadCoverImages,
}: TProps): JSX.Element => {
  return (
    <Row>
      <Col md={8} xs={12}>
        <DraftForm
          loading={loading}
          onChange={setValues}
          user={user}
          validation={validation}
        />
      </Col>
      <Col md={4} xs={12}>
        <PublishComponent
          loading={loading}
          draft={{
            ...values,
            author: user && user.id,
          }}
          publish={publishDraft}
          saveDraft={saveDraft}
          deleteDraft={deleteDraft}
          deleteArticle={deleteArticle}
          resetUploadCoverImages={() => setUploadedFile(null)}
          uploadedFile={uploadedFile}
          validation={validation}
          requestUploadCoverImages={requestUploadCoverImages}
        />
      </Col>
    </Row>
  );
};
const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  draft: state.drafts.draft,
  loading: state.drafts.loading,
  validation: state.drafts.validation,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
  saveDraft: saveDraftAction,
  publishDraft: publishDraftAction,
  deleteDraft: deleteDraftAction,
  deleteArticle: deleteArticleAction,
  setDraftValidation: receivedDraftValidationAction,
})(ArticleEditor);
