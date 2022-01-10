import styles from './styles.module.scss';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { statusAberta, statusEmAndamento, statusFinalizada } from "../../enums/status";
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface ModalDialogStatusEditProps {
    isOpen: boolean,
    closeFunction: () => void,
    occurrenceStatus: {
        occurrenceId: number,
        occurrenceStatus: number
    }
}

export function ModalDialogStatusEdit({ isOpen, closeFunction, occurrenceStatus }: ModalDialogStatusEditProps) {
    const [selectedStatus, setSelectedStatus] = useState('1');

    useEffect(() => {
        setSelectedStatus(String(occurrenceStatus.occurrenceStatus));
    }, [occurrenceStatus])

    const handleChangeSelectValue = (event: SelectChangeEvent) => {
        setSelectedStatus(event.target.value);
    };

    const handleConfirmClick = async () => {
        const data = new FormData();
        data.append('id', String(occurrenceStatus.occurrenceId));
        data.append('status', selectedStatus);

        const result = await api.patch('occurrences/update', data);

        if (result.status === 200) {
            alert('Status da ocorrência atualizado com sucesso.');
            window.location.reload();
        } else {
            alert('Não foi possível salvar a ocorrência, tente novamente.');
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeFunction}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <DialogContent>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>Alteração do status da ocorrência</h1>
                    <div className={styles.selectOccurrenceStatus}>
                        <label className={styles.statusLabel}>Status</label>
                        <Select
                            value={selectedStatus}
                            onChange={handleChangeSelectValue}
                        >
                            <MenuItem value={String(statusAberta)}>Em aberto</MenuItem>
                            <MenuItem value={String(statusEmAndamento)}>Em andamento</MenuItem>
                            <MenuItem value={String(statusFinalizada)}>Finalizada</MenuItem>
                        </Select>
                    </div>
                    <div className={styles.buttonsWrapper}>
                        <button onClick={handleConfirmClick} className={styles.confirmButton}>Confirmar</button>
                        <button onClick={closeFunction} className={styles.closeButton}>Cancelar</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}