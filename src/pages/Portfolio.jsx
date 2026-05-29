import { useState } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import styles from './Portfolio.module.css';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export default function Portfolio() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp}>
          <h2>Portfolio</h2>
          <hr className="section-divider" />
          <p className={styles.subtitle}>
            A selection of work across campus, landscape, and portrait photography
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Gallery onImageClick={(img) => setLightboxImage(img)} />
        </motion.div>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
