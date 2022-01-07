import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import styles from './styles.module.scss';
import { ImageSlider } from '../ImageSlider';
import { Image } from '../../interfaces/image';

interface ModalDialogImagesProps {
    isOpen: boolean,
    close: () => void,
    images: Image[],
}

export function ModalDialogImages({ isOpen, close, images }: ModalDialogImagesProps) {
    const SliderData = images.map(image => {
        return { image: `http://192.168.1.104:4000/uploads/${image.fileName}` };
    })

    return (
        <Dialog
            open={isOpen}
            onClose={close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <DialogContent>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>Visualizaçao das fotos</h1>
                    <div className={styles.imageListWrapper}>
                        <ImageSlider slides={SliderData} />
                    </div>
                    <div className={styles.closeButtonWrapper}>
                        <button onClick={close} className={styles.closeButton}>Fechar</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}