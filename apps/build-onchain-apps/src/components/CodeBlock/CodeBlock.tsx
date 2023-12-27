import styles from './CodeBlock.module.css';

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.CodeBlock}>
      <span className={styles.CodeBlockLang}>sh</span>
      <pre className={styles.CodeBlockPre}>
        <code className={styles.CodeBlockCode}>{children}</code>
      </pre>
    </div>
  );
}
