import { Occurrence } from "../../interfaces/occurrence";
import { useEffect, useState } from "react";
import { formatLocalDate } from "../../utils/format";
import api from "../../services/api";

export function OccurrencesTable() {
    const [occurrences, setOccurrences] = useState<Occurrence[]>();

    useEffect(() => {
        api.get('occurrences/all').then(response => {
            setOccurrences(response.data);
        });
    }, []);

    if (!occurrences) {
        return (
            <div >
                Carregando...
            </div>
        )
    }

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
                    {
                        occurrences?.map(occurrence => (
                            <tr key={occurrence.id}>
                                <td>{formatLocalDate(occurrence.createdAt, 'dd/MM/yyyy')}</td>
                                <td>{occurrence.name}</td>
                                <td>{occurrence.service.serviceName}</td>
                                <td>icone fotos</td>
                                <td>{occurrence.status}</td>
                                <td>{occurrence.obs}</td>
                                <td>link para rotas</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}