import { motion } from 'framer-motion';
import ResponsiveImage from '../components/ResponsiveImage';
import { competitions, internships, publications, researchProjects, skillGroups } from '../data/siteContent';
import styles from './Research.module.css';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const physicsProjectIds = new Set(['optical-sensing', 'peculiar-stars']);
const projectGroups = [
  {
    id: 'physics-projects', label: '01 / PHYSICS', title: '物理研究',
    description: '围绕光纤传感与恒星光谱，在实验测量、数据计算和物理解释之间寻找答案。',
    projects: researchProjects.filter(({ id }) => physicsProjectIds.has(id)),
  },
  {
    id: 'development-projects', label: '04 / DEVELOPMENT', title: '独立开发',
    description: '从论文阅读、摄影选片到交互演示，把日常遇到的问题做成可以使用的工具。',
    projects: researchProjects.filter(({ id }) => !physicsProjectIds.has(id)),
  },
];

const sectionLinks = [
  ['physics-projects', '物理研究'],
  ['publications', '论文'],
  ['competitions', '奖项'],
  ['development-projects', '独立开发'],
  ['internships', '实习经历'],
  ['skills', '工具'],
];

function ProjectSection({ group }) {
  return (
    <section id={group.id} className={styles.projects} aria-labelledby={`${group.id}-title`}>
      <div className={styles.sectionHeading}>
        <span>{group.label}</span><h2 id={`${group.id}-title`}>{group.title}</h2>
      </div>
      <p className={styles.groupDescription}>{group.description}</p>
      {group.projects.map((project, index) => (
        <motion.article
          id={project.id}
          key={project.id}
          className={styles.project}
          {...reveal}
          transition={{ delay: index * .06 }}
        >
          <div className={styles.projectCopy}>
            <div className={styles.projectMeta}>
              <span>{project.label}</span><span>{project.period}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <dl className={styles.projectFacts}>
              <div><dt>我的工作</dt><dd>{project.contribution}</dd></div>
              <div><dt>项目进展</dt><dd>{project.status}</dd></div>
            </dl>
            <details className={styles.methodDetails}>
              <summary>展开方法与实现</summary>
              <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
            {project.external && (
              <a href={project.href} target="_blank" rel="noreferrer" className={styles.projectLink}>
                {project.linkLabel || '访问 GitHub 仓库 ↗'}
              </a>
            )}
          </div>
          <figure className={styles.projectMedia}>
            <ResponsiveImage src={project.media.src} alt={project.media.alt} sizes="(max-width: 980px) calc(100vw - 80px), 420px" loading="lazy" />
          </figure>
        </motion.article>
      ))}
    </section>
  );
}

export default function Research() {
  const [physicsGroup, developmentGroup] = projectGroups;

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span>RESEARCH & LEARNING</span>
          <h1>研究学习</h1>
          <p>从光纤传感到恒星光谱，用实验与计算探索物理；在独立开发与游戏产品实习中，把需求转化为工具与体验。</p>
        </header>

        <nav className={styles.sectionNav} aria-label="研究学习页内导航">
          {sectionLinks.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <ProjectSection group={physicsGroup} />

        <section id="publications" className={styles.section} aria-labelledby="publications-title">
          <div className={styles.sectionHeading}>
            <span>02 / PUBLICATIONS</span><h2 id="publications-title">代表论文</h2>
          </div>
          <div className={styles.publications}>
            {publications.map((publication) => (
              <article key={publication.title} className={styles.publication}>
                <div className={styles.paperVisuals}>
                  <ResponsiveImage src={publication.image} alt={publication.imageAlt} sizes="(max-width: 760px) 32vw, 180px" loading="lazy" />
                  <ResponsiveImage src={publication.figure} alt={publication.figureAlt} sizes="(max-width: 760px) 48vw, 300px" loading="lazy" />
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

        <section id="competitions" className={styles.section} aria-labelledby="competitions-title">
          <div className={styles.sectionHeading}>
            <span>03 / COMPETITIONS</span><h2 id="competitions-title">竞赛与奖项</h2>
          </div>
          <div className={styles.awards}>
            {competitions.map((item) => (
              <article key={item.title} className={styles.award}>
                <a href={item.certificate} target="_blank" rel="noreferrer" aria-label={`查看${item.title}证书`}>
                  <ResponsiveImage src={item.certificate} alt={item.certificateAlt} sizes="(max-width: 560px) calc(100vw - 80px), 320px" loading="lazy" />
                </a>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <ProjectSection group={developmentGroup} />

        <section id="internships" className={styles.section} aria-labelledby="internships-title">
          <div className={styles.sectionHeading}>
            <span>05 / INTERNSHIP</span><h2 id="internships-title">实习经历</h2>
          </div>
          {internships.map((internship) => (
            <article key={internship.id} className={styles.internshipCard} aria-labelledby={`${internship.id}-title`}>
              <header className={styles.internshipHeader}>
                <ResponsiveImage src={internship.logo.src} alt={internship.logo.alt} width={internship.logo.width} height={internship.logo.height} className={styles.internshipLogo} />
                <div>
                  <div className={styles.projectMeta}><span>{internship.company}</span><span>{internship.period}</span></div>
                  <h3 id={`${internship.id}-title`}>{internship.role}</h3>
                </div>
              </header>
              <p className={styles.internshipSummary}>{internship.summary}</p>
              <ol className={styles.internshipWorkflow} aria-label="游戏产品制作工作流">
                {internship.workflow.map((step) => <li key={step.tool}><strong>{step.tool}</strong><span>{step.task}</span></li>)}
              </ol>
              <dl className={styles.internshipResponsibilities}>
                {internship.responsibilities.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}
              </dl>
            </article>
          ))}
        </section>

        <section id="skills" className={styles.section} aria-labelledby="skills-title">
          <div className={styles.sectionHeading}>
            <span>06 / TOOLS & METHODS</span><h2 id="skills-title">工具与方法</h2>
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
