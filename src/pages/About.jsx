import ContactLinks from '../components/ContactLinks';
import ResponsiveImage from '../components/ResponsiveImage';
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
            <ResponsiveImage
              src={leadPhoto.src}
              alt={leadPhoto.alt}
              data-featured="true"
              sizes="(max-width: 760px) calc(100vw - 40px), 440px"
              loading="eager"
              style={{ objectPosition: leadPhoto.position }}
            />
            <figcaption>{leadPhoto.alt}</figcaption>
          </figure>
          <div className={styles.biography}>
            <h2>{profile.name}</h2>
            <p className={styles.role}>{profile.role}</p>
            <p>{profile.introduction}</p>
            <p>读物理，也做开发和摄影。这里记录我的研究、参与过的实践，以及校园与旅途中的日常。</p>
            <ContactLinks email={profile.email} />
          </div>
        </div>

        <section className={styles.gallerySection} aria-labelledby="gallery-title">
          <div className={styles.galleryHeading}>
            <span>PERSONAL ARCHIVE · {personalGallery.length} PHOTOS</span>
            <h2 id="gallery-title">个人切面</h2>
            <p>旅行、校园、会议、志愿服务与日常片刻。</p>
          </div>
          <div className={styles.gallery}>
            {galleryPhotos.map((photo) => (
              <figure
                key={photo.src}
                className={styles.photo}
                data-testid="personal-photo"
              >
                <ResponsiveImage
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 46vw, 360px"
                  style={{ objectPosition: photo.position }}
                />
                <figcaption>{photo.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
