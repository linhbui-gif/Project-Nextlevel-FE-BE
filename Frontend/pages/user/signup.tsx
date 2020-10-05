import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import SignUpForm from "../../components/forms/user.form";
import {
  requestSignUpAction,
  receivedUserValidationAction,
} from "../../store/actions";
import {
  TUser,
  TCreateUser,
  TUploadedFile,
  TUserValidation,
} from "../../types";
import Layout from "../../components/layout/full.layout";
import { AppState } from "../../store/reducers";
import { readFile } from "../../utils/upload.utils";
import { uploadCV } from "../../api";

type TProps = {
  user?: TUser;
  requestSignUp: (payload: TCreateUser) => void;
  setUserValidation: (payload: TUserValidation) => void;
  validation?: TUserValidation;
  loading: boolean;
};

const SignUp = ({
  user,
  requestSignUp,
  loading,
  validation,
  setUserValidation,
}: TProps) => {
  const [uploadedFile, setUploadedFile]: [
    TUploadedFile,
    (uploadedFile: TUploadedFile) => void
  ] = useState();
  const requestUploadCV = async (file) => {
    try {
      setUserValidation(null);
      const [arrayBuffer, type] = await readFile(file);
      if (type !== "application/pdf") {
        return setUserValidation(["Upload your CV in pdf format"]);
      }
      const formData = new FormData();
      formData.append("file", new Blob([arrayBuffer], { type }));
      const response = await uploadCV(formData);
      setUploadedFile(response.data);
    } catch (e) {
      setUserValidation(["Failed to upload CV"]);
    }
    return true;
  };
  const signUp = (newUser: TCreateUser) => {
    const cv = uploadedFile?.url;
    requestSignUp({ ...newUser, cv });
  };
  return (
    <Layout user={user}>
      <Container>
        <Row className="mt-5">
          <Col
            xs={12}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            className="text-center"
          >
            <h3>Create your account</h3>
            <p className="lead mb-5">
              Become a member of Next Level and get access to free resources and
              interesting coding projects.
            </p>
          </Col>
          <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <SignUpForm
              user={user}
              requestSignUp={signUp}
              requestUploadCV={requestUploadCV}
              loading={loading}
              validation={validation}
              uploadedFile={uploadedFile}
              resetUploadedCV={() => setUploadedFile(null)}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  loading: state.users.loading,
  validation: state.users.validation,
});

export default connect(mapStateToProps, {
  requestSignUp: requestSignUpAction,
  setUserValidation: receivedUserValidationAction,
})(SignUp);
