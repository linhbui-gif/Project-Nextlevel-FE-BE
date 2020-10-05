import React from "react";

const Jumbo = (): JSX.Element => (
  <div className="jumbotron">
    <div className="container">
      <h1 className="display-3">Next Level Developers</h1>
      <p>
        This is a template for a simple marketing or informational website. It
        includes a large callout called a jumbotron and three supporting pieces
        of content. Use it as a starting point to create something more unique.
      </p>
      <p>
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Get in touch »
        </a>
      </p>
    </div>
  </div>
);

export default React.memo(Jumbo);
