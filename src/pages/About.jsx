import ContactLinks from '../components/ContactLinks';
import { personalGallery, profile } from '../data/siteContent';
import styles from './About.module.css';

export default function About() {
  const [leadPhoto, ...galleryPhotos] = personalGallery;

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}><span>ABOUT</span><h1>关于</h1></header>

        <div className={styles.intro}>
          <figure className={styles.leadPhoto} data-testid="personal-photo">
            <img
              src={leadPhoto.src}
              alt={leadPhoto.alt}
              data-featured="true"
              style={{ objectPosition: leadPhoto.position }}
            />
          </figure>
          <div className={styles.biography}>
            <h2>{profile.name}</h2>
            <p className={styles.role}>{profile.role}</p>
            <p>{profile.introduction}</p>
            <p>我习惯把问题拆开来看，也习惯用相机把光留下来。这里放着我在做的研究、走过的现场，和一路拍下的照片。</p>
            <ContactLinks email={profile.email} />
          </div>
        </div>

        <section className={styles.gallerySection} aria-labelledby="gallery-title">
          <div className={styles.galleryHeading}>
            <span>PERSONAL ARCHIVE · 16 PHOTOS</span>
            <h2 id="gallery-title">个人切面</h2>
            <p>旅行、校园、会议、志愿服务与日常片刻。</p>
          </div>
          <div className={styles.gallery}>
            {galleryPhotos.map((photo) => (
              <figure
                key={photo.src}
                className={`${styles.photo} ${styles[photo.span]}`}
                data-testid="personal-photo"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.position }}
                />
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
