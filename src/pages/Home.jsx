import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactLinks from '../components/ContactLinks';
import HeroCarousel from '../components/HeroCarousel';
import { images } from '../data/images';
import {
  education,
  heroSlides,
  photography,
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
  researchProjects.find((p) => p.id === 'lumina-select'),
  researchProjects.find((p) => p.id === 'peculiar-stars'),
].filter(Boolean);

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.index}>SYSU → NJU · PHYSICS · RESEARCH & CREATION</span>
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

      <section className={styles.section} aria-labelledby="education-title">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span>01 / EDUCATION</span>
            <h2 id="education-title">在两所百年学府里求学</h2>
          </header>
          <p className={styles.educationLead}>
            两所学校都肇始于二十世纪初，也都把基础学科放在核心位置。下面把两校的办学脉络、校训与公开排名一并列出。
          </p>
          <div className={styles.educationGrid}>
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                className={styles.educationCard}
                {...reveal}
                transition={{ delay: index * 0.08 }}
              >
                <div className={styles.educationMedia}>
                  <img
                    src={item.media.src}
                    alt={item.media.alt}
                    loading="lazy"
                    style={{ objectPosition: item.media.position }}
                  />
                  <span className={styles.educationStage}>{item.stage}</span>
                </div>
                <div className={styles.educationBody}>
                  <div className={styles.educationMeta}>
                    <span>{item.period}</span>
                    <span>{item.degree}</span>
                  </div>
                  <h3>
                    {item.school}
                    <small className={styles.educationEn}>{item.schoolEn}</small>
                  </h3>
                  <p className={styles.educationProgram}>{item.college} · {item.major}</p>
                  <div className={styles.educationDiscipline}>
                    <span>{item.discipline.label} · {item.discipline.subject}</span>
                    <strong>{item.discipline.grade}</strong>
                  </div>
                  <ul className={styles.educationTags}>
                    {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <figure className={styles.educationMotto}>
                    <figcaption>校训</figcaption>
                    <p>{item.motto}</p>
                    <small>{item.mottoNote}</small>
                  </figure>
                  <p className={styles.educationNote}>{item.note}</p>
                  <ul className={styles.educationRankings}>
                    {item.rankings.map((ranking) => (
                      <li key={`${ranking.label}-${ranking.year}`}>
                        <span className={styles.educationRankLabel}>
                          {ranking.label}<i>{ranking.year}</i>
                        </span>
                        <span className={styles.educationRankValue}>{ranking.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
          <p className={styles.educationFootnote}>
            排名取自 2026 软科世界大学学术排名、2027 QS 世界大学排名与 2026 泰晤士高等教育世界大学排名；学科评估为教育部学位与研究生教育发展中心第五轮评估结果，完整名单未统一公开发布，此处依据学校官方公开口径整理。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}><span>02 / RESEARCH</span><h2>用实验与计算理解问题</h2></header>
          <div className={styles.twoCol}>
            {featuredProjects.map((project) => (
              <motion.article key={project.id} className={styles.record} {...reveal}>
                <span>{project.label} · {project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.external ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel || '访问 GitHub 仓库 ↗'}
                  </a>
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
          <header className={styles.sectionHeader}><span>03 / PRACTICE</span><h2>在真实现场承担具体角色</h2></header>
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
          <header className={styles.sectionHeader}><span>04 / PHOTOGRAPHY</span><h2>以影像保存观察</h2></header>
          <div className={styles.photoIntro}>
            <p>{photography.lead}</p>
            <p>{photography.social}</p>
          </div>
          <div className={styles.photoHighlights}>
            {photography.highlights.map((item) => (
              <div key={item.note} className={styles.photoHighlight}>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
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
          <div className={styles.photoSkills}>
            <div><span>摄影设备</span><p>{photography.equipment.join(' · ')}</p></div>
            <div><span>后期处理</span><p>{photography.postTools.join(' · ')}</p></div>
          </div>
          <Link className={styles.sectionLink} to="/portfolio">浏览全部摄影作品</Link>
        </div>
      </section>

      <section className={styles.contact}>
        <div className="container">
          <span>05 / CONTACT</span>
          <h2>讨论研究、影像或一次合作。</h2>
          <ContactLinks email={profile.email} light />
        </div>
      </section>
    </>
  );
}
