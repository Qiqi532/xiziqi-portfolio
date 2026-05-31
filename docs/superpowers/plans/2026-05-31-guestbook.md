# Guestbook 留言板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder ContactForm with a real Supabase-backed guestbook where visitors can leave messages with a custom nickname.

**Architecture:** New `src/lib/supabase.js` initializes the Supabase client from env vars. New `Guestbook` component handles form display, validation, message posting, and message fetching. The About page swaps ContactForm for Guestbook. Old ContactForm files are deleted.

**Tech Stack:** React 18, Supabase JS SDK v2, CSS Modules, Framer Motion

---

### Task 1: Supabase — 创建项目和数据库表

**Prerequisite:** 用户需要有一个 Supabase 账号 (supabase.com)

- [ ] **Step 1: 创建 Supabase 项目**

1. 打开 https://supabase.com/dashboard 并登录
2. 点击 "New project"
3. 输入项目名称（例如 `xiziqi-guestbook`）
4. 设置数据库密码（保存好）
5. 选择离用户最近的区域（如 Southeast Asia）
6. 点击 "Create project"，等待 1-2 分钟

- [ ] **Step 2: 获取 API 凭证**

创建完成后，进入项目 dashboard：
1. 左侧菜单 → Settings → API
2. 记录两个值：
   - **Project URL** (例如 `https://xxxxx.supabase.co`)
   - **anon public key** (以 `eyJ...` 开头的长字符串)

- [ ] **Step 3: 创建 messages 表并配置 RLS**

在 Supabase dashboard 中：
1. 左侧菜单 → SQL Editor
2. 点击 "New query"
3. 粘贴以下 SQL 并点击 "Run"：

```sql
-- Create the messages table
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  nickname TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);
```

4. 验证：左侧菜单 → Table Editor → 应该能看到 `messages` 表

---

### Task 2: 安装依赖和配置

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env`
- Create: `src/lib/supabase.js`

- [ ] **Step 1: 安装 Supabase JS SDK**

```bash
npm install @supabase/supabase-js
```

Expected: package.json 新增 `@supabase/supabase-js` 依赖，node_modules 安装完成。

- [ ] **Step 2: 创建 .env 文件**

Create: `.env`

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

将 Task 1 Step 2 中获取的 URL 和 anon key 填入。注意 `.gitignore` 已包含 `.env` 的规则吗？检查一下——目前的 `.gitignore` 只列了 `node_modules`、`dist`、`.superpowers`、`.claude`。需要添加。

- [ ] **Step 3: 将 .env 加入 .gitignore**

Modify: `.gitignore` — 在文件末尾添加：

```
.env
```

Run: `git status` — 确认 `.env` 不会被 tracking。

- [ ] **Step 4: 创建 Supabase 客户端模块**

Create: `src/lib/supabase.js`

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not configured. Guestbook will run in demo mode.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
```

- [ ] **Step 5: 提交**

```bash
git add package.json package-lock.json .gitignore src/lib/supabase.js
git commit -m "chore: add Supabase SDK and client config"
```

---

### Task 3: 创建 Guestbook 组件

**Files:**
- Create: `src/components/Guestbook.jsx`
- Create: `src/components/Guestbook.module.css`

- [ ] **Step 1: 创建 Guestbook.module.css**

Create: `src/components/Guestbook.module.css`

```css
/* === Section wrapper === */
.section {
  width: 100%;
}

/* === Form === */
.form {
  background: white;
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}

.field {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-forest-light);
  margin-bottom: 6px;
}

.input,
.textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-charcoal);
  background: var(--color-cream);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.input:focus,
.textarea:focus {
  border-color: var(--color-forest-light);
  box-shadow: 0 0 0 3px rgba(107, 155, 99, 0.15);
}

.input::placeholder,
.textarea::placeholder {
  color: #ccc;
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.charCount {
  text-align: right;
  font-size: 0.75rem;
  color: #bbb;
  margin-top: 4px;
}

.submit {
  width: 100%;
  padding: 14px;
  background: var(--color-forest);
  color: white;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.submit:hover:not(:disabled) {
  background: var(--color-forest-light);
}

.submit:active:not(:disabled) {
  transform: scale(0.98);
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* === Messages list === */
.messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #aaa;
  font-weight: 300;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #aaa;
  font-weight: 300;
  font-style: italic;
}

/* === Message card === */
.card {
  background: var(--color-sand);
  border-radius: var(--radius-sm);
  padding: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.nickname {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--color-forest);
}

.time {
  font-size: 0.75rem;
  color: #bbb;
  font-weight: 300;
}

.content {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-charcoal);
  white-space: pre-wrap;
  word-break: break-word;
}

/* === Error === */
.error {
  background: #fff0f0;
  color: #c0392b;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.errorRetry {
  background: none;
  border: none;
  color: #c0392b;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
}
```

