'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SKILLS, STORY_ERRORS } from './shared';

interface Props {
  speaking: boolean;
  onToggle: () => void;
}

const TAG_COLORS: Record<string, string> = {
  HOT: '#ff0066', NEW: '#00ff99', FREE: '#ffff00',
  VIP: '#00eeff', 独家: '#ff0066', 稀缺: '#00ff99', 无敌: '#ffff00',
};

export default function ThemeNeon({ speaking, onToggle }: Props) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex-1 min-h-full text-white"
      style={{ background: '#000', animation: 'neon-screen-flicker 7s step-end infinite' }}
    >
      {/* 顶部跑马灯 */}
      <div className="py-1 overflow-hidden whitespace-nowrap text-xs font-black" style={{ background: '#ff0066' }}>
        <span className="inline-block animate-[marquee_15s_linear_infinite]">
          ★★★ 限时特供！前端工程师骨折大甩卖！AI时代最强复合型选手！React Vue Web3 全套！先到先得！★★★&nbsp;&nbsp;
          ★★★ 限时特供！前端工程师骨折大甩卖！AI时代最强复合型选手！React Vue Web3 全套！先到先得！★★★
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-3 py-6 space-y-5">

        {/* 音效按钮 */}
        <button
          onClick={onToggle}
          className="w-full py-3 font-black text-base tracking-widest transition-all"
          style={{
            background: '#000', color: '#ff0066',
            border: '2px solid #ff0066',
            textShadow: '0 0 8px #ff0066',
            animation: speaking ? 'none' : 'neon-pulse 1.5s ease-in-out infinite',
          }}
        >
          {speaking ? '🔇 关闭叫卖广播' : '📣 点击开启叫卖大喇叭 ←免费←'}
        </button>

        {/* 主 Banner */}
        <div
          className="p-5 text-center"
          style={{ background: '#0a0a0a', border: '3px solid #ff0066', animation: 'neon-border-cycle 3s linear infinite' }}
        >
          <div
            className="inline-block text-xs font-black px-2 py-1 mb-3"
            style={{ background: '#ff0066', color: '#000', opacity: blink ? 1 : 0 }}
          >
            ⚡ 紧急通知 ⚡
          </div>
          <h1 className="text-4xl font-black leading-tight" style={{ animation: 'neon-text-glow 3s linear infinite' }}>
            AI把整个前端团队<br />搞没了！！
          </h1>
          <div className="mt-3 text-2xl font-black" style={{ color: '#ffff00', textShadow: '0 0 10px #ffff00' }}>
            但我还活着！！
          </div>
          <div className="mt-2 text-xs" style={{ color: '#666' }}>
            说明什么？说明我有 AI 替代不了的价值
          </div>
        </div>

        {/* 闪烁副标 */}
        <div
          className="text-center py-2 font-black text-sm"
          style={{
            color: blink ? '#00ff99' : '#ffff00',
            textShadow: blink ? '0 0 10px #00ff99' : '0 0 10px #ffff00',
            transition: 'all 0.1s',
          }}
        >
          ★ 原价30W年薪 → 现在骨折清仓 ★ 数量有限 ★ 先到先得 ★
        </div>

        {/* 故事 */}
        <div className="p-4 text-sm space-y-2 text-left" style={{ background: '#0a0a0a', border: '1px solid #ff006644' }}>
          <div className="font-black mb-2" style={{ color: '#ff0066' }}>📖 事情经过（不看后悔）</div>
          <p style={{ color: '#ccc' }}>
            2025年，老板拍板：<span style={{ color: '#ffff00' }}>"前端团队解散！AI全包！省下的钱买茅台！"</span>
          </p>
          <p style={{ color: '#ff4444' }}>三个月后…</p>
          {STORY_ERRORS.map((e) => (
            <div key={e} className="flex gap-2 items-start" style={{ color: '#aaa' }}>
              <span style={{ color: '#ff0066' }}>✗</span><span>{e}</span>
            </div>
          ))}
          <p className="pt-2 font-black" style={{ color: '#00ff99' }}>
            结论：AI会写代码，但不会背锅，不会跟产品吵架，不会凌晨3点上线。还是得招人！
          </p>
        </div>

        {/* 技能清单 */}
        <div className="p-4" style={{ background: '#0a0a0a', border: '2px solid #00ff99', boxShadow: '0 0 12px #00ff9944' }}>
          <div className="text-center font-black text-base mb-3" style={{ color: '#00ff99', textShadow: '0 0 8px #00ff99' }}>
            🛒 技能清单 — 买不了吃亏！买不了上当！
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SKILLS.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-3 py-2 text-sm font-black" style={{ background: '#111', border: `1px solid ${TAG_COLORS[s.tag]}44` }}>
                <span style={{ color: '#fff' }}>{s.name}</span>
                <span className="text-xs px-1" style={{ background: TAG_COLORS[s.tag], color: '#000', animation: 'neon-blink 4s step-end infinite' }}>
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 价格对比 */}
        <div className="grid grid-cols-2 gap-3 text-center font-black">
          <div className="py-4" style={{ background: '#111', border: '1px solid #333' }}>
            <div className="text-xs mb-1" style={{ color: '#555' }}>行情价</div>
            <div className="text-3xl line-through" style={{ color: '#444' }}>¥30W</div>
            <div className="text-xs mt-1" style={{ color: '#333' }}>AI来了，没了</div>
          </div>
          <div className="py-4" style={{ background: '#0a0a0a', border: '2px solid #ffff00', boxShadow: '0 0 16px #ffff0066', animation: 'neon-blink 3s step-end infinite' }}>
            <div className="text-xs mb-1" style={{ color: '#ffff00' }}>限时清仓价</div>
            <div className="text-3xl" style={{ color: '#ffff00', textShadow: '0 0 10px #ffff00' }}>骨折价</div>
            <div className="text-xs mt-1" style={{ color: '#ffff00' }}>仅此一位</div>
          </div>
        </div>

        {/* 紧迫感 */}
        <div className="py-3 px-4 text-xs font-black space-y-1 text-center" style={{ background: '#ff006611', border: '1px solid #ff006644' }}>
          <div style={{ color: blink ? '#ff0066' : '#ff4488' }}>⚠ Web3 + 可视化 + 全栈复合型，市面已不多见</div>
          <div style={{ color: '#00ff99' }}>✔ 会用AI · 不怕AI · AI挖的坑我来填</div>
          <div style={{ color: '#ffff00' }}>⏰ 先到先得，错过再等三年！</div>
        </div>

        {/* CTA */}
        <div className="pb-20 space-y-3">
          <Link
            href="/docs"
            className="block w-full text-center py-4 font-black text-lg tracking-wider transition-all"
            style={{ background: '#ff0066', color: '#fff', textShadow: '0 0 8px #fff', boxShadow: '0 0 20px #ff006699', animation: 'neon-pulse 2s ease-in-out infinite' }}
          >
            ★ 免费查看作品集 · 立即进入 ★
          </Link>
          <div className="text-center text-xs" style={{ color: blink ? '#ff0066' : '#ff4488' }}>
            👆 老板点这里！合适的话赶紧联系我！机不可失！
          </div>
        </div>

      </div>
    </div>
  );
}
