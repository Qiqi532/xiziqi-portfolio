import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — no backend yet
    alert('Thanks for your message! This form is currently a placeholder. Reach out directly at your@email.com');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          placeholder="How should I call you?"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="type">Shoot Type</label>
        <select
          id="type"
          name="type"
          className={styles.input}
          value={form.type}
          onChange={handleChange}
        >
          <option value="">Select a type...</option>
          <option value="campus">Campus</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          placeholder="Tell me about your vision..."
          rows={4}
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Send Message
      </button>
    </form>
  );
}
