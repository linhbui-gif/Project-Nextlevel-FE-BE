import "../style/theme.scss";

import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { AppInitialProps, AppContext } from "next/app";
import { END } from "redux-saga";
import { SagaStore, wrapper } from "../store";
import { readCookie, readCookieValue } from "../utils/cookies.utils";
import { restoreLoginAction } from "../store/actions";

type TProps = AppInitialProps & {
  restoreLogin?: (token: string) => void;
  Component?: any;
};

const WrappedApp = (props: TProps) => {
  const { Component, pageProps, restoreLogin } = props;
  useLayoutEffect(() => {
    const token = readCookie("token");
    if (token) {
      restoreLogin(token);
    }
  }, [restoreLogin]);
  return <Component {...pageProps} />;
};

WrappedApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<TProps> => {
  // 0. Restore user session with Cookies
  let token;
  if (ctx.req) {
    token = readCookieValue(ctx.req.headers.cookie, "token");
  } else {
    token = readCookie("token");
  }
  if (token) {
    ctx.store.dispatch(restoreLoginAction(token));
  }
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  // 2. Stop the saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask.toPromise();
  }

  // 3. Return props
  return {
    pageProps,
  };
};

export default wrapper.withRedux(
  connect(null, { restoreLogin: restoreLoginAction })(WrappedApp)
);
