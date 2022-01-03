import { Occurrence } from "../../interfaces/occurrence";
import { useEffect, useState } from "react";
import { formatLocalDate } from "../../utils/format";
import api from "../../services/api";

import { BiLinkExternal } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IconContext } from "react-icons";

import styles from './styles.module.scss';
import { statusAberta, statusEmAndamento, statusFinalizada } from "../../enums/status";

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
                                <td className={styles.imagesCell}>
                                    <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.5em" }}>
                                        <BsEyeFill />
                                    </IconContext.Provider>
                                </td>
                                <td className={styles.statusCell}>
                                    {
                                        (occurrence.status === statusAberta) ? "Em aberto" :
                                            ((occurrence.status === statusEmAndamento) ? "Em andamento" :
                                                (((occurrence.status === statusFinalizada) ?? "Finalizada"))
                                            )
                                    }
                                    <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.7em" }}>
                                        <HiOutlinePencilAlt />
                                    </IconContext.Provider>
                                </td>
                                <td>{occurrence.obs ? occurrence.obs : '-'}</td>
                                <td className={styles.gMapsLinkCell}>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${occurrence.latitude},${occurrence.longitude}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.5em" }}>
                                            <BiLinkExternal />
                                        </IconContext.Provider>

                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    );
}