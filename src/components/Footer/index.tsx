import styles from './styles.module.scss';

export function Footer() {
    return (
        <div className={styles.footerContent}><p className={styles.versionText}>v 1.0</p></div>
    );
}