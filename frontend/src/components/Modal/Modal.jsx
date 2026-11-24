import { useEffect, useId, useRef } from 'react';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';

export default function Modal({ title, onClose, initialFocusRef, children }) {
  const dialogRef = useRef(null);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    initialFocusRef?.current?.focus();

    return () => {
      document.body.style.overflow = '';
      dialog.close();
    };
  }, [initialFocusRef]);

  const handleMouseDown = (event) => {
    pressedOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event) => {
    if (pressedOnBackdrop.current && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onCancel={handleCancel}
    >
      <div className={styles.content}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {children}
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="close" className={styles.closeIcon} />
        </button>
      </div>
    </dialog>
  );
}