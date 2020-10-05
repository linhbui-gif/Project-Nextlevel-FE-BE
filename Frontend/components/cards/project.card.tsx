import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { TProject } from "../../types";
import CoverImage from "../common/CoverImage";

type TProps = {
  project?: TProject;
  onClick?: (e) => void;
  deleteProject?: (id: string) => void;
};

const ProjectCard = (props: TProps): JSX.Element => {
  const { project, deleteProject, onClick } = props;
  const onDelete = (e) => {
    e.stopPropagation();
    deleteProject(project.id);
  };
  return (
    <Card onClick={onClick} className="pointer">
      <CoverImage
        variant="dark"
        className="text-white cover-image d-flex flex-column justify-content-between"
      >
        <FaTrashAlt
          className="pointer ml-auto d-flex text-muted"
          onClick={onDelete}
        />
        <Card.Title className="m-0 d-flex">
          <h4 className="m-0">{project.name}</h4>
        </Card.Title>
      </CoverImage>
      <Card.Body>
        <Card.Text>{project.description}</Card.Text>
        <Card.Text>
          <small className="text-muted">
            {moment(project.updatedDate).fromNow()}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default ProjectCard;
