import * as React from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import styles from './CodeBlock.module.css';

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
      theme: 'github-dark',
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}

export default async function CodeBlock({
  code,
  language = 'sh',
}: {
  code: string;
  language?: string;
}) {
  const highlightedCode = await highlightCode(code);

  return (
    <div className={styles.CodeBlock}>
      <span className={styles.CodeBlockLang}>{language}</span>
      <pre className={styles.CodeBlockPre}>
        {/* eslint-disable-next-line react/no-danger */}
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}
