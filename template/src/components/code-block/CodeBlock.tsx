import { useEffect, useState } from 'react';
import { getHighlighterCore } from 'shikiji/core';
import shellscriptLang from 'shikiji/langs/shellscript.mjs';
import githubDark from 'shikiji/themes/github-dark.mjs';
import { getWasmInlined } from 'shikiji/wasm';
import isClient from '../../utils/isClient';
import styles from './CodeBlock.module.css';

function Code({ code }: { code: string }) {
  const [innerHtml, setHtml] = useState('...');
  useEffect(() => {
    if (!isClient() || !code) {
      return;
    }

    getHighlighterCore({
      themes: [githubDark],
      langs: [shellscriptLang],

      loadWasm: getWasmInlined,
    })
      .then((highlighter) => {
        const html = highlighter.codeToHtml(code, {
          lang: 'shellscript',
          theme: 'github-dark',
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
