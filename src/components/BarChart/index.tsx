import Chart from 'react-apexcharts';
export function BarChart() {
    const options = {
        plotOptions: {
            bar: {
                horizontal: false,
            }
        }
    }
    
    const mockData = {
        labels: {
            categories: [
                "Água e esgoto",
                "Coleta de lixo e limpeza de vias",
                "Drenagem de água da chuva",
                "Pavimentação",
                "Trânsito e tráfego",
                "Transporte coletivo",
                "Iluminação pública",
                "Energia elétrica",
                "Serviços telefênicos",
                "Distribuição de gás",
                "Educação e ensino",
                "Saúde e higiene",
                "Assistência social",
                "Mercados, feiras e matadouros",
                "Serviço funerário",
                "Segurança pública",
                "Esportes, lazer, cultura e recreação",
                "Defesa civil",
            ]
        },
        series: [
            {
                name: "Quantidade de ocorrências",
                data: [8,5,7,8,6,2,8,4,6,2,4,9,2,5,1,9,2,7]
            }
        ]
    }


    return (
        <Chart
            options={{ ...options, xaxis: mockData.labels }}
            series={mockData.series}
            type="bar"
            height="320"
            width="600"
        />
    );
}