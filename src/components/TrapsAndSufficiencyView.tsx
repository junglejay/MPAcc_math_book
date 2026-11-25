import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Table2 } from 'lucide-react';
import { EXAM_TRAPS_DATA, REFERENCE_TABLES } from '../data';
import { MathFormula, MathText } from './MathText';

export const TrapsAndSufficiencyView: React.FC = () => {
  const sufficiencyOptions = [
    {
      code: 'A',
      cond1: true,
      cond2: false,
      joint: '无需联合',
      desc: '条件（1）充分，但条件（2）不充分。',
    },
    {
      code: 'B',
      cond1: false,
      cond2: true,
      joint: '无需联合',
      desc: '条件（2）充分，但条件（1）不充分。',
    },
    {
      code: 'C',
      cond1: false,
      cond2: false,
      joint: '联合后充分',
      desc: '条件（1）和（2）单独都不充分，但条件（1）和条件（2）联合起来充分。',
    },
    {
      code: 'D',
      cond1: true,
      cond2: true,
      joint: '无需联合',
      desc: '条件（1）充分，条件（2）也充分。',
    },
    {
      code: 'E',
      cond1: false,
      cond2: false,
      joint: '联合仍不充分',
      desc: '条件（1）和（2）单独都不充分，条件（1）和条件（2）联合起来也不充分。',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section 1: Data Sufficiency Decision Matrix */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-medium text-blue-700">
            管理类联考数学特有题型（第 16-25 题，共 30 分）
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            条件充分性判断 A-E 选项判定规范
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            充分性判断的核心逻辑是“条件 $\Rightarrow$ 结论”（即条件解集 $\subseteq$ 结论解集），切忌由结论反推条件！
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-3 pr-4">选项</th>
                <th className="py-3 px-4">条件 (1) 单独</th>
                <th className="py-3 px-4">条件 (2) 单独</th>
                <th className="py-3 px-4">(1) + (2) 联合</th>
                <th className="py-3 pl-4">考纲标准表述</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sufficiencyOptions.map((row) => (
                <tr key={row.code} className="hover:bg-slate-50/70">
                  <td className="py-3.5 pr-4 font-mono text-base font-bold text-blue-700">
                    {row.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        row.cond1 ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {row.cond1 ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>充分</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5 text-slate-400" />
                          <span>不充分</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        row.cond2 ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {row.cond2 ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>充分</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5 text-slate-400" />
                          <span>不充分</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700">{row.joint}</td>
                  <td className="py-3.5 pl-4 text-xs text-slate-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Top 10 Deadly Traps */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            MPAcc 数学考场十大高频易错陷阱清单
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            公式记对但仍丢分，90% 源自忽略了公式背后的前提约束或特例情况。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {EXAM_TRAPS_DATA.map((trap, idx) => (
            <div
              key={trap.id}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-semibold text-amber-700 tabular-nums">
                    陷阱 {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{trap.category}</span>
                </div>
                <h3 className="mt-1 flex items-center gap-1.5 text-base font-bold text-slate-900">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>
                    <MathText text={trap.title} />
                  </span>
                </h3>

                <div className="mt-3 space-y-2 text-xs leading-relaxed">
                  <div className="rounded-lg bg-red-50/70 px-3 py-2 text-red-950">
                    <span className="font-semibold">常见错误：</span>
                    <MathText text={trap.wrongThinking} />
                  </div>
                  <div className="rounded-lg bg-emerald-50/70 px-3 py-2 text-emerald-950">
                    <span className="font-semibold">正确规避：</span>
                    <MathText text={trap.correctRule} />
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-2.5 text-slate-900">
                <MathFormula latex={trap.formulaLatex} displayMode={true} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Essential Reference Tables */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Table2 className="h-5 w-5 text-blue-700" />
          <h2 className="text-xl font-bold text-slate-900">考场必备常用数值速查表</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {REFERENCE_TABLES.map((tbl, tIdx) => (
            <div key={tIdx} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900">{tbl.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{tbl.subtitle}</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      {tbl.columns.map((col, cIdx) => (
                        <th key={cIdx} className="py-2 pr-3 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                    {tbl.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="py-2 pr-3 text-slate-800">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
