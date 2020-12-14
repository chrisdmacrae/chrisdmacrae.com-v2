import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    
    return { ...initialProps }
  }

  render() {
    const bodyClasses = [];
    const page = this.props.__NEXT_DATA__.page;

    if (page === "/") {
      bodyClasses.push("homepage");
    }
    else {

      bodyClasses.push(page
        .replace(/^\//, "")
        .replace(/\/$/, "")
        .replace("[", "")
        .replace("]", "")
        .replace("/", "-")
      );
    }

    return (
      <Html>
        <Head />
        <body className={bodyClasses.join(" ")}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument;