import styles from './styles.module.scss';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';

interface ModalDialogStatusEditProps {
    isOpen: boolean,
    closeFunction: () => void,
}

export function ModalDialogStatusEdit({ isOpen, closeFunction }: ModalDialogStatusEditProps) {
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
                </div>

                <div className={styles.selectOccurrenceStatus}>

                </div>
            </DialogContent>
        </Dialog>
    )
}