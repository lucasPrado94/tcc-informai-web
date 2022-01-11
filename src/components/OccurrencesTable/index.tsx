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

import _ from 'lodash';

//declaring a constant to serve as an enum to fetch all occurrences, as being in status 0
const statusTodas = 0;

const pageSize = 10;

export function OccurrencesTable() {
    const [occurrences, setOccurrences] = useState<Occurrence[]>();
    const [paginatedOccurrences, setPaginatedOccurrences] = useState<Occurrence[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(String(statusAberta));
    const [openModalImages, setOpenModalImages] = useState(false);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [currentModalImages, setCurrentModalImages] = useState<Image[]>([]);
    const [currentOccurrenceStatus, setCurrentOccurrenceStatus] = useState({
        occurrenceId: 0,
        occurrenceStatus: 1,
    });

    //This state is used to control the reload of the table
    const [reloadTable, setReloadTable] = useState(false);

    //The reloadTable is being watched by this effect to reload the table every 10 seconds
    useEffect(() => {
        const url = (statusFilter === String(statusTodas)) ? 'occurrences/all' : `occurrences/all/${statusFilter}`;
        api.get(url).then(response => {
            setOccurrences(response.data);
            setPaginatedOccurrences(_(response.data).slice(0).take(pageSize).value());
            setCurrentPage(1);
        });
    }, [statusFilter, reloadTable]);

    //This effect is used to change the value of reloadTable state every 10 seconds, to reload the table
    useEffect(() => {
        const interval = setInterval(() => {
            setReloadTable(!reloadTable);
        }, 10000);
        return () => clearInterval(interval);
    });

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

    const pageCount = occurrences ? Math.ceil(occurrences.length / pageSize) : 0;

    const pagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedOccurence = _(occurrences).slice(startIndex).take(pageSize).value();
        setPaginatedOccurrences(paginatedOccurence);
    }

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

            <div className="table-responsive" style={{ width: '100%' }}>
                <nav className="d-flex justify-content-center">

                    <ul className="pagination">
                        <li className={
                            currentPage === 1 ? "page-item disabled" : "page-item"
                        }>
                            <button className="page-link"
                                onClick={() => pagination(currentPage - 1)}
                            >
                                Anterior
                            </button>
                        </li>

                        <li className="page-item">
                            <span className="page-link disabled">
                                {currentPage}
                            </span>
                        </li>

                        <li className={
                            currentPage === pageCount ? "page-item disabled" : "page-item"
                        }>
                            <button className="page-link"
                                onClick={() => pagination(currentPage + 1)}
                            >
                                Próxima
                            </button>
                        </li>
                    </ul>

                </nav>
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
                            paginatedOccurrences?.map(occurrence => (
                                <tr key={occurrence.id}>
                                    <td style={{ width: '8%' }}>{formatLocalDate(occurrence.createdAt, 'dd/MM/yyyy')}</td>
                                    <td style={{ width: '20%' }}>{(occurrence.name) ? occurrence.name : "Anônimo"}</td>
                                    <td style={{ width: '15%' }}>{occurrence.service.serviceName}</td>
                                    <td className={styles.imagesCell} style={{ width: '5%' }}>
                                        <Button onClick={() => handleClickOpenModalImages(occurrence.images)}>
                                            <IconContext.Provider value={{ color: "#000", className: "global-class-name", size: "1.5em" }}>
                                                <BsEyeFill />
                                            </IconContext.Provider>
                                        </Button>
                                    </td>
                                    <td style={{ width: '15%' }}>
                                        <div className={styles.statusCell}>
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
                                        </div>
                                    </td>
                                    <td style={{ width: '25%' }}>{occurrence.obs ? occurrence.obs : '-'}</td>
                                    <td className={styles.gMapsLinkCell} style={{ width: '12%' }}>
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