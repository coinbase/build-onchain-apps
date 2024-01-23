import { useEffect, useState } from 'react';
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

function Code({ code }: { code: string }) {
  const [innerHtml, setHtml] = useState('...');
  useEffect(() => {
    if (!code) {
      return;
    }

    highlightCode(code)
      .then((highlightedCode) => {
        setHtml(highlightedCode);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [code]);
  // eslint-disable-next-line react/no-danger
  return <code dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}

export default function CodeBlock({ code, language = 'sh' }: { code: string; language?: string }) {
  return (
    <div className={styles.CodeBlock}>
      <span className={styles.CodeBlockLang}>{language}</span>
      <pre className={styles.CodeBlockPre}>
        <Code code={code} />
      </pre>
    </div>
  );
}
