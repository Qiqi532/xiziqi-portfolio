import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactLinks from '../components/ContactLinks';
import HeroCarousel from '../components/HeroCarousel';
import { images } from '../data/images';
import {
  heroSlides,
  practiceChapters,
  profile,
  researchProjects,
  selectedPhotography,
} from '../data/siteContent';
import styles from './Home.module.css';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const categoryImages = Object.fromEntries(
  ['campus', 'landscape', 'portrait'].map((key) => [key, images.find((item) => item.category === key)]),
);

const featuredProjects = [
  researchProjects.find((p) => p.id === 'optical-sensing'),
  researchProjects.find((p) => p.id === 'physics-research-intelligence'),
  researchProjects.find((p) => p.id === 'peculiar-stars'),
].filter(Boolean);

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.index}>SYSU · PHYSICS · RESEARCH & CREATION</span>
            <p className={styles.name}>{profile.name} <small>{profile.englishName}</small></p>
            <h1>{profile.statement}</h1>
            <p className={styles.lead}>{profile.role}。{profile.introduction}</p>
            <div className={styles.actions}>
              <Link to="/research">了解研究方向</Link>
              <Link to="/portfolio" className={styles.secondary}>浏览摄影作品</Link>
            </div>
          </div>
          <HeroCarousel slides={heroSlides} />
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}><span>01 / RESEARCH</span><h2>用实验与计算理解问题</h2></header>
          <div className={styles.twoCol}>
            {featuredProjects.map((project) => (
              <motion.article key={project.id} className={styles.record} {...reveal}>
                <span>{project.label} · {project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.external ? (
                  <a href={project.href} target="_blank" rel="noreferrer">访问 GitHub 仓库 ↗</a>
                ) : (
                  <Link to={project.href}>查看项目细节 →</Link>
                )}
              </motion.article>
            ))}
          </div>
          <Link className={styles.sectionLink} to="/research">进入研究学习页</Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.muted}`}>
        <div className="container">
          <header className={styles.sectionHeader}><span>02 / PRACTICE</span><h2>在真实现场承担具体角色</h2></header>
          <div className={styles.practiceGrid}>
            {practiceChapters.map((item) => (
              <motion.article key={item.label} {...reveal}>
                <span>{item.label}</span><h3>{item.title}</h3><p>{item.summary}</p>
              </motion.article>
            ))}
          </div>
          <Link className={styles.sectionLink} to="/practice">进入个人实践页</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}><span>03 / PHOTOGRAPHY</span><h2>以影像保存观察</h2></header>
          <div className={styles.photoGrid}>
            {selectedPhotography.map((item) => {
              const selectedImage = categoryImages[item.key];
              return (
                <Link key={item.key} to={item.href} className={styles.photoCard}>
                  <img src={selectedImage?.thumb} alt={selectedImage?.title || item.title} loading="lazy" />
                  <span>{item.category}</span><h3>{item.title}</h3>
                </Link>
              );
            })}
          </div>
          <Link className={styles.sectionLink} to="/portfolio">浏览全部摄影作品</Link>
        </div>
      </section>

      <section className={styles.contact}>
        <div className="container">
          <span>04 / CONTACT</span>
          <h2>讨论研究、影像或一次合作。</h2>
          <ContactLinks email={profile.email} light />
        </div>
      </section>
    </>
  );
}
