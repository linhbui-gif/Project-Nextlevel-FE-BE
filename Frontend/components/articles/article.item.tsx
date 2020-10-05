/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";
import moment from "moment";
import CoverImage from "../common/CoverImage";
import { TArticleDetail } from "../../types";

type TProps = {
  article: TArticleDetail;
  onClick: () => void;
};
const ItemArticle = ({ article, onClick }: TProps): JSX.Element => {
  return (
    <Card onClick={onClick} className="mt-2 pointer">
      <CoverImage
        variant="light"
        className="cover-image d-flex flex-column justify-content-between"
      >
        <FaTrashAlt className="ml-auto d-flex text-muted" />
        <Card.Title className="m-0 d-flex">
          <h4 className="m-0">{article.title}</h4>
        </Card.Title>
      </CoverImage>
      <Card.Body>
        <Card.Text>
          By: {article.author.firstName} {article.author.lastName}
        </Card.Text>
        <Card.Text className="small">
          Edited: {moment(article.updatedDate).fromNow()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default ItemArticle;
