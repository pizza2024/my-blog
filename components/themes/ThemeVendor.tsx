'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SKILLS, STORY_ERRORS } from './shared';

interface Props {
  speaking: boolean;
  onToggle: () => void;
}

export default function ThemeVendor({ speaking, onToggle }: Props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex-1 bg-red-600 text-white min-h-full">
      {/* 滚动横幅 */}
      <div className="bg-yellow-400 text-red-700 font-black py-2 overflow-hidden whitespace-nowrap text-sm">
        <span className="inline-block animate-[marquee_18s_linear_infinite]">
          🔥 紧急！AI冲击IT行业！优质前端工程师清仓大甩卖！&nbsp;&nbsp;&nbsp;
          原价三十万年薪，现在骨折出售！&nbsp;&nbsp;&nbsp;
          数量有限，先到先得！错过再等三年！&nbsp;&nbsp;&nbsp;
          🔥 紧急！AI冲击IT行业！优质前端工程师清仓大甩卖！
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-6">

        {/* 音效开关 */}
        <button
          onClick={onToggle}
          className={`w-full py-3 rounded border-4 font-black text-lg transition-all ${
            speaking
              ? 'bg-gray-800 border-gray-500 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-red-600 border-yellow-400 hover:bg-yellow-50 animate-bounce'
          }`}
        >
          {speaking ? '🔇 关闭叫卖大喇叭' : '📣 开启叫卖大喇叭（点我！）'}
        </button>

        {/* 闪烁警告 */}
        <div
          className="text-yellow-300 text-lg font-black tracking-widest transition-opacity"
          style={{ opacity: visible ? 1 : 0 }}
        >
          ⚠️⚠️⚠️ 老板们！注意了！⚠️⚠️⚠️
        </div>

        {/* 主标题 */}
        <div className="border-4 border-yellow-400 p-4 bg-red-700 rounded">
          <h1 className="text-4xl font-black leading-tight">
            AI把我们公司<br />
            <span className="text-yellow-300">整个前端团队搞没了</span><br />
            <span className="text-2xl">但我还活着！！</span>
          </h1>
          <p className="mt-2 text-red-200 text-sm">（说明什么？说明我有AI替代不了的价值！）</p>
        </div>

        {/* 悲情故事 */}
        <div className="bg-white text-gray-800 rounded p-5 text-left space-y-2 text-sm leading-relaxed border-4 border-yellow-400">
          <p className="font-black text-base text-red-600">📖 事情是这样的……</p>
          <p>2025年，大模型横空出世，老板拍板：<strong>"行了！前端团队解散！AI全包了！省下的钱买茅台！"</strong></p>
          <p>三个月后……</p>
          <ul className="space-y-1 pl-2">
            {STORY_ERRORS.map((e) => <li key={e}>❌ {e}</li>)}
          </ul>
          <p className="font-black text-red-600 mt-2">老板欲哭无泪，这才醒悟：</p>
          <p><strong>AI会写代码，但它不会理解业务！不会跟产品经理吵架！不会在凌晨3点背锅！不会处理链上交易异常！</strong></p>
          <p className="text-center font-black text-lg text-red-700 mt-2">所以，还是得招人！！</p>
        </div>

        {/* 价格对比 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 rounded p-4 opacity-60">
            <div className="text-xs text-gray-400 line-through">往年行情价</div>
            <div className="text-2xl font-black line-through text-gray-400">¥ 30W / 年</div>
            <div className="text-xs text-gray-400">那时候前端很值钱</div>
          </div>
          <div className="bg-yellow-400 text-red-700 rounded p-4 border-4 border-white animate-pulse">
            <div className="text-xs font-black">👇 AI冲击后清仓价</div>
            <div className="text-3xl font-black">骨折价！</div>
            <div className="text-xs font-black">不讲武德，抓紧招！</div>
          </div>
        </div>

        {/* 技能清单 */}
        <div className="border-4 border-yellow-400 rounded p-4 bg-red-700">
          <div className="text-yellow-300 font-black text-lg mb-3">🛒 技能清单（价值百万，买不了吃亏）</div>
          <div className="grid grid-cols-1 gap-2">
            {SKILLS.map((s) => (
              <div key={s.name} className="flex items-center justify-between bg-white text-gray-800 rounded px-3 py-2 text-sm">
                <span className="font-black text-red-600">{s.name}</span>
                <span className="text-gray-500 text-xs">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 紧迫感 */}
        <div className="bg-yellow-400 text-red-700 rounded p-4 font-black space-y-1 text-sm">
          <p>📉 受AI冲击，行业裁员，<strong>优质前端正在加速消失</strong></p>
          <p>🚨 会Web3 + 可视化 + 全栈的复合型选手，<strong>市面上已经不多了</strong></p>
          <p>⏰ 先到先得，错过就没了，不要等！</p>
        </div>

        {/* CTA */}
        <div className="space-y-3 pb-20">
          <Link
            href="/docs"
            className="block w-full bg-yellow-400 text-red-700 font-black text-xl py-4 rounded border-4 border-white hover:bg-yellow-300 transition-colors"
          >
            👀 查看作品集 / 技术文档
          </Link>
          <p className="text-yellow-200 text-xs">（老板，看完觉得合适，赶紧联系我，机不可失！）</p>
        </div>

      </div>
    </div>
  );
}
