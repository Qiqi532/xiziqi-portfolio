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
          <h1>摄影</h1>
          <hr className="section-divider" />
          <p className={styles.subtitle}>
            在校园、城市与旅途之间，记录光线，也记录人与空间的关系。现为视觉中国、海丝泉州签约摄影师，小红书「曦熙子柒」持续更新摄影与旅行内容。
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
