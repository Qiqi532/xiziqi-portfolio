import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import styles from './Guestbook.module.css';

function timeAgo(dateString) {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const trimmedNickname = nickname.trim();
  const trimmedContent = content.trim();
  const nicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 20;
  const contentValid = trimmedContent.length >= 5 && trimmedContent.length <= 500;
  const canSubmit = nicknameValid && contentValid && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('messages')
      .insert({ nickname: trimmedNickname, content: trimmedContent });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
    } else {
      setNickname('');
      setContent('');
      setSubmitting(false);
      await fetchMessages();
    }
  };

  return (
    <div className={styles.section}>
      {/* ── Form ── */}
      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="gnickname">
            Nickname
          </label>
          <input
            type="text"
            id="gnickname"
            className={styles.input}
            placeholder="Your nickname (2–20 characters)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gcontent">
            Message
          </label>
          <textarea
            id="gcontent"
            className={styles.textarea}
            placeholder="Write your message... (5–500 characters)"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
          />
          <div className={styles.charCount}>
            {content.length}/500
          </div>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={!canSubmit}
        >
          {submitting ? 'Sending...' : 'Leave a Message'}
        </button>
      </motion.form>

      {/* ── Error banner ── */}
      {error && (
        <div className={styles.error}>
          <span>{error}</span>
          <button className={styles.errorRetry} onClick={fetchMessages}>
            Retry
          </button>
        </div>
      )}

      {/* ── Messages list ── */}
      <div className={styles.messages}>
        {loading ? (
          <div className={styles.loading}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className={styles.empty}>
            No messages yet — be the first to leave one!
          </div>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.6) }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.nickname}>{msg.nickname}</span>
                <span className={styles.time}>{timeAgo(msg.created_at)}</span>
              </div>
              <div className={styles.content}>{msg.content}</div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
