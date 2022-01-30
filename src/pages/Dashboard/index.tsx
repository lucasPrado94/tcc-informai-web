import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BarChart } from '../../components/BarChart';
import { DonutChart } from '../../components/DonutChart';
import { OccurrencesTable } from '../../components/OccurrencesTable';

export function Dashboard() {
    return (
        <>
            <Header />

            <div className={styles.contentWrapper}>

                <h1 className={styles.pageTitle}>Dashboard de ocorrências</h1>
                <div className={styles.break}></div>
                <div className={styles.chartsContainer}>
                    <div className={styles.chartContainer}>
                        <h2 className={styles.chartTitle}>Ocorrências por serviços</h2>
                        <BarChart />
                    </div>
                    <div className={styles.chartContainer}>
                        <h2 className={styles.chartTitle}>Ocorrências por status</h2>
                        <DonutChart />
                    </div>
                </div>
                <OccurrencesTable />
            </div>

            <Footer />
        </>
    );
}