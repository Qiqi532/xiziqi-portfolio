import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import styles from './Contact.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp(0)}>
          <h2>Get in Touch</h2>
          <hr className="section-divider" />
          <p className={styles.subtitle}>
            Interested in a shoot? Have a collaboration idea? Just want to say
            hello? Drop me a message.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div className={styles.infoCol} {...fadeUp(0.2)}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x2709;</div>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>your@email.com</div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x1F4F1;</div>
              <div className={styles.infoLabel}>Social</div>
              <div className={styles.infoLinks}>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <span className={styles.divider}>&bull;</span>
                <a href="#" className={styles.socialLink}>WeChat</a>
                <span className={styles.divider}>&bull;</span>
                <a href="#" className={styles.socialLink}>Xiaohongshu</a>
              </div>
            </div>

            <p className={styles.responseNote}>
              I typically respond within 24 hours.
            </p>
          </motion.div>

          <motion.div className={styles.formCol} {...fadeUp(0.3)}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
