'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SKILLS, STORY_ERRORS } from './shared';

interface Props {
  speaking: boolean;
  onToggle: () => void;
}

export default function ThemeCRT({ speaking, onToggle }: Props) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink((v) => !v), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex-1 min-h-full text-white font-mono relative overflow-hidden"
      style={{ background: '#000', animation: 'crt-flicker 6s step-end infinite' }}
    >
      {/* 扫描线叠层 */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* 滚动横幅 */}
      <div className="border-b border-white/30 py-2 overflow-hidden whitespace-nowrap text-xs tracking-widest text-white/60">
        <span className="inline-block animate-[marquee_20s_linear_infinite]">
          ░░ 紧急广播 ░░ AI席卷IT行业 ░░ 前端工程师清仓处理 ░░ 数量有限 ░░ 先到先得 ░░ 错过再等三年 ░░ 紧急广播 ░░
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-8">

        {/* 音效按钮 */}
        <button
          onClick={onToggle}
          className="w-full py-2 border border-white/40 text-white/60 hover:text-white hover:border-white text-xs tracking-widest transition-all"
          style={speaking ? { animation: 'crt-blink 1s step-end infinite' } : {}}
        >
          {speaking ? '[ █ 关闭广播 ]' : '[ ▶ 开启叫卖大喇叭 ]'}
        </button>

        {/* 闪烁警告 */}
        <div
          className="text-xs tracking-[0.4em] text-white/50 uppercase"
          style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
        >
          ⚠ WARNING ⚠ &nbsp; 老板们 注意了 &nbsp; ⚠ WARNING ⚠
        </div>

        {/* 主标题 */}
        <div
          className="border border-white/20 p-6"
          style={{ animation: 'crt-glitch 5s step-end infinite' }}
        >
          <h1
            className="text-4xl font-black leading-snug uppercase tracking-tight"
            style={{ animation: 'crt-glitch-shadow 5s step-end infinite' }}
          >
            AI 把整个<br />
            前端团队<br />
            <span className="text-white/40 line-through text-2xl">搞没了</span><br />
            <span className="text-white text-3xl">但我还活着</span>
          </h1>
          <p className="mt-4 text-white/40 text-xs tracking-widest">
            // 说明什么？说明我有 AI 替代不了的价值
          </p>
        </div>

        {/* 故事 — 终端日志 */}
        <div className="border border-white/20 p-5 text-left text-sm space-y-2 text-white/80">
          <p className="text-white/40 text-xs mb-3">$ cat incident_report.log</p>
          <p><span className="text-white/40">[2025-03]</span> 老板宣布：前端团队解散，AI全包，省下的钱买茅台。</p>
          {STORY_ERRORS.map((e, i) => (
            <p key={i}>
              <span className="text-white/40">[ERROR]&nbsp;&nbsp;</span>{e}
            </p>
          ))}
          <p className="pt-2 border-t border-white/10 text-white">
            <span className="text-white/40">[结论]&nbsp;</span>AI会写代码，但不会理解业务，不会背锅，不会凌晨3点上线。
          </p>
          <p className="text-white font-bold">所以 ── 还是得招人。</p>
        </div>

        {/* 价格对比 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="border border-white/10 p-4 text-white/20">
            <div className="text-xs tracking-widest mb-1">MARKET PRICE</div>
            <div className="text-3xl font-black line-through">¥30W</div>
            <div className="text-xs mt-1">/ 年</div>
          </div>
          <div className="border border-white p-4" style={{ animation: 'crt-flicker 3s step-end infinite' }}>
            <div className="text-xs tracking-widest mb-1">NOW</div>
            <div className="text-3xl font-black">骨折价</div>
            <div className="text-xs mt-1 text-white/60">// 不讲武德</div>
          </div>
        </div>

        {/* 技能清单 */}
        <div className="border border-white/20 text-left text-sm">
          <div className="px-4 py-2 border-b border-white/20 text-xs tracking-widest text-white/40">
            $ ls -la ./skills/
          </div>
          {SKILLS.map((s) => (
            <div key={s.name} className="flex items-center justify-between px-4 py-2 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
              <span className="font-black text-white">{s.name}</span>
              <span className="text-white/40 text-xs">{s.desc}</span>
            </div>
          ))}
        </div>

        {/* 紧迫感 */}
        <div className="border border-white/20 p-4 text-xs space-y-2 text-white/60 tracking-wide">
          <p>▸ 受AI冲击，行业裁员，<span className="text-white">优质前端正在加速消失</span></p>
          <p>▸ Web3 + 可视化 + 全栈复合型选手，<span className="text-white">市面上已不多</span></p>
          <p>▸ 先到先得。<span className="text-white">不要等。</span></p>
        </div>

        {/* CTA */}
        <div className="space-y-3 pb-20">
          <Link
            href="/docs"
            className="block w-full border border-white py-4 font-black text-lg tracking-widest hover:bg-white hover:text-black transition-all"
            style={{ animation: 'crt-flicker 8s step-end infinite' }}
          >
            [ 查看作品集 / 技术文档 ]
          </Link>
          <p className="text-white/30 text-xs tracking-widest">// 老板，看完合适请联系我，机不可失</p>
        </div>

      </div>
    </div>
  );
}
