import { motion } from 'framer-motion';
import { competitions, publications, researchProjects, skillGroups } from '../data/siteContent';
import styles from './Research.module.css';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function Research() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span>RESEARCH & LEARNING</span>
          <h1>研究学习</h1>
          <p>从可测量的光信号到恒星光谱，在实验、计算与物理解释之间建立联系。</p>
        </header>

        <section className={styles.projects} aria-labelledby="projects-title">
          <h2 id="projects-title">代表项目</h2>
          {researchProjects.map((project, index) => (
            <motion.article
              id={project.id}
              key={project.id}
              className={styles.project}
              {...reveal}
              transition={{ delay: index * .06 }}
            >
              <div className={styles.projectCopy}>
                <div className={styles.projectMeta}>
                  <span>{project.label}</span><span>{project.period}</span><span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <p className={styles.contribution}>{project.contribution}</p>
                {project.external && (
                  <a href={project.href} target="_blank" rel="noreferrer" className={styles.projectLink}>
                    访问 GitHub 仓库 ↗
                  </a>
                )}
              </div>
              <figure className={styles.projectMedia}>
                <img src={project.media.src} alt={project.media.alt} loading="lazy" />
              </figure>
            </motion.article>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="publications-title">
          <div className={styles.sectionHeading}>
            <span>PUBLICATIONS</span><h2 id="publications-title">代表论文</h2>
          </div>
          <div className={styles.publications}>
            {publications.map((publication) => (
              <article key={publication.title} className={styles.publication}>
                <div className={styles.paperVisuals}>
                  <img src={publication.image} alt={publication.imageAlt} loading="lazy" />
                  <img src={publication.figure} alt={publication.figureAlt} loading="lazy" />
                </div>
                <div className={styles.paperCopy}>
                  <span>{publication.authorship}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.journal}</p>
                  <a href={publication.href} target="_blank" rel="noreferrer">访问 DOI ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="competitions-title">
          <div className={styles.sectionHeading}>
            <span>COMPETITIONS</span><h2 id="competitions-title">竞赛与奖项</h2>
          </div>
          <div className={styles.awards}>
            {competitions.map((item) => (
              <article key={item.title} className={styles.award}>
                <a href={item.certificate} target="_blank" rel="noreferrer" aria-label={`查看${item.title}证书`}>
                  <img src={item.certificate} alt={item.certificateAlt} loading="lazy" />
                </a>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="skills-title">
          <div className={styles.sectionHeading}>
            <span>TOOLS & METHODS</span><h2 id="skills-title">工具与方法</h2>
          </div>
          <div className={styles.skillGroups}>
            {skillGroups.map((group) => (
              <section key={group.label} className={styles.skillGroup}>
                <h3>{group.label}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
