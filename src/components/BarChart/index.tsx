import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../services/api';

interface OccurrenceByServicesDB {
    serviceName: string,
    _count: {
        occurrences: number
    }
}

export function BarChart() {
    const options = {
        plotOptions: {
            bar: {
                horizontal: false,
            }
        }
    }

    const [occurrencesByServiceDB, setOccurrencesByServiceDB] = useState<OccurrenceByServicesDB[]>([]);
    const [apexChartLabels, setApexChartLabels] = useState<String[]>([]);
    const [apexChartSeries, setApexChartSeries] = useState<Number[]>([]);

    useEffect(() => {
        api.get('occurrences/all/count/groupByServices').then(response => {
            setOccurrencesByServiceDB(response.data);
            const filteredOccurrencesByService = occurrencesByServiceDB?.filter(element => {
                return element._count.occurrences > 0;
            });

            setApexChartLabels(filteredOccurrencesByService?.map(element => {
                return element.serviceName;
            }))

            setApexChartSeries(filteredOccurrencesByService?.map(element => {
                return element._count.occurrences;
            }))
        })
    }, [occurrencesByServiceDB]);

    const chartData = {
        labels: {
            categories: apexChartLabels,
        },
        series: [
            {
                name: "Quantidade de ocorrências",
                data: apexChartSeries
            }
        ]
    }


    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="320"
            width="600"
        />
    );
}