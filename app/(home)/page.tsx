'use client';

import { useEffect, useRef, useState } from 'react';
import ThemeVendor from '@/components/themes/ThemeVendor';
import ThemeCRT    from '@/components/themes/ThemeCRT';
import ThemeNeon   from '@/components/themes/ThemeNeon';

// ── 主题定义 ──────────────────────────────────────────
type ThemeId = 'vendor' | 'crt' | 'neon';

const THEMES: { id: ThemeId; label: string; dot: string; activeBg: string; activeText: string }[] = [
  { id: 'vendor', label: '叫卖版', dot: '#ef4444', activeBg: '#ef4444', activeText: '#fff' },
  { id: 'crt',    label: '故障版', dot: '#fff',    activeBg: '#fff',    activeText: '#000' },
  { id: 'neon',   label: '霓虹版', dot: '#ff0066', activeBg: '#ff0066', activeText: '#fff' },
];

// ── 叫卖大喇叭 Hook ───────────────────────────────────
const HAWKER_LINES = [
  '老板老板，看过来！看过来！',
  'AI把前端团队搞没了！但我还在！我还在！',
  'React、Vue、Next.js，样样精通，不骗人！',
  'Web3钱包对接、链上交互，AI不会，但我会！',
  '原价三十万年薪，现在骨折出售！',
  '数量有限，先到先得，不要犹豫！',
  '错过这次，再等三年！',
  '老板，你还在等什么！',
];

function useHawker() {
  const [speaking, setSpeaking] = useState(false);
  const idxRef    = useRef(0);
  const activeRef = useRef(false);

  const speak = (text: string, onEnd: () => void) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'zh-CN';
    utter.rate  = 1.1;
    utter.pitch = 1.2;
    const zhVoice = speechSynthesis.getVoices().find((v) => v.lang.startsWith('zh'));
    if (zhVoice) utter.voice = zhVoice;
    utter.onend = onEnd;
    speechSynthesis.speak(utter);
  };

  const loop = () => {
    if (!activeRef.current) return;
    const line = HAWKER_LINES[idxRef.current % HAWKER_LINES.length];
    idxRef.current += 1;
    speak(line, () => { if (activeRef.current) setTimeout(loop, 300); });
  };

  const start = () => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    activeRef.current = true;
    setSpeaking(true);
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = loop;
    } else {
      loop();
    }
  };

  const stop = () => {
    activeRef.current = false;
    setSpeaking(false);
    speechSynthesis.cancel();
  };

  const toggle = () => (speaking ? stop() : start());

  useEffect(() => () => { activeRef.current = false; speechSynthesis.cancel(); }, []);
  return { speaking, toggle };
}

// ── 主页 ─────────────────────────────────────────────
const STORAGE_KEY = 'resume-theme';

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeId>('vendor');
  const { speaking, toggle } = useHawker();

  // 从 localStorage 读取上次选择
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) setTheme(saved);
  }, []);

  const switchTheme = (id: ThemeId) => {
    setTheme(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const sharedProps = { speaking, onToggle: toggle };

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">

      {/* ── 主题内容区 ── */}
      {theme === 'vendor' && <ThemeVendor {...sharedProps} />}
      {theme === 'crt'    && <ThemeCRT    {...sharedProps} />}
      {theme === 'neon'   && <ThemeNeon   {...sharedProps} />}

      {/* ── 悬浮主题切换器 ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 backdrop-blur-md bg-black/60 shadow-xl">
        <span className="text-white/40 text-xs mr-1 select-none">主题</span>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTheme(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={
              theme === t.id
                ? { background: t.activeBg, color: t.activeText }
                : { background: 'transparent', color: '#aaa', border: '1px solid #444' }
            }
          >
            <span
              className="w-2 h-2 rounded-full inline-block shrink-0"
              style={{ background: t.dot }}
            />
            {t.label}
          </button>
        ))}
      </div>

    </div>
  );
}
