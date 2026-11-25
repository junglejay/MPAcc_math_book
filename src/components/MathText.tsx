import React, { useEffect, useMemo, useRef } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  latex,
  displayMode = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      katex.render(latex, el, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: false,
      });
    } catch {
      el.textContent = latex;
    }
  }, [latex, displayMode]);

  return (
    <span
      ref={containerRef}
      className={`${displayMode ? 'block w-full overflow-x-auto py-1' : 'inline-block align-baseline'} ${className}`}
    />
  );
};

interface Segment {
  type: 'text' | 'inline' | 'display';
  content: string;
}

function parseMathSegments(input: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  let textBuffer = '';

  while (i < input.length) {
    if (input[i] === '$' && input[i + 1] === '$') {
      const end = input.indexOf('$$', i + 2);
      if (end !== -1) {
        if (textBuffer) {
          segments.push({ type: 'text', content: textBuffer });
          textBuffer = '';
        }
        segments.push({ type: 'display', content: input.slice(i + 2, end).trim() });
        i = end + 2;
        continue;
      }
    }

    if (input[i] === '$') {
      const end = input.indexOf('$', i + 1);
      if (end !== -1 && end > i + 1) {
        if (textBuffer) {
          segments.push({ type: 'text', content: textBuffer });
          textBuffer = '';
        }
        segments.push({ type: 'inline', content: input.slice(i + 1, end).trim() });
        i = end + 1;
        continue;
      }
    }

    textBuffer += input[i];
    i += 1;
  }

  if (textBuffer) {
    segments.push({ type: 'text', content: textBuffer });
  }

  return segments;
}

interface MathTextProps {
  text: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => parseMathSegments(text), [text]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <React.Fragment key={idx}>{seg.content}</React.Fragment>;
        }
        if (seg.type === 'display') {
          return <MathFormula key={idx} latex={seg.content} displayMode={true} />;
        }
        return <MathFormula key={idx} latex={seg.content} displayMode={false} className="mx-0.5" />;
      })}
    </span>
  );
};
