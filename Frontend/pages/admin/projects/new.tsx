import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/layout/admin.layout";
import { AppState } from "../../../store/reducers";
import AuthGuard from "../../../components/common/AuthGuard";
import { TUser, TProject } from "../../../types";
import ProjectForm from "../../../components/forms/project.form";
import Notification from "../../../components/common/Notifications";
import { TNotification } from "../../../store/reducers/notification.reducers";
import {
  requestCreateProjectAction,
  requestLogoutAction,
} from "../../../store/actions";

type TProps = {
  user?: TUser;
  project?: TProject;
  notifications?: Array<TNotification>;
  requestCreateProject: (payload: TProject) => void;
  loading: boolean;
  validation: string[];
};
const CreateProject = ({
  user,
  project,
  notifications,
  requestCreateProject,
  loading,
  validation,
}: TProps): JSX.Element => {
  return (
    <AuthGuard user={user} requestLogout={requestLogoutAction} verbose>
      <Layout user={user} requestLogout={requestLogoutAction}>
        <Row className="mt-5">
          <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
            <h3>Create New Project</h3>
          </Col>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <ProjectForm
              project={project}
              requestActionProject={requestCreateProject}
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
  notifications: state.notifications,
  loading: state.projects.loading,
});

export default connect(mapStateToProps, {
  requestCreateProject: requestCreateProjectAction,
})(CreateProject);
