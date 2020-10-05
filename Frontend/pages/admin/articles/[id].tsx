import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/admin.layout";
import AuthGuard from "../../../components/common/AuthGuard";
import { AppState } from "../../../store/reducers";
import { TUser, TCreateDraft, TArticleDetail } from "../../../types";
import {
  requestLogoutAction,
  saveDraftAction,
  publishDraftAction,
  deleteDraftAction,
  deleteArticleAction,
  requestArticleAction,
} from "../../../store/actions";
import DraftForm from "../../../components/forms/draft.form";
import PublishComponent from "../../../components/articles/publish.component";

type TProps = {
  user?: TUser;
  article?: TArticleDetail;
  loading: boolean;
  validation?: string[];
  requestLogout: () => void;
  saveDraft: (payload: TCreateDraft) => void;
  publishDraft: (payload: TCreateDraft) => void;
  deleteDraft: (payload: string) => void;
  deleteArticle: (payload: string) => void;
  requestArticle: (id: any) => void;
};
const Article = ({
  user,
  article,
  loading,
  validation,
  requestLogout,
  saveDraft,
  publishDraft,
  deleteDraft,
  deleteArticle,
  requestArticle,
}: TProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    requestArticle(router.query.id);
  }, [router.query.id, requestArticle]);
  let newDraft;
  if (article) {
    newDraft = {
      title: article.title,
      slug: article.slug,
      body: article.body,
      author: article.author,
      article: article.id,
    };
  }
  const [values, setValues]: [
    TCreateDraft,
    (values: TCreateDraft) => void
  ] = useState(newDraft);
  return (
    <AuthGuard user={user} requestLogout={requestLogout} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        <Row>
          <Col md={8} xs={12}>
            <DraftForm
              loading={loading}
              onChange={setValues}
              user={user}
              draft={newDraft}
              validation={validation}
            />
          </Col>
          <Col md={4} xs={12}>
            <PublishComponent
              loading={loading}
              draft={{
                ...newDraft,
                values,
                author: user.id,
              }}
              publish={publishDraft}
              saveDraft={saveDraft}
              deleteDraft={deleteDraft}
              deleteArticle={deleteArticle}
            />
          </Col>
        </Row>
      </Layout>
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  loading: state.drafts.loading,
  article: state.drafts.article,
  validation: state.drafts.validation,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
  saveDraft: saveDraftAction,
  publishDraft: publishDraftAction,
  deleteDraft: deleteDraftAction,
  deleteArticle: deleteArticleAction,
  requestArticle: requestArticleAction,
})(Article);
