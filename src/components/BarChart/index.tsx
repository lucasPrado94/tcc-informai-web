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

    return (
        <Chart
            options={{
                ...options, xaxis: {
                    categories: apexChartLabels,
                }
            }}
            series={[
                {
                    name: "Quantidade de ocorrĂȘncias",
                    data: apexChartSeries
                }
            ]}
            type="bar"
            height="320"
            width="600"
        />
    );
}