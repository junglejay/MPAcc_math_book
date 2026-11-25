import React, { useState } from 'react';
import { Printer, CheckCircle2, BookOpen, Filter } from 'lucide-react';
import { HIGH_FREQUENCY_FORMULAS, MODULES_META } from '../data';
import { ModuleId } from '../types/formula';
import { MathFormula, MathText } from './MathText';

interface CheatSheetViewProps {
  masteredIds: Set<string>;
  onToggleMastered: (id: string) => void;
  onPrint: () => void;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({
  masteredIds,
  onToggleMastered,
  onPrint,
}) => {
  const [selectedModule, setSelectedModule] = useState<'all' | ModuleId>('all');
  const [expandAllExamples, setExpandAllExamples] = useState(true);

  const items =
    selectedModule === 'all'
      ? HIGH_FREQUENCY_FORMULAS
      : HIGH_FREQUENCY_FORMULAS.filter((f) => f.moduleId === selectedModule);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-blue-700">
              考前冲刺核心清单 · 高频必考精选 {HIGH_FREQUENCY_FORMULAS.length} 大核心类别
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              MPAcc 数学高频公式速记清单与真题分步实战
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              汇集管理类联考 199 数学近十年真题出现频次最高的公式类别，每类均提炼了极简记忆口诀、核心表达式与一道经典联考真题的标准三步拆解演示，助力考前快速背诵与秒杀提速。
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setExpandAllExamples((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{expandAllExamples ? '收起真题解析' : '展开全部真题解析'}</span>
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-medium text-white hover:bg-blue-800 whitespace-nowrap shrink-0 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>打印 / 导出 PDF 清单</span>
            </button>
          </div>
        </div>

        {/* Interactive Segmented Module Filter */}
        <div className="no-print mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 mr-1">
            <Filter className="h-3.5 w-3.5" />
            模块筛选：
          </span>
          <button
            type="button"
            onClick={() => setSelectedModule('all')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedModule === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            全部高频 ({HIGH_FREQUENCY_FORMULAS.length})
          </button>
          {MODULES_META.map((mod) => {
            const count = HIGH_FREQUENCY_FORMULAS.filter((f) => f.moduleId === mod.id).length;
            if (count === 0) return null;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedModule(mod.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  selectedModule === mod.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {mod.shortName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Rapid Memorization Cards + Classic Exam Walkthroughs */}
      <div className="space-y-5">
        {items.map((item, idx) => {
          const isMastered = masteredIds.has(item.id);
          return (
            <section
              key={item.id}
              className="print-break-avoid rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-blue-700 tabular-nums">
                      速记 {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.moduleName}</span>
                    <span aria-hidden="true">·</span>
                    <span>考点 {item.code}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    <MathText text={item.title} />
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleMastered(item.id)}
                  className={`no-print inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isMastered
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className={`h-3.5 w-3.5 ${isMastered ? 'text-emerald-600' : ''}`} />
                  <span>{isMastered ? '已背熟' : '标为已背熟'}</span>
                </button>
              </div>

              {/* 2-Column Split: Left = Rapid Formula Cheat Sheet, Right = Classic Exam Problem & Steps */}
              <div className="mt-5 grid gap-6 lg:grid-cols-12">
                {/* Left Column: Formulas + Mnemonic */}
                <div className={expandAllExamples ? 'lg:col-span-6 space-y-3' : 'lg:col-span-12 space-y-3'}>
                  {item.mnemonic && (
                    <div className="rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs leading-relaxed text-slate-800">
                      <span className="font-semibold text-blue-800">速记口诀：</span>
                      <MathText text={item.mnemonic} />
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {item.formulas.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5"
                      >
                        <div className="text-xs font-medium text-slate-500">
                          <MathText text={f.label} />
                        </div>
                        <div className="mt-1 text-slate-900">
                          <MathFormula latex={f.latex} displayMode={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Classic Exam Walkthrough */}
                {expandAllExamples && (
                  <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">
                        经典真题实战 · {item.example.source}
                      </span>
                      <span className="font-semibold text-blue-700">
                        答案：<MathText text={item.example.answer} />
                      </span>
                    </div>

                    <div className="mt-2.5 text-sm font-medium leading-relaxed text-slate-900 whitespace-pre-line">
                      <MathText text={item.example.question} />
                    </div>

                    {item.example.options && (
                      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                        {item.example.options.map((opt, oIdx) => (
                          <span key={oIdx}>
                            <MathText text={opt} />
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-3.5">
                      {item.example.steps.map((step, sIdx) => (
                        <div key={sIdx} className="text-xs leading-relaxed">
                          <div className="font-semibold text-slate-900">{step.stepTitle}</div>
                          <div className="mt-0.5 text-slate-700 whitespace-pre-line">
                            <MathText text={step.content} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3.5 rounded-lg bg-white border border-slate-200 px-3.5 py-2.5 text-xs text-slate-700">
                      <span className="font-semibold text-blue-800">真题破题点：</span>
                      <MathText text={item.example.keyTakeaway} />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
