/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";
import moment from "moment";
import { TDraftDetail } from "../../types";
import CoverImage from "../common/CoverImage";

type TProps = {
  draft?: TDraftDetail;
  onClick: (e) => void;
};

const ItemDraft = ({ draft, onClick }: TProps): JSX.Element => (
  <Card onClick={onClick} className="pointer">
    <CoverImage
      variant="light"
      className="cover-image d-flex flex-column justify-content-between"
    >
      <FaTrashAlt className="ml-auto d-flex text-muted" />
      <Card.Title className="m-0 d-flex">
        <h4 className="m-0">{draft.title}</h4>
      </Card.Title>
    </CoverImage>
    <Card.Body>
      <Card.Text>
        By: {draft.author.firstName} {draft.author.lastName}
      </Card.Text>
      <Card.Text>
        Edited: {moment(draft.author.updatedDate).fromNow()}
      </Card.Text>
    </Card.Body>
  </Card>
);
export default ItemDraft;
