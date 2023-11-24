import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "../markdown-styles.module.css";
import { selectThemeMode } from "../store/themeSlice";
import { useSelector } from "react-redux";

const MarkdownBlock = ({ content }) => {
  const theme = useSelector(selectThemeMode);

  return (
    <Markdown
      children={content}
      components={{
        p: ({ node, ...props }) => (
          <p {...props} className={styles.reactMarkDown} />
        ),
        h1: ({ children, ...props }) => (
          <h1 {...props} className={styles.reactMarkDown}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 {...props} className={styles.reactMarkDown}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 {...props} className={styles.reactMarkDown}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 {...props} className={styles.reactMarkDown}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 {...props} className={styles.reactMarkDown}>
            {children}
          </h5>
        ),
        h6: ({ children, ...props }) => (
          <h6 {...props} className={styles.reactMarkDown}>
            {children}
          </h6>
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className={styles.reactMarkDown} />
        ),
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={theme === "light" ? materialLight : materialDark}
            />
          ) : (
            <code {...rest} className={styles.reactMarkDown}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default MarkdownBlock;
