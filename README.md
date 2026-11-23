# 💘 CupidYoon - Interactive Digital Romance & Birthday Gift Platform

> Handcrafted by Yoon ✨  
> A modern, luxury interactive digital gift web platform for couples, birthdays, anniversaries, and romantic surprises.

---

## 🌟 Key Features

1. **3D Cake & Candle Blow 🎂:** Click/tap to blow out the flickering flame, triggering realistic smoke, confetti blasts, and birthday blessings.
2. **Interactive Scratch Card 🪄:** Scratch away the shimmer foil with your finger/mouse to reveal a hidden secret message.
3. **Love Days & Realtime Seconds Counter ⏳:** Live ticker calculating years, months, days, hours, minutes, and seconds spent together.
4. **Envelope with Wax Seal & Unfolding Letter 💌:** Break the golden seal to watch the envelope smoothly flap open and reveal a handwritten love letter.
5. **Vintage Voice Cassette Tape 📼:** Retro romantic cassette with realistically spinning tape spools playing audio voice notes or love songs.
6. **Memories Photo Album 📸:** Polaroid-style photo album supporting 10~15 photos with sweet captions, zoomable lightbox, and heart likes.
7. **Sky Lanterns on Starry Night 🌌:** Tap the starry night sky to launch glowing golden sky lanterns carrying sweet romantic wishes.
8. **Message in a Bottle 🍾:** Ocean waves carrying a glass bottle with an unfurling parchment scroll.
9. **Interactive Couple Quiz 🏆:** Cute multiple-choice quiz questions to test couple memories.
10. **Client-side Auto Compression ⚡:** Automatic client-side photo (WebP) and video (under 3 mins) compression before uploading to save storage & bandwidth.
11. **Teaser Screen & Passcode Protection 🔒:** Show an attractive sneak-peek teaser to the customer, and release the passcode once payment is completed.
12. **10-Day Auto Expiration ⏳:** Links automatically expire after 10 days to encourage timely celebration and agency subscriptions.
13. **Admin Studio & Agent Management 👥:** Yoon can create unlimited gifts and manage sub-agents with quotas.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- **Live Demo Link:** `http://localhost:3000/koko`
- **Admin Studio:** `http://localhost:3000/admin`
  - Username: `yoon`
  - Password: `yoon2026`

---

## ☁️ Connecting Supabase (Database & Storage)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and paste the contents of `supabase_schema.sql` and run it.
3. Copy your **Project URL** and **anon public key** from Project Settings > API.
4. Create a `.env.local` file (or set environment variables in Render):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
*(Note: If Supabase keys are not set, CupidYoon automatically uses local browser storage for seamless immediate testing and demos!)*

---

## 🌐 Deploying to Render

1. Go to [render.com](https://render.com) and click **New > Web Service**.
2. Connect your GitHub repository: `https://github.com/babeyoon2003-create/CupidYoon`.
3. Configure the settings:
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Create Web Service**. Your app will be live at `https://cupidyoon.onrender.com`!

---

Crafted with all our love by **Yoon** 💖
