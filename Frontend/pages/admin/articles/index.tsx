import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Accordion, Card, CardColumns } from "react-bootstrap";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/admin.layout";
import AuthGuard from "../../../components/common/AuthGuard";
import { AppState } from "../../../store/reducers";
import { TUser, TDraftList, TArticleList } from "../../../types";
import {
  requestLogoutAction,
  requestListDraftAction,
  requestListArticleAction,
} from "../../../store/actions";
import ItemArticle from "../../../components/articles/article.item";
import ItemDraft from "../../../components/articles/draft.item";
import { Loader } from "../../../components/common";

type TProps = {
  user?: TUser;
  draftList?: TDraftList;
  articleList: TArticleList;
  loading: boolean;
  requestLogout: () => void;
  requestDrafts: () => void;
  onClick: () => void;
  requestArticles: () => void;
};

const Articles = ({
  user,
  requestLogout,
  requestDrafts,
  requestArticles,
  draftList,
  articleList,
  loading,
}: TProps): JSX.Element => {
  useEffect(() => {
    requestDrafts();
    requestArticles();
  }, [requestDrafts, requestArticles]);

  const router = useRouter();
  const editDraft = (draft) =>
    router.replace(`/admin/articles/draft/${draft.id}`);
  const editArticle = (article) =>
    article.draft
      ? router.replace(
          "/admin/articles/draft/[id]",
          `/admin/articles/draft/${article.draft}`
        )
      : router.replace("/admin/articles/[id]", `/admin/articles/${article.id}`);
  const hasArticles = articleList && articleList.length > 0;
  const hasDrafts = draftList && draftList.length > 0;
  return (
    <AuthGuard user={user} requestLogout={requestLogout} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Unpublished Articles
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <CardColumns className="py-3 px-2">
                {loading && <Loader />}
                {!loading &&
                  hasDrafts &&
                  draftList.map((draft) => (
                    <ItemDraft
                      draft={draft}
                      key={draft.id}
                      onClick={() => editDraft(draft)}
                    />
                  ))}
                {!loading && !hasDrafts && (
                  <p className="mt-5">
                    No drafts. Create a new draft to get started.
                  </p>
                )}
              </CardColumns>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="0" className="mt-2">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Published Articles
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <CardColumns className="py-3 px-2">
                {loading && <Loader />}
                {!loading &&
                  hasArticles &&
                  articleList.map((article) => (
                    <ItemArticle
                      article={article}
                      key={article.id}
                      onClick={() => editArticle(article)}
                    />
                  ))}
                {!loading && !hasArticles && (
                  <p className="mt-5">
                    No articles. Publish a draft to create one.
                  </p>
                )}
              </CardColumns>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Layout>
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  loading: state.drafts.loading,
  draftList: state.drafts.draftList,
  articleList: state.drafts.articleList,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
  requestDrafts: requestListDraftAction,
  requestArticles: requestListArticleAction,
})(Articles);
