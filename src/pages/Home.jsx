import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ContactLinks from '../components/ContactLinks';
import HeroCarousel from '../components/HeroCarousel';
import PhotographyCreator from '../components/PhotographyCreator';
import ResponsiveImage from '../components/ResponsiveImage';
import { images } from '../data/images';
import { education, heroSlides, internships, photography, practiceChapters, profile, publications, selectedPhotography } from '../data/siteContent';
import styles from './Home.module.css';

const featuredPhotos = images.filter((image) => image.exhibition).slice(0, 6);
const featuredInternship = internships[0];
const highlights = [
  { key: 'research', label: '01 / PHYSICS', title: '从光纤到星光', summary: '研究光纤传感，也从恒星光谱里寻找物理线索。', result: `${publications.length} 篇论文 · 持续推进物理研究`, href: '/research', link: '进入研究学习页' },
  { key: 'development', label: '02 / DEVELOPMENT', title: '把想法写成工具', summary: '为物理论文阅读和摄影选片，独立开发自己需要的工具。', result: 'Physics Research Intelligence · Lumina Select', href: '/research#development-projects', link: '看看独立开发项目' },
  { key: 'internship', label: '03 / INTERNSHIP', title: featuredInternship.role, summary: featuredInternship.summary, result: `${featuredInternship.company} · ${featuredInternship.period}`, logo: featuredInternship.logo, href: '/research#internships', link: '查看实习经历' },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.grid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.index}>SYSU → NJU · PHYSICS · LIGHT · CODE</span>
            <p className={styles.name}>{profile.name}<small>{profile.englishName}</small></p>
            <h1 id="home-title"><span>中山大学 · 物理学</span><span>2027 年将赴南京大学深造</span></h1>
            <p className={styles.role}>{profile.role}</p>
            <p className={styles.lead}>{profile.shortIntroduction}</p>
          </div>
          <HeroCarousel slides={heroSlides} />
        </div>
      </section>

      <section id="education" className={`${styles.section} ${styles.educationSection}`} aria-labelledby="education-title">
        <div className="container">
          <header className={styles.sectionHeader}><span>01 / EDUCATION</span><h2 id="education-title">教育背景</h2><p>从中山大学出发，2027 年将赴南京大学继续深造。</p></header>
          <div className={styles.educationGrid}>
            {education.map((item) => (
              <article key={item.id} className={styles.educationCard}>
                <div className={styles.educationTop}>
                  <ResponsiveImage src={item.media.src} alt={item.media.alt} sizes="(max-width: 420px) 88px, (max-width: 800px) 120px, (max-width: 1000px) 140px, 180px" className={styles.educationImage} />
                  <div>
                    <span className={styles.educationStage}>{item.stage} · {item.period}</span>
                    <h3>{item.school}<small>{item.schoolEn}</small></h3>
                    <p>{item.college} · {item.major}</p>
                    <span className={styles.educationDegree}>{item.degree}</span>
                  </div>
                </div>
                <div className={styles.educationCredentials}>
                  <ul className={styles.educationTags}>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className={styles.educationDiscipline}><span>{item.discipline.label} · {item.discipline.subject}</span><strong>{item.discipline.grade}</strong></div>
                </div>
                <details className={styles.schoolDetails}>
                  <summary>校史、校训与公开资料 <span aria-hidden="true">＋</span></summary>
                  <div className={styles.schoolDetailsBody}>
                    <figure className={styles.educationMotto}><figcaption>校训</figcaption><p>{item.motto}</p><small>{item.mottoNote}</small></figure>
                    <p>{item.note}</p>
                    <ul className={styles.educationRankings}>{item.rankings.map((ranking) => <li key={ranking.label}><span>{ranking.label} <small>{ranking.year}</small></span><strong>{ranking.value}</strong></li>)}</ul>
                  </div>
                </details>
              </article>
            ))}
          </div>
          <p className={styles.educationFootnote}>排名取自 2026 软科世界大学学术排名、2027 QS 世界大学排名与 2026 泰晤士高等教育世界大学排名；学科评估为教育部学位与研究生教育发展中心第五轮评估结果，完整名单未统一公开发布，此处依据学校官方公开口径整理。</p>
        </div>
      </section>

      <section className={styles.workSection} aria-labelledby="work-title">
        <div className="container">
          <header className={styles.sectionHeader}><span>02 / RESEARCH & EXPERIENCE</span><h2 id="work-title">研究与实习</h2><p>在物理研究、独立开发与产品实习中，把问题拆解成具体的工作。</p></header>
          <div className={styles.workGrid}>
            {highlights.map((item) => (
              <Link key={item.key} to={item.href} className={styles.workCard}>
                <span className={styles.workLabel}>{item.label}{item.logo && <ResponsiveImage src={item.logo.src} alt={item.logo.alt} width={item.logo.width} height={item.logo.height} className={styles.workLogo} />}</span>
                <h3>{item.title}</h3><p>{item.summary}</p>
                <small>{item.result}</small>
                <span className={styles.workLink}>{item.link}<span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.muted}`} aria-labelledby="practice-title">
        <div className="container">
          <header className={styles.sectionHeader}><span>03 / PRACTICE</span><h2 id="practice-title">在真实现场，做具体的事</h2><p>在校园媒体、志愿服务与社会实践中，把想法变成行动。</p></header>
          <div className={styles.practiceGrid}>{practiceChapters.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{(item.titleLines || [item.title]).map((line, index) => <Fragment key={line}>{index > 0 ? <br /> : null}{line}</Fragment>)}</h3>
              <p>{item.summary}</p>
            </article>
          ))}</div>
          <Link className={styles.sectionLink} to="/practice">进入个人实践页 <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="photography-title">
        <div className="container">
          <header className={styles.sectionHeader}><span>04 / PHOTOGRAPHY</span><h2 id="photography-title">把看见的光留下来</h2><p>校园里的清晨，海岸边的风，以及城市中一闪而过的片刻。</p></header>
          <div className={styles.photoHeading}><p>{photography.lead}</p><Link to="/portfolio?category=exhibition">入展作品 · 特别推荐 <span aria-hidden="true">↗</span></Link></div>
          <div className={styles.photoGrid}>
            {featuredPhotos.map((photo) => (
              <Link key={photo.id} to="/portfolio?category=exhibition" className={styles.photoCard}>
                <ResponsiveImage src={photo.src} alt={photo.title} sizes="(max-width: 640px) 45vw, 33vw" />
                <span>{photo.title}<span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
          <div className={styles.photoCategories}>{selectedPhotography.map((item) => <Link key={item.key} to={item.href}>{item.title} <span aria-hidden="true">→</span></Link>)}</div>
          <PhotographyCreator creator={photography.creator} />
          <details className={styles.photoTools}><summary>摄影设备与后期工具</summary><p>{photography.equipment.join(' · ')}</p><p>{photography.postTools.join(' · ')}</p></details>
          <Link className={styles.sectionLink} to="/portfolio">浏览全部摄影作品 <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <div className="container"><span>05 / CONTACT</span><h2 id="contact-title">研究、影像，或一次新的合作。</h2><p>欢迎来信，聊聊正在发生的想法。</p><ContactLinks email={profile.email} /></div>
      </section>
    </>
  );
}
