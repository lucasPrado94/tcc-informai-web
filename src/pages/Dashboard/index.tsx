import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function Dashboard() {
    return (
        <>
            <Header />

            <div className={styles.contentWrapper}>

                <h1 className={styles.pageTitle}>Dashboard de ocorrências</h1>
                <div className={styles.break}></div>
                <div className={styles.chartsContainer}>
                    <div className={styles.chartContainer}>
                        <h2 className={styles.chartTitle}>Gráfico 1</h2>
                        <p>Aqui virá o gráfico 1.</p>
                    </div>
                    <div className={styles.chartContainer}>
                        <h2 className={styles.chartTitle}>Gráfico 2</h2>
                        <p>Aqui virá o gráfico 2</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}