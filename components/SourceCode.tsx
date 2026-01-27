import { readFileSync } from 'fs';
import { join } from 'path';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

interface SourceCodeProps {
  filePath: string;
  lang?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function SourceCode({ 
  filePath, 
  lang = 'tsx', 
  title,
  showLineNumbers = true 
}: SourceCodeProps) {
  // 读取文件内容
  const fullPath = join(process.cwd(), filePath);
  const code = readFileSync(fullPath, 'utf-8');
  
  return (
    <DynamicCodeBlock
      lang={lang}
      code={code}
      codeblock={{
        'data-line-numbers': showLineNumbers,
        'data-line-numbers-start': 1,
        title: title || filePath,
      }}
    />
  );
}
