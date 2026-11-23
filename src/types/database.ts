export type EventType = "birthday" | "anniversary" | "valentine" | "apology" | "proposal" | "custom";

export type ThemePreset = 
  | "romantic-rose" 
  | "starry-night" 
  | "golden-luxury" 
  | "pastel-dream" 
  | "midnight-velvet";

export interface GiftPhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  hint?: string;
}

export interface ToolsConfig {
  loveCounter: boolean;
  cake: boolean;
  scratch: boolean;
  cassette: boolean;
  quiz: boolean;
  bottle: boolean;
  letter: boolean;
  memories: boolean;
  video: boolean;
  skyLanterns: boolean;
}

export interface ThemeConfig {
  preset: ThemePreset;
  primaryColor?: string;
  accentColor?: string;
}

export interface Gift {
  id: string;
  slug: string;
  title: string;
  recipient_name: string;
  sender_name: string;
  event_type: EventType;
  passcode: string;
  teaser_enabled: boolean;
  teaser_headline?: string;
  teaser_note?: string;
  love_start_date?: string; // ISO date string
  letter_content?: string;
  voice_note_url?: string;
  background_music_url?: string;
  video_url?: string;
  photos: GiftPhoto[];
  quiz_questions: QuizQuestion[];
  scratch_secret?: string; // Message revealed after scratching
  bottle_message?: string;
  lantern_wishes: string[];
  tools_config: ToolsConfig;
  theme_config: ThemeConfig;
  is_active: boolean;
  views_count: number;
  expires_at: string; // ISO date string
  created_at: string;
  created_by: string;
}

export interface AgentUser {
  id: string;
  username: string;
  role: "admin" | "agent";
  quota: number; // -1 for unlimited
  created_gifts_count: number;
  allowed_tools?: string[];
  is_active: boolean;
  created_at: string;
}
