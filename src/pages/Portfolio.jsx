import { useState } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import PhotographyCreator from '../components/PhotographyCreator';
import { photography } from '../data/siteContent';
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
            在校园、城市与旅途之间，记录光线，也记录人与空间的关系。
          </p>
        </motion.div>

        <div className={styles.credentials}>
          <section className={styles.exhibition} aria-labelledby="exhibition-title">
            <span className={styles.eyebrow}>01 / EXHIBITION</span>
            <h2 id="exhibition-title">{photography.exhibition.title}</h2>
            <p>{photography.exhibition.description}</p>
            <div className={styles.award}>
              <span aria-hidden="true">✧</span>
              <strong>{photography.exhibition.distinction}</strong>
              <small>摄影展荣誉</small>
            </div>
          </section>
          <section className={styles.partnership} aria-labelledby="partnership-title">
            <span className={styles.eyebrow}>02 / PHOTOGRAPHER</span>
            <h2 id="partnership-title">{photography.partnership.title}</h2>
            <ul className={styles.partners}>
              {photography.partnership.platforms.map((platform) => (
                <li key={platform}><span aria-hidden="true">◈</span>{platform}<small>签约摄影师</small></li>
              ))}
            </ul>
            <p>{photography.partnership.description}</p>
          </section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Gallery onImageClick={(img) => setLightboxImage(img)} />
        </motion.div>
        <PhotographyCreator creator={photography.creator} />
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