- [ ] **Step 2: 创建 Guestbook.jsx**

Create: `src/components/Guestbook.jsx`

```jsx
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
```

- [ ] **Step 3: 提交**

```bash
git add src/components/Guestbook.jsx src/components/Guestbook.module.css
git commit -m "feat: add Guestbook component with Supabase backend"
```

---

### Task 4: 修改 About 页面，替换 ContactForm 为 Guestbook

**Files:**
- Modify: `src/pages/About.jsx`

- [ ] **Step 1: 修改 About.jsx 的 import 和 contactContent**

Modify: `src/pages/About.jsx`

将第 2 行的 import：
```js
import ContactForm from '../components/ContactForm';
```

替换为：
```js
import Guestbook from '../components/Guestbook';
```

将第 134-142 行的：
```jsx
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <ContactForm />
          </motion.div>
```

替换为：
```jsx
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Guestbook />
          </motion.div>
```

- [ ] **Step 2: 修改 "Get in Touch" 区域的标题和副标题以匹配留言板**

修改：
```jsx
            <h2>Get in Touch</h2>
            <hr className="section-divider" />
            <p className={styles.contactSubtitle}>
              Interested in a shoot? Have a collaboration idea? Drop me a message.
            </p>
```

为：
```jsx
            <h2>Guestbook</h2>
            <hr className="section-divider" />
            <p className={styles.contactSubtitle}>
              Leave a message — share your thoughts, say hello, or just leave a mark.
            </p>
```

- [ ] **Step 3: 提交**

```bash
git add src/pages/About.jsx
git commit -m "feat: replace ContactForm with Guestbook on About page"
```

---

### Task 5: 清理旧文件

**Files:**
- Delete: `src/components/ContactForm.jsx`
- Delete: `src/components/ContactForm.module.css`
- Modify: `src/pages/Contact.jsx`

- [ ] **Step 1: 删除 ContactForm 组件文件**

```bash
rm src/components/ContactForm.jsx src/components/ContactForm.module.css
```

- [ ] **Step 2: 更新 Contact.jsx 移除无效 import**

Read `src/pages/Contact.jsx`，将第 2 行：
```js
import ContactForm from '../components/ContactForm';
```

删除。将整个 ContactForm 相关的 formCol 部分删除，只保留 contact info 部分（精简为一个独立的联系信息页，以防以后想恢复路由）。

最终 `Contact.jsx` 内容：

```jsx
import { motion } from 'framer-motion';
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
              <div className={styles.infoValue}>2286079159@qq.com</div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x1F4F1;</div>
              <div className={styles.infoLabel}>WeChat</div>
              <div className={styles.infoValue}>Xizq532-H</div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x1F4D5;</div>
              <div className={styles.infoLabel}>小红书</div>
              <div className={styles.infoValue}>9776387705</div>
            </div>

            <p className={styles.responseNote}>
              I typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/ContactForm.jsx src/components/ContactForm.module.css src/pages/Contact.jsx
git commit -m "chore: remove ContactForm, clean up Contact page"
```

---

### Task 6: 验证和测试

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev
```

打开浏览器访问 http://localhost:5173/xiziqi-portfolio/about

- [ ] **Step 2: 手动测试**

1. 页面应显示 Guestbook 区域（在联系信息下方）
2. 输入昵称少于 2 字符 → 提交按钮保持 disabled
3. 输入有效昵称 + 有效留言 → 提交按钮变为可点击
4. 点击提交 → 按钮显示 "Sending..."，成功后留言出现在列表顶部
5. 刷新页面 → 留言仍然显示（来自 Supabase）

- [ ] **Step 3: 构建确认无报错**

```bash
npm run build
```

Expected: `dist/` 目录生成成功，无错误输出。

- [ ] **Step 4: 部署到 GitHub Pages**

```bash
npm run deploy
```

打开线上页面验证留言板功能。

- [ ] **Step 5: 提交（如有修改）**

如有任何修复，提交最终版本。
