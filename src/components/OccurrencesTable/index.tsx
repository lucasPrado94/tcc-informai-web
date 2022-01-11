import { Occurrence } from "../../interfaces/occurrence";
import { useEffect, useState } from "react";
import { formatLocalDate } from "../../utils/format";
import api from "../../services/api";

import { BiLinkExternal } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IconContext } from "react-icons";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import styles from './styles.module.scss';
import { statusAberta, statusEmAndamento, statusFinalizada } from "../../enums/status";
import { ModalDialogImages } from "../ModalDialogImages";
import { ModalDialogStatusEdit } from "../ModalDialogStatusEdit";
import { Image } from "../../interfaces/image";

//declarando uma constante para servir de enum para buscar todas as ocorrências, como sendo no status 0
const statusTodas = 0;

export function OccurrencesTable() {
    const [occurrences, setOccurrences] = useState<Occurrence[]>();
    const [statusFilter, setStatusFilter] = useState(String(statusAberta));
    const [openModalImages, setOpenModalImages] = useState(false);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [currentModalImages, setCurrentModalImages] = useState<Image[]>([]);
    const [currentOccurrenceStatus, setCurrentOccurrenceStatus] = useState({
        occurrenceId: 0,
        occurrenceStatus: 1,
    });

    useEffect(() => {
        const url = (statusFilter === String(statusTodas)) ? 'occurrences/all' : `occurrences/all/${statusFilter}`;
        api.get(url).then(response => {
            setOccurrences(response.data);
        });
    }, [statusFilter]);

    const handleChangeSelectValue = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
    };

    const handleCloseModalImages = () => {
        setOpenModalImages(false);
        setCurrentModalImages([]);
    };

    const handleCloseModalStatus = () => {
        setOpenModalStatus(false);
        setCurrentOccurrenceStatus({
            occurrenceId: 0,
            occurrenceStatus: 1,
        })
    };

    const handleClickOpenModalImages = (images: Image[]) => {
        setOpenModalImages(true);
        setCurrentModalImages(images);
    };

    const handleClickOpenModalStatus = (id: number, status: number) => {
        setOpenModalStatus(true);
        setCurrentOccurrenceStatus({
            occurrenceId: id,
            occurrenceStatus: status
        })
    };

    return (
        <>
            <div className={styles.filterContainer}>
                <p className={styles.filterTitle}>Ocorrências:</p>
                <Select
                    defaultValue={String(statusAberta)}
                    value={statusFilter}
                    onChange={handleChangeSelectValue}
                >
                    <MenuItem value={String(statusTodas)}>Todas</MenuItem>
                    <MenuItem value={String(statusAberta)}>Em aberto</MenuItem>
                    <MenuItem value={String(statusEmAndamento)}>Em andamento</MenuItem>
                    <MenuItem value={String(statusFinalizada)}>Finalizadas</MenuItem>
                </Select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-xl">
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
                                    <td>{(occurrence.name) ? occurrence.name : "Anônimo"}</td>
                                    <td>{occurrence.service.serviceName}</td>
                                    <td className={styles.imagesCell}>
                                        <Button onClick={() => handleClickOpenModalImages(occurrence.images)}>
                                            <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.5em" }}>
                                                <BsEyeFill />
                                            </IconContext.Provider>
                                        </Button>
                                    </td>
                                    <td className={styles.statusCell}>
                                        {
                                            (occurrence.status === statusAberta) ? "Em aberto" :
                                                ((occurrence.status === statusEmAndamento) ? "Em andamento" :
                                                    (((occurrence.status === statusFinalizada) && "Finalizada"))
                                                )
                                        }
                                        <Button onClick={() => handleClickOpenModalStatus(occurrence.id || 0, occurrence.status)}>
                                            <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.7em" }}>
                                                <HiOutlinePencilAlt />
                                            </IconContext.Provider>
                                        </Button>
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
                        {(occurrences?.length === 0) &&
                            (<tr >
                                <td colSpan={7}>
                                    Não existem ocorrências com esse filtro...
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div >

            <ModalDialogImages
                isOpen={openModalImages}
                closeFunction={handleCloseModalImages}
                images={currentModalImages}
            />

            <ModalDialogStatusEdit
                isOpen={openModalStatus}
                closeFunction={handleCloseModalStatus}
                occurrenceStatus={currentOccurrenceStatus}
            />
        </>
    );
}