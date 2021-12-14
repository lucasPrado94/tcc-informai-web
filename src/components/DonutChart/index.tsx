import Chart from 'react-apexcharts';
export function DonutChart() {
    const options = {
        legend: {
            show: true,
        }
    }

    const mockData = {
        labels: ['Finalizadas', 'Abertas', 'Em andamento'],
        series: [50, 12, 6]
    }

    return (
        <Chart
            options={{ ...options, labels: mockData.labels }}
            series={mockData.series}
            type="donut"
            height="280"
            width="380"
        />
    );
}