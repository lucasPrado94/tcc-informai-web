import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';

export function Header() {
    return (
        <div className={styles.headerContainer}>
            <img className={styles.logo} src={logoImg} alt="InformAí" />
        </div>
    );
}