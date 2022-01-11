import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../services/api';

interface OccurrenceByStatusDB {
    status: string,
    count: number
}

export function DonutChart() {
    const options = {
        legend: {
            show: true,
        }
    }

    const [occurrencesByStatusDB, setOccurrencesByStatusDB] = useState<OccurrenceByStatusDB[]>([]);
    const [apexChartLabels, setApexChartLabels] = useState<string[]>([]);
    const [apexChartSeries, setApexChartSeries] = useState<number[]>([]);

    useEffect(() => {
        api.get('occurrences/all/count/groupByStatus').then(response => {
            setOccurrencesByStatusDB(response.data);
            setApexChartLabels(occurrencesByStatusDB?.map(element => {
                return element.status;
            }))

            setApexChartSeries(occurrencesByStatusDB?.map(element => {
                return element.count;
            }))
        })
    }, [occurrencesByStatusDB]);

    return (
        <Chart
            options={{ ...options, labels: apexChartLabels }}
            series={apexChartSeries}
            type="donut"
            height="280"
            width="380"
        />
    );
}