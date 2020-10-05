import React from "react";

const Featurettes = (): JSX.Element => (
  <div>
    <hr className="featurette-divider" />

    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading text-primary">
          Join a Community Project.
          <p className="text-muted">Gain experience.</p>
        </h2>
        <p className="lead">
          Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
          ligula porta felis euismod semper. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
        </p>
      </div>
      <div className="col-md-5">
        <img
          className="featurette-image img-fluid mx-auto"
          src="/planning-square.jpg"
          alt=""
        />
      </div>
    </div>

    <hr className="featurette-divider" />

    <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading text-primary">
          Code Reviews &amp; Discussions.
          <p className="text-muted">Improve your skills.</p>
        </h2>
        <p className="lead">
          After every feature you finish, we will do a review of the code and
          help you understand any possible improvements. We try to focus on the
          quality of the code, rather than how fast you can copy-paste from
          StackOverflow.
        </p>
      </div>
      <div className="col-md-5 order-md-1">
        <img
          className="featurette-image img-fluid mx-auto"
          src="/code-square.jpg"
          alt=""
        />
      </div>
    </div>

    <hr className="featurette-divider" />

    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading text-primary">
          Work on international projects.
          <p className="text-muted">Practice English.</p>
        </h2>
        <p className="lead">
          The best way to learn is to take a deep dive into an English
          environment and use it in everyday situations. All of the feature
          requirements are in English as well as the team discussions.
        </p>
      </div>
      <div className="col-md-5">
        <img
          className="featurette-image img-fluid mx-auto"
          src="/men-having-conversation.jpg"
          alt=""
        />
      </div>
    </div>

    <hr className="featurette-divider" />
  </div>
);

export default React.memo(Featurettes);
