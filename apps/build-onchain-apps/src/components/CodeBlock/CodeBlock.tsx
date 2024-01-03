import * as React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import styles from './CodeBlock.module.css';
import isClient from '../../utils/isClient';
import { useEffect, useState } from 'react';
 

function Code({ code }: { code: string }) {
  const [innerHtml, setHtml] = useState('...');
  useEffect(() => {
    if (!isClient() || !code) {
      return;
    }
    highlightCode(code).then((highlightedCode) => {
      setHtml(highlightedCode);
    }).catch((err) => {
      console.error(err);
    });
  }, [code]);
  // eslint-disable-next-line react/no-danger
  return <code dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
 
async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
      theme: 'vitesse-black',
    })
    .use(rehypeStringify)
    .process(code);
 
  return String(file);
}

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className={styles.CodeBlock}>
      <span className={styles.CodeBlockLang}>sh</span>
      <pre className={styles.CodeBlockPre}>
        <Code code={code} />
      </pre>
    </div>
  );
}
