export function OccurrencesTable() {

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Aberto por</th>
                        <th>Serviço</th>
                        <th>Fotos</th>
                        <th>Status da Ocorrência</th>
                        <th>Observação</th>
                        <th>Ver rota no Google Maps</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                        page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{formatLocalDate(item.date, 'dd/MM/yyyy')}</td>
                                <td>{item.seller.name}</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))*/
                    }
                </tbody>
            </table>
        </div>
    );
};