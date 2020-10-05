import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import { AppState } from "../../../store/reducers";
import {
  requestLogoutAction,
  requestProjectAction,
  requestEditProjectAction,
} from "../../../store/actions";
import { TEditProject, TProject, TUser } from "../../../types";
import AuthGuard from "../../../components/common/AuthGuard";
import Layout from "../../../components/layout/admin.layout";
import Notification from "../../../components/common/Notifications";
import ProjectForm from "../../../components/forms/project.form";

type TProps = {
  user?: TUser;
  project?: TProject;
  requestEditProject: (payload: TEditProject) => void;
  requestProject: (string) => void;
  requestLogout: () => void;
  loading: boolean;
  validation: string[];
  notifications: any[];
};
export const EditProject = (props: TProps): JSX.Element => {
  const {
    user,
    project,
    requestEditProject,
    requestProject,
    requestLogout,
    loading,
    validation,
    notifications,
  } = props;
  const router = useRouter();
  useEffect(() => {
    requestProject(router.query.id);
  }, [requestProject, router.query.id]);
  return (
    <AuthGuard user={user} requestLogout={requestLogout}>
      <Layout user={user} requestLogout={requestLogout}>
        <Row className="mt-5">
          <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
            <h3>Edit Project</h3>
          </Col>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <ProjectForm
              project={project}
              requestActionProject={requestEditProject}
              loading={loading}
              validation={validation}
            />
          </Col>
        </Row>
      </Layout>
      <Notification notifications={notifications} />
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  project: state.projects.project,
  loading: state.projects.loading,
  notifications: state.notifications,
});
const mapDispatchToProps = {
  requestLogout: requestLogoutAction,
  requestEditProject: requestEditProjectAction,
  requestProject: requestProjectAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
