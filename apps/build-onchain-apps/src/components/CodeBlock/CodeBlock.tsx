import { getHighlighter } from 'shikiji';
import { useEffect, useState } from 'react';
import isClient from '../../utils/isClient';
import styles from './CodeBlock.module.css';

function Code({ code }: { code: string }) {
  const [innerHtml, setHtml] = useState('...');
  useEffect(() => {
    if (!isClient() || !code) {
      return;
    }
    getHighlighter({
      themes: ['nord'],
      langs: ['javascript'],
    })
      .then((highlighter) => {
        const html = highlighter.codeToHtml(code, {
          lang: 'javascript',
          theme: 'nord',
        });
        setHtml(html);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [code]);
  // eslint-disable-next-line react/no-danger
  return <code dangerouslySetInnerHTML={{ __html: innerHtml }} />;
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
