import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Layout from "../../../components/layout/admin.layout";
import AuthGuard from "../../../components/common/AuthGuard";
import { AppState } from "../../../store/reducers";
import {
  TUser,
  TCreateDraft,
  TUploadedFile,
  TDraftValidation,
} from "../../../types";
import {
  requestLogoutAction,
  saveDraftAction,
  publishDraftAction,
  deleteDraftAction,
  deleteArticleAction,
  receivedDraftValidationAction,
} from "../../../store/actions";
import DraftForm from "../../../components/forms/draft.form";
import PublishComponent from "../../../components/articles/publish.component";
import { readFile } from "../../../utils/upload.utils";
import { uploadArticle } from "../../../api";
import ArticleEditor from "../../../components/articles/article.editor";

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
};
const Draft = ({
  user,
  draft,
  loading,
  validation,
  requestLogout,
  saveDraft,
  publishDraft,
  deleteDraft,
  deleteArticle,
  setDraftValidation,
}: TProps): JSX.Element => {
  const [values, setValues]: [
    TCreateDraft,
    (values: TCreateDraft) => void
  ] = useState(draft);
  const [uploadedFile, setUploadedFile]: [
    TUploadedFile,
    (uploadedFile: TUploadedFile) => void
  ] = useState();
  const setCoverImage = (url) => setValues({ ...values, coverImage: url });
  const requestUploadCoverImages = async (file) => {
    try {
      setDraftValidation(null);
      const [arrayBuffer, type] = await readFile(file);
      if (type !== "image/png") {
        return setDraftValidation(["Upload your cover images in PNG format"]);
      }
      const formData = new FormData();
      formData.append("file", new Blob([arrayBuffer], { type }));
      const response = await uploadArticle(formData);
      setCoverImage(response.data.url);
      setUploadedFile(response.data);
    } catch (e) {
      setDraftValidation(["Failed to upload cover Images"]);
    }
  };
  return (
    <AuthGuard user={user} requestLogout={requestLogout} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        <ArticleEditor
          setValues={setValues}
          values={values}
          setUploadedFile={setUploadedFile}
          uploadedFile={uploadedFile}
          requestUploadCoverImages={requestUploadCoverImages}
        />
      </Layout>
    </AuthGuard>
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
})(Draft);
