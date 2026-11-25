import React, { useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { FormulaEntry } from '../types/formula';
import { MathFormula, MathText } from './MathText';

interface FormulaCardProps {
  entry: FormulaEntry;
  isMastered: boolean;
  isBookmarked: boolean;
  onToggleMastered: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  defaultShowExample?: boolean;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  entry,
  isMastered,
  isBookmarked,
  onToggleMastered,
  onToggleBookmark,
  defaultShowExample = false,
}) => {
  const [showExample, setShowExample] = useState(defaultShowExample);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyLatex = (latex: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(latex).catch(() => {});
    }
    setCopiedIdx(idx);
    window.setTimeout(() => setCopiedIdx(null), 1600);
  };

  return (
    <article
      id={`formula-${entry.id}`}
      className="print-break-avoid rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300"
    >
      {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-mono font-medium text-slate-700 tabular-nums">
              考点 {entry.code}
            </span>
            <span aria-hidden="true">·</span>
            <span>{entry.moduleName}</span>
            <span aria-hidden="true">·</span>
            <span>{entry.chapter}</span>
            <span aria-hidden="true">·</span>
            <span
              className={
                entry.frequency === '高频必考'
                  ? 'font-semibold text-blue-700'
                  : 'font-medium text-slate-600'
              }
            >
              {entry.frequency}
            </span>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">
            <MathText text={entry.title} />
          </h3>
        </div>

        {/* Action Controls (no-print) */}
        <div className="no-print flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleBookmark(entry.id)}
            aria-label={isBookmarked ? '取消收藏公式' : '收藏公式'}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
              isBookmarked
                ? 'border-amber-200 bg-amber-50 text-amber-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{isBookmarked ? '已收藏' : '收藏'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleMastered(entry.id)}
            aria-label={isMastered ? '取消已掌握标记' : '标记为已掌握'}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
              isMastered
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className={`h-3.5 w-3.5 ${isMastered ? 'text-emerald-600' : ''}`} />
            <span>{isMastered ? '已掌握' : '标记掌握'}</span>
          </button>
        </div>
      </div>

      {/* Summary & Mnemonic */}
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        <MathText text={entry.summary} />
      </p>

      {entry.mnemonic && (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
          <div>
            <span className="font-semibold text-slate-900">考场速记口诀：</span>
            <MathText text={entry.mnemonic} />
          </div>
        </div>
      )}

      {/* Core Formulas Grid */}
      <div className="mt-5 space-y-3">
        {entry.formulas.map((f, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-slate-200/80 bg-slate-50/70 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700">
                <MathText text={f.label} />
              </span>
              <button
                type="button"
                onClick={() => handleCopyLatex(f.latex, idx)}
                className="no-print inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
                title="复制 LaTeX 公式源码"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span className="text-emerald-700">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>复制 LaTeX</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-1.5 text-slate-900">
              <MathFormula latex={f.latex} displayMode={true} />
            </div>
            {f.note && (
              <p className="mt-1.5 text-xs text-slate-500">
                <MathText text={f.note} />
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Applicability Conditions & Exam Traps */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h4 className="text-xs font-semibold tracking-wide text-slate-900">
            前提条件与变形要点
          </h4>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
            {entry.conditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 font-mono text-slate-400 select-none">•</span>
                <span>
                  <MathText text={cond} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200/90 bg-amber-50/40 p-4">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
            <span>高频易错陷阱警示</span>
          </h4>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-amber-950/85">
            {entry.traps.map((trap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 font-mono text-amber-600 select-none">!</span>
                <span>
                  <MathText text={trap} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Worked Exam Example Toggle / Display */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => setShowExample((prev) => !prev)}
          className="no-print flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-700" aria-hidden="true" />
            <span>经典真题例题与分步应用解析（{entry.example.source}）</span>
          </span>
          {showExample ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
          )}
        </button>

        {showExample && (
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>{entry.example.source}</span>
              <span className="font-semibold text-blue-700">
                标准答案：<MathText text={entry.example.answer} />
              </span>
            </div>

            <div className="mt-2.5 text-sm font-medium leading-relaxed text-slate-900 whitespace-pre-line">
              <MathText text={entry.example.question} />
            </div>

            {entry.example.options && (
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {entry.example.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
                  >
                    <MathText text={opt} />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
              {entry.example.steps.map((step, sIdx) => (
                <div key={sIdx} className="text-sm">
                  <div className="font-semibold text-slate-800">{step.stepTitle}</div>
                  <div className="mt-1 leading-relaxed text-slate-700 whitespace-pre-line">
                    <MathText text={step.content} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-blue-50/70 px-4 py-3 text-xs leading-relaxed text-blue-950">
              <span className="font-semibold">解题规律总结：</span>
              <MathText text={entry.example.keyTakeaway} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
