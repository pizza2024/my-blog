import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as AllComponents from './components';
import { Mermaid } from './components/mermaid';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...AllComponents,
    code: ({ children, className, ...props }: any) => {
      // 检查是否是 mermaid 代码块
      if (className === 'language-mermaid' || (typeof children === 'string' && children.includes('sequenceDiagram') || children.includes('graph TD'))) {
        return <Mermaid chart={children} />;
      }
      // 否则使用默认的 code 组件
      return <code className={className} {...props}>{children}</code>;
    },
  };
}