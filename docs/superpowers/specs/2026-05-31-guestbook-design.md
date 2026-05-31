# Guestbook Design

## Goal

Replace the placeholder `ContactForm` (which shows a fake alert on submit) with a real
Supabase-backed guestbook where visitors can leave messages with a custom nickname.

## Architecture

```
About Page
├── About Section         (unchanged)
├── Divider               (unchanged)
├── Contact Info Cards    (unchanged — email/WeChat/小红书)
└── Guestbook Section     ← replaces ContactForm
    ├── Nickname input (2–20 chars)
    ├── Message textarea (5–500 chars)
    ├── Submit button (with loading state)
    └── Message list (reverse chronological)
```

## Backend — Supabase

**Table: `messages`**

| Column       | Type      | Notes                        |
|-------------|-----------|------------------------------|
| id          | int8      | auto-increment PK             |
| nickname    | text      | 2–20 chars                   |
| content     | text      | 5–500 chars                  |
| created_at  | timestamptz | default now()              |

**Row Level Security:** Allow anonymous INSERT and SELECT. No UPDATE or DELETE needed.

**JS client:** `@supabase/supabase-js` v2, direct `supabase.from('messages').select('*').order('created_at', { ascending: false })` /
`.insert({ nickname, content })`.

## Frontend — Guestbook Component

### States

- **Loading:** skeleton placeholders while fetching messages
- **Empty:** "No messages yet — be the first!" prompt
- **Error:** inline error banner with retry button
- **Submitting:** button shows spinner, disabled to prevent double-submit
- **Success:** message appears at top after insert, form clears

### Validation

- Nickname: 2–20 characters, trimmed
- Content: 5–500 characters, trimmed
- Both checked client-side before submit
- Server errors caught and displayed

### Display

- Each message card: nickname (bold), relative timestamp ("3 minutes ago"), content
- Reverse chronological order (newest first)
- Cards use same visual style as existing `.infoCard` on About page

### Data fetching

- Fetch all messages on mount (no pagination for a personal site guestbook)
- After successful insert, either re-fetch or prepend locally (re-fetch for simplicity)

## Files

| Action | File                                |
|--------|-------------------------------------|
| NEW    | `src/components/Guestbook.jsx`      |
| NEW    | `src/components/Guestbook.module.css` |
| NEW    | `.env` (SUPABASE_URL, SUPABASE_ANON_KEY) |
| MODIFY | `src/pages/About.jsx` — use Guestbook instead of ContactForm |
| DELETE | `src/components/ContactForm.jsx`    |
| DELETE | `src/components/ContactForm.module.css` |
| MODIFY | `src/pages/Contact.jsx` — remove ContactForm import (redirects anyway) |

## Styling

Follow existing design system:
- CSS Modules (`.module.css`)
- Color tokens: `var(--color-cream)`, `var(--color-brown)`, `var(--color-text)`
- Same border-radius / box-shadow as `.infoCard`
- Framer Motion fade-up animation on entry (match existing patterns)
