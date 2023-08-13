import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyIcon } from "@radix-ui/react-icons";

type CodeProps = {
  children: any;
  language?: string;
};

export default function Code({ children, language }: CodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);  
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => {
      setCopied(false);
    }, 4000);
    return () => {
      clearTimeout(t);
    };
  }, [copied]);

  if (!children) return;
  return (
    <div className='w-fullmt-3 rounded-md mt-3 mb-2'>
      <div className='lang bg-stone-700 -mb-[16px] pb-3 z-50 py-1 px-4 rounded-md border-b-2 flex flex-row justify-between items-center h-12 pt-1 text-neutral-200'>
        <span className='text-sm'>{language}</span>
        <div
          className='flex flex-row items-center gap-2 cursor-pointer'
          onClick={handleCopy}
        >
          <span className='text-xs'>{copied ? "copied" : "copy"}</span>
          <CopyIcon className='h-4 w-4 cursor-pointer' />
        </div>
      </div>
      <div className='z-10'>
        <SyntaxHighlighter language={language ?? "other"} style={atomDark}>
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
