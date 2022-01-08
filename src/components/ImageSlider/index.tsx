import { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import styles from './styles.module.scss';

interface ImageSliderProps {
    slides: {
        image: string,
    }[]
}

export function ImageSlider({ slides }: ImageSliderProps) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className={styles.sliderSection}>
            <section className={styles.sliderWrapper}>
                {(slides.length > 1) &&
                    <button onClick={prevSlide} className={styles.arrowButton}><FaArrowAltCircleLeft className={styles.arrow} /> </button>}
                <div className={styles.imagesWrapper}>
                    {slides.map((slide, index) => {
                        return (
                            <div
                                className={index === current ? 'slide active' : 'slide'}
                                key={index}
                            >
                                {index === current && (
                                    <img src={slide.image} alt='Imagem da ocorrência' className={styles.image} />
                                )}
                            </div>
                        );
                    })}
                </div>
                {(slides.length > 1) &&
                    <button onClick={nextSlide} className={styles.arrowButton}><FaArrowAltCircleRight className={styles.arrow} /></button>
                }
            </section>
            <div className={styles.imagesCounter}>Foto {current + 1} de {length}</div>
        </section>
    );
};