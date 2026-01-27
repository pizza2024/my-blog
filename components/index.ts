'use client';

// 统一导出所有组件
// 添加新组件时，只需在此文件中添加一行导出即可

export { default as Child } from './Child';
export { default as Helloworld } from './helloworld';
export { default as MaskCode } from './MaskCode';
export { default as Parent } from './Parent';
export { default as RequestPool } from './RequestPool';
// export { default as Search } from './search';

// 注意: SourceCode 是服务器端组件，不能通过这个 'use client' 文件导出
// 请在需要时直接 import { SourceCode } from '@/components/SourceCode'

// AI 相关组件
export { 
  LLMCopyButton, 
  ViewOptions, 
  // default as PageActions 
} from './ai/page-actions';

// Fumadocs UI 常用组件 - 重新导出以便在 MDX 中直接使用
export { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
export { Card } from 'fumadocs-ui/components/card';
