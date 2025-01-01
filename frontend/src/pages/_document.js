import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentHeadTags,
 documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';

export default function Document(props) {
  return (
    <Html lang="en">
      <Head >
      <DocumentHeadTags {...props} />
      <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <meta
            name="description"
            content="Internet of Things (IoT) security and privacy news, research, and resources."
          />
          <meta
            name="keywords"
            content="internet of things ,vulnerability, IoT, security, privacy, cybersecurity"
          />
          <meta name="author" content="Ryuzvki" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};