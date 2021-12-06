import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function Dashboard() {
    return (
        <>
            <Header />

            <div className={styles.contentWrapper}>
                <h1 className={styles.pageTitle}>Dashboard de ocorrências</h1>
            </div>

            <Footer />
        </>
    );
}