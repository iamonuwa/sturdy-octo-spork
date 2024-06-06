"use client";

import { Card, CardContent } from "@machines/ui";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Tree } from "../components/Tree";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codestring = `
"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { Textarea } from "@machines/ui";
import { Tree } from "../components/Tree";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const SourceTree = () => {
  return (
    <div className="grid h-full items-stretch gap-6 md:grid-cols-[200px_1fr]">
      <Tree>
        <Tree.File name="package.json" />
        <Tree.Folder name="components">
          <Tree.File name="layout.js" />
          <Tree.Folder name="footer">
            <Tree.File name="footer.js" />
            <Tree.File name="footer-text.js" />
            <Tree.File name="footer-license.js" />
          </Tree.Folder>
          <Tree.File name="header.js" />
        </Tree.Folder>
        <Tree.File name="readme.md" />
      </Tree>
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        className="code-output"
      >
      </SyntaxHighlighter>
      {/* <Textarea
        placeholder="Write a tagline for an ice cream shop"
        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
      /> */}
    </div>
  );
};
`;

export const SourceTree = () => {
  return (
    <Card className="bg-primary">
      <CardContent className="shadow-none border rounded-md grid py-4 h-full items-stretch gap-6 md:grid-cols-[200px_1fr]">
        <Tree>
          <Tree.File name="package.json" />
          <Tree.Folder name="components">
            <Tree.File name="layout.js" />
            <Tree.Folder name="footer">
              <Tree.File name="footer.js" />
              <Tree.File name="footer-text.js" />
              <Tree.File name="footer-license.js" />
            </Tree.Folder>
            <Tree.File name="header.js" />
          </Tree.Folder>
          <Tree.File name="readme.md" />
        </Tree>
        <SyntaxHighlighter
          language="javascript"
          style={a11yDark}
          className="code-output flex-1 p-4 max-h-[700px] overflow-auto"
          showLineNumbers
        >
          {codestring}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
};
