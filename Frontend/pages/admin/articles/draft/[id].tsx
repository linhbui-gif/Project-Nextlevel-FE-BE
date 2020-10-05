import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout/admin.layout";
import AuthGuard from "../../../../components/common/AuthGuard";
import { AppState } from "../../../../store/reducers";
import { TUser, TCreateDraft } from "../../../../types";
import {
  requestLogoutAction,
  saveDraftAction,
  publishDraftAction,
  deleteDraftAction,
  deleteArticleAction,
  requestDraftAction,
} from "../../../../store/actions";
import DraftForm from "../../../../components/forms/draft.form";
import PublishComponent from "../../../../components/articles/publish.component";

type TProps = {
  user?: TUser;
  draft?: TCreateDraft;
  loading: boolean;
  validation?: string[];
  requestLogout: () => void;
  saveDraft: (payload: TCreateDraft) => void;
  publishDraft: (payload: TCreateDraft) => void;
  deleteDraft: (payload: string) => void;
  deleteArticle: (payload: string) => void;
  requestDraft: (id: any) => void;
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
  requestDraft,
}: TProps): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    requestDraft(id);
  }, [id, requestDraft]);
  const [values, setValues]: [
    TCreateDraft,
    (values: TCreateDraft) => void
  ] = useState(draft);
  return (
    <AuthGuard user={user} requestLogout={requestLogout} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        <Row>
          <Col md={8} xs={12}>
            <DraftForm
              loading={loading}
              onChange={setValues}
              user={user}
              draft={draft}
              validation={validation}
            />
          </Col>
          <Col md={4} xs={12}>
            <PublishComponent
              loading={loading}
              draft={{
                ...draft,
                ...values,
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
  draft: state.drafts.draft,
  loading: state.drafts.loading,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
  saveDraft: saveDraftAction,
  publishDraft: publishDraftAction,
  deleteDraft: deleteDraftAction,
  deleteArticle: deleteArticleAction,
  requestDraft: requestDraftAction,
})(Draft);
