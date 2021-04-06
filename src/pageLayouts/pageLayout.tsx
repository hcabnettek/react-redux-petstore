import React, { PropsWithChildren, ReactElement } from "react";

export default function pageLayout({
  children,
}: PropsWithChildren<{}>): ReactElement {
  return (
    <>
      <header>
        <h1>Hello</h1>
      </header>
      <main>{children}</main>
      <footer>My Footer</footer>
    </>
  );
}
