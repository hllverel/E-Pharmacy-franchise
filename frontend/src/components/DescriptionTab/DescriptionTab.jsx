import styles from './DescriptionTab.module.css';

const splitLabel = (paragraph) => {
  const colonIndex = paragraph.slice(0, 60).lastIndexOf(':');

  if (colonIndex === -1) {
    return { label: '', text: paragraph };
  }

  return {
    label: paragraph.slice(0, colonIndex + 1),
    text: paragraph.slice(colonIndex + 1).trim(),
  };
};

export default function DescriptionTab({ description }) {
  const paragraphs = description
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return <p className={styles.empty}>No description available.</p>;
  }

  const [intro, ...sections] = paragraphs;

  return (
    <div className={styles.description}>
      <p className={styles.intro}>{intro}</p>
      {sections.map((paragraph) => {
        const { label, text } = splitLabel(paragraph);
        return (
          <p key={paragraph} className={styles.paragraph}>
            {label && <span className={styles.label}>{label} </span>}
            {text}
          </p>
        );
      })}
    </div>
  );
}