/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardColumns } from "react-bootstrap";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/admin.layout";
import { AppState } from "../../../store/reducers";
import AuthGuard from "../../../components/common/AuthGuard";
import { TUser, TProjectList } from "../../../types";
import {
  requestLogoutAction,
  requestProjectListAction,
  requestDeleteProjectAction,
} from "../../../store/actions";
import ProjectCard from "../../../components/cards/project.card";
import DialogModal from "../../../components/modal/dialog.modal";
import { Loader } from "../../../components/common";

type TProps = {
  projectList?: TProjectList;
  listLoading: boolean;
  user?: TUser;
  requestDeleteProject: (string) => void;
  requestProjects: () => void;
  requestLogout: () => void;
};

const showProjectList = (
  projectList: TProjectList,
  router,
  handleShow,
  handleSetID
): JSX.Element[] => {
  return (
    projectList &&
    projectList.map((project) => (
      <ProjectCard
        project={project}
        key={project.id}
        onClick={() => {
          router.push("/admin/projects/[id]", `/admin/projects/${project.id}`);
        }}
        deleteProject={(id) => {
          if (id) {
            handleShow();
            handleSetID(id);
          }
        }}
      />
    ))
  );
};

export const Projects = (props: TProps): JSX.Element => {
  const {
    user,
    projectList,
    requestProjects,
    requestDeleteProject,
    requestLogout,
    listLoading,
  } = props;
  const router = useRouter();
  const hasProjects = projectList && projectList.length > 0;
  const [confirmDeleteProject, setDeleteProjectConfirmation] = useState(null);
  const open = (id) => setDeleteProjectConfirmation(id);
  const close = () => setDeleteProjectConfirmation(null);

  useEffect(() => {
    requestProjects();
  }, [requestProjects]);

  return (
    <AuthGuard user={user} requestLogout={requestLogout} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        {!listLoading && hasProjects && (
          <CardColumns>
            {showProjectList(
              projectList,
              router,
              open,
              setDeleteProjectConfirmation
            )}
          </CardColumns>
        )}
        {listLoading && <Loader />}
        {!listLoading && !hasProjects && (
          <p className="lead">Currently there aren’t any projects.</p>
        )}
        <DialogModal
          title="Confirm your actions"
          body="Are you sure that you want to delete this project. This action is irreversible."
          onCancel={close}
          onSubmit={() => {
            requestDeleteProject(confirmDeleteProject);
            close();
          }}
          show={confirmDeleteProject}
        />
      </Layout>
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  projectList: state.projects.projectList,
  listLoading: state.projects.listLoading,
});
const mapDispatchToProps = {
  requestLogout: requestLogoutAction,
  requestProjects: requestProjectListAction,
  requestDeleteProject: requestDeleteProjectAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
