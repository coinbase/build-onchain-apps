import { getHighlighterCore } from 'shikiji/core';
import { getWasmInlined } from 'shikiji/wasm';
import vitesseBlack from 'shikiji/themes/vitesse-black.mjs';
import shellscriptLang from 'shikiji/langs/shellscript.mjs';
import { useEffect, useState } from 'react';
import isClient from '../../utils/isClient';
import styles from './CodeBlock.module.css';

function Code({ code }: { code: string }) {
  const [innerHtml, setHtml] = useState('...');
  useEffect(() => {
    if (!isClient() || !code) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    getHighlighterCore({
      themes: [vitesseBlack],
      langs: [shellscriptLang],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      loadWasm: getWasmInlined,
    })
      .then((highlighter) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const html = highlighter.codeToHtml(code, {
          lang: 'shellscript',
          theme: 'vitesse-black',
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
