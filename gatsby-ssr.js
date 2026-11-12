import React from "react";
import { Helmet } from "react-helmet";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <Helmet>
      <meta http-equiv="Referrer-Policy" content="no-referrer" />
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="Strict-Transport-Security" content="max-age=63072000; includeSubDomains; preload" />
      <meta http-equiv="Permissions-Policy" content="accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" />
      <meta http-equiv="Content-Security-Policy" content="base-uri 'self'; default-src 'self' 'unsafe-inline' https://ghbtns.com https://planeteclipse.org https://netlify-cdp-loader.netlify.app https://app.netlify.com https://sessions.bugsnag.com https://api.segment.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://api.eclipse.org https://img.shields.io https://github.com; font-src 'self' data: https://fonts.gstatic.com;" />
    </Helmet>
  ]);
};

