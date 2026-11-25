import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  RotateCw,
  Shuffle,
} from 'lucide-react';
import { ALL_FORMULAS, MODULES_META } from '../data';
import { ModuleId } from '../types/formula';
import { MathFormula, MathText } from './MathText';

interface FlashcardQuizProps {
  masteredIds: Set<string>;
  onToggleMastered: (id: string) => void;
}

export const FlashcardQuiz: React.FC<FlashcardQuizProps> = ({
  masteredIds,
  onToggleMastered,
}) => {
  const [scope, setScope] = useState<'all' | 'high' | 'unmastered' | ModuleId>('high');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const deck = useMemo(() => {
    let list = ALL_FORMULAS;
    if (scope === 'high') {
      list = ALL_FORMULAS.filter((f) => f.frequency === '高频必考');
    } else if (scope === 'unmastered') {
      list = ALL_FORMULAS.filter((f) => !masteredIds.has(f.id));
    } else if (scope !== 'all') {
      list = ALL_FORMULAS.filter((f) => f.moduleId === scope);
    }

    if (shuffleSeed > 0) {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = (i * 7 + shuffleSeed * 13) % (i + 1);
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }
    return list;
  }, [scope, masteredIds, shuffleSeed]);

  const safeIdx = deck.length > 0 ? currentIndex % deck.length : 0;
  const current = deck[safeIdx];

  const handleNext = () => {
    setRevealed(false);
    setCurrentIndex((prev) => (deck.length > 0 ? (prev + 1) % deck.length : 0));
  };

  const handlePrev = () => {
    setRevealed(false);
    setCurrentIndex((prev) =>
      deck.length > 0 ? (prev - 1 + deck.length) % deck.length : 0
    );
  };

  const handleScopeChange = (nextScope: 'all' | 'high' | 'unmastered' | ModuleId) => {
    setScope(nextScope);
    setCurrentIndex(0);
    setRevealed(false);
  };

  return (
    <div className="space-y-6">
      {/* Scope Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-blue-700">
              主动回忆自测 · 强化公式瞬时提取速度
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              公式抽背自测卡片
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setShuffleSeed((s) => s + 1);
              setCurrentIndex(0);
              setRevealed(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0 transition-colors"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>打乱卡组顺序</span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {[
            { id: 'high' as const, label: '高频必考专练' },
            { id: 'unmastered' as const, label: '仅未掌握考点' },
            { id: 'all' as const, label: '全部考点' },
            ...MODULES_META.map((m) => ({ id: m.id, label: m.shortName })),
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleScopeChange(btn.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                scope === btn.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {!current ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h3 className="mt-3 text-lg font-bold text-slate-900">
            当前筛选范围下的考点已全部掌握
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            你可以切换到“高频必考专练”或“全部考点”继续进行巩固复习。
          </p>
          <button
            type="button"
            onClick={() => handleScopeChange('high')}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-medium text-white hover:bg-blue-800"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>切换回高频必考专练</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="text-xs text-slate-500 font-mono tabular-nums">
              第 {safeIdx + 1} / {deck.length} 题 · {current.moduleName} · 考点 {current.code}
            </div>
            <button
              type="button"
              onClick={() => onToggleMastered(current.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                masteredIds.has(current.id)
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2
                className={`h-3.5 w-3.5 ${
                  masteredIds.has(current.id) ? 'text-emerald-600' : ''
                }`}
              />
              <span>{masteredIds.has(current.id) ? '已掌握' : '标记为已掌握'}</span>
            </button>
          </div>

          {/* Prompt */}
          <div className="py-6">
            <div className="text-xs font-medium text-slate-500">请回忆以下考点的完整公式、取等/适用条件及解题口诀：</div>
            <h3 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
              <MathText text={current.title} />
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              <MathText text={current.summary} />
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setRevealed((r) => !r)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
              >
                {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{revealed ? '隐藏公式与解析' : '揭晓公式与真题应用'}</span>
              </button>
            </div>
          </div>

          {/* Revealed Answer */}
          {revealed && (
            <div className="space-y-4 border-t border-slate-100 pt-6">
              {current.mnemonic && (
                <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  <span className="font-semibold text-blue-800">速记口诀：</span>
                  <MathText text={current.mnemonic} />
                </div>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                {current.formulas.map((f, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="text-xs font-semibold text-slate-700">
                      <MathText text={f.label} />
                    </div>
                    <div className="mt-1.5 text-slate-900">
                      <MathFormula latex={f.latex} displayMode={true} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-700">
                <div className="font-semibold text-slate-900">
                  经典真题验证（{current.example.source}）：
                </div>
                <div className="mt-1.5 font-medium text-slate-900">
                  <MathText text={current.example.question} />
                </div>
                <div className="mt-2 font-semibold text-blue-700">
                  答案：<MathText text={current.example.answer} />
                </div>
                <div className="mt-1 text-slate-600">
                  <MathText text={current.example.keyTakeaway} />
                </div>
              </div>
            </div>
          )}

          {/* Card Navigation */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>上一考点</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              <span>下一考点</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
