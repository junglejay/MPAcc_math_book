import React, { useMemo, useState } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { MathFormula, MathText } from './MathText';

type LabMode = 'parabola' | 'absvalue' | 'circleline' | 'mixture';

export const InteractiveLab: React.FC = () => {
  const [mode, setMode] = useState<LabMode>('parabola');

  // 1. Parabola state
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  // 2. Absolute value state: |x - p1| + |x - p2| + |x - p3|
  const [p1, setP1] = useState(-2);
  const [p2, setP2] = useState(1);
  const [p3, setP3] = useState(4);
  const [testX, setTestX] = useState(1);

  // 3. Circle & Line state: (x - cx)^2 + (y - cy)^2 = r^2, line: 3x + 4y + lineC = 0
  const [cx, setCx] = useState(1);
  const [cy, setCy] = useState(-1);
  const [radius, setRadius] = useState(3);
  const [lineC, setLineC] = useState(-4);

  // 4. Mixture dilution state: C0 * (1 - out/vol)^steps
  const [initConc, setInitConc] = useState(40);
  const [totalVol, setTotalVol] = useState(500);
  const [pourOut, setPourOut] = useState(100);
  const [diluteSteps, setDiluteSteps] = useState(3);

  const resetCurrent = () => {
    if (mode === 'parabola') {
      setA(1);
      setB(-2);
      setC(-3);
    } else if (mode === 'absvalue') {
      setP1(-2);
      setP2(1);
      setP3(4);
      setTestX(1);
    } else if (mode === 'circleline') {
      setCx(1);
      setCy(-1);
      setRadius(3);
      setLineC(-4);
    } else {
      setInitConc(40);
      setTotalVol(500);
      setPourOut(100);
      setDiluteSteps(3);
    }
  };

  // Calculations for Parabola
  const parabolaStats = useMemo(() => {
    const safeA = a === 0 ? 0.5 : a;
    const delta = b * b - 4 * safeA * c;
    const vx = -b / (2 * safeA);
    const vy = (4 * safeA * c - b * b) / (4 * safeA);
    const hasRoots = delta >= 0;
    const r1 = hasRoots ? (-b - Math.sqrt(delta)) / (2 * safeA) : null;
    const r2 = hasRoots ? (-b + Math.sqrt(delta)) / (2 * safeA) : null;
    const sumRoots = -b / safeA;
    const prodRoots = c / safeA;
    return { safeA, delta, vx, vy, hasRoots, r1, r2, sumRoots, prodRoots };
  }, [a, b, c]);

  // Calculations for Absolute Value
  const absStats = useMemo(() => {
    const sorted = [p1, p2, p3].sort((x, y) => x - y);
    const median = sorted[1];
    const minVal = Math.abs(median - p1) + Math.abs(median - p2) + Math.abs(median - p3);
    const currentVal = Math.abs(testX - p1) + Math.abs(testX - p2) + Math.abs(testX - p3);
    return { sorted, median, minVal, currentVal };
  }, [p1, p2, p3, testX]);

  // Calculations for Circle & Line (3x + 4y + lineC = 0)
  const circleStats = useMemo(() => {
    const A = 3;
    const B = 4;
    const dist = Math.abs(A * cx + B * cy + lineC) / Math.sqrt(A * A + B * B);
    let relation: 'secant' | 'tangent' | 'disjoint' = 'disjoint';
    if (Math.abs(dist - radius) < 0.05) relation = 'tangent';
    else if (dist < radius) relation = 'secant';
    const chord = dist < radius ? 2 * Math.sqrt(Math.max(0, radius * radius - dist * dist)) : 0;
    return { dist, relation, chord };
  }, [cx, cy, radius, lineC]);

  // Calculations for Mixture
  const mixStats = useMemo(() => {
    const ratio = 1 - pourOut / totalVol;
    const history = Array.from({ length: diluteSteps + 1 }, (_, i) => ({
      step: i,
      conc: initConc * Math.pow(ratio, i),
      solute: totalVol * (initConc / 100) * Math.pow(ratio, i),
    }));
    return { ratio, history, finalConc: history[history.length - 1].conc };
  }, [initConc, totalVol, pourOut, diluteSteps]);

  // SVG coordinate helper [-6, 6] -> [0, 420]
  const toSvgX = (x: number) => ((x + 6) / 12) * 420;
  const toSvgY = (y: number) => ((6 - y) / 12) * 320;

  return (
    <div className="space-y-6">
      {/* Header + Segmented Mode Selector */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-blue-700">
              数形结合动态推演 · MPAcc 四大高频模型交互实验台
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              核心公式互动推演实验室
            </h2>
          </div>

          <button
            type="button"
            onClick={resetCurrent}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>重置参数</span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {[
            { id: 'parabola' as LabMode, label: '01. 二次函数与韦达定理' },
            { id: 'absvalue' as LabMode, label: '02. 绝对值平底锅最值' },
            { id: 'circleline' as LabMode, label: '03. 直线与圆弦长位置' },
            { id: 'mixture' as LabMode, label: '04. 多次稀释浓度推演' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                mode === tab.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout (Left Visual Stage 7 cols, Right Parameter Deck 5 cols) */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Zone: Interactive Visual Stage */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
          {mode === 'parabola' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="text-sm font-semibold text-slate-900">
                  <MathText
                    text={`抛物线实时图像：$f(x) = ${parabolaStats.safeA}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}$`}
                  />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    parabolaStats.hasRoots ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {parabolaStats.hasRoots ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Δ ≥ 0 · 有实根</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Δ &lt; 0 · 无实根</span>
                    </>
                  )}
                </span>
              </div>

              <div className="my-4 flex justify-center">
                <svg
                  viewBox="0 0 420 320"
                  className="w-full max-w-[540px] rounded-lg border border-slate-200 bg-slate-50"
                  aria-label="二次函数坐标图"
                >
                  {/* Grid lines */}
                  {[-4, -2, 0, 2, 4].map((v) => (
                    <React.Fragment key={v}>
                      <line
                        x1={toSvgX(v)}
                        y1={0}
                        x2={toSvgX(v)}
                        y2={320}
                        stroke={v === 0 ? '#64748b' : '#e2e8f0'}
                        strokeWidth={v === 0 ? 1.5 : 1}
                      />
                      <line
                        x1={0}
                        y1={toSvgY(v)}
                        x2={420}
                        y2={toSvgY(v)}
                        stroke={v === 0 ? '#64748b' : '#e2e8f0'}
                        strokeWidth={v === 0 ? 1.5 : 1}
                      />
                    </React.Fragment>
                  ))}

                  {/* Symmetry axis */}
                  <line
                    x1={toSvgX(parabolaStats.vx)}
                    y1={0}
                    x2={toSvgX(parabolaStats.vx)}
                    y2={320}
                    stroke="#0284c7"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                  />

                  {/* Parabola Curve */}
                  <path
                    d={(() => {
                      const pts: string[] = [];
                      for (let x = -6; x <= 6; x += 0.15) {
                        const y = parabolaStats.safeA * x * x + b * x + c;
                        const sx = toSvgX(x);
                        const sy = toSvgY(y);
                        pts.push(`${pts.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
                      }
                      return pts.join(' ');
                    })()}
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth={2.5}
                  />

                  {/* Vertex */}
                  <circle
                    cx={toSvgX(parabolaStats.vx)}
                    cy={toSvgY(parabolaStats.vy)}
                    r={5}
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />

                  {/* Roots */}
                  {parabolaStats.hasRoots && parabolaStats.r1 !== null && (
                    <circle
                      cx={toSvgX(parabolaStats.r1)}
                      cy={toSvgY(0)}
                      r={5}
                      fill="#059669"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                  )}
                  {parabolaStats.hasRoots && parabolaStats.r2 !== null && (
                    <circle
                      cx={toSvgX(parabolaStats.r2)}
                      cy={toSvgY(0)}
                      r={5}
                      fill="#059669"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                  )}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-100 pt-3 text-xs">
                <div>
                  <div className="text-slate-500">判别式 Δ</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {parabolaStats.delta.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">对称轴 x = -b/2a</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {parabolaStats.vx.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">两根之和 x₁+x₂</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {parabolaStats.hasRoots ? parabolaStats.sumRoots.toFixed(2) : '无实根'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">两根之积 x₁·x₂</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {parabolaStats.hasRoots ? parabolaStats.prodRoots.toFixed(2) : '无实根'}
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === 'absvalue' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="text-sm font-semibold text-slate-900">
                  <MathText
                    text={`折线最值：$f(x) = |x-(${p1})| + |x-(${p2})| + |x-(${p3})|$`}
                  />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                  <Info className="h-3.5 w-3.5" />
                  <span>最小点 x = {absStats.median}（中位数）</span>
                </span>
              </div>

              <div className="my-4 flex justify-center">
                <svg
                  viewBox="0 0 420 320"
                  className="w-full max-w-[540px] rounded-lg border border-slate-200 bg-slate-50"
                  aria-label="绝对值折线图像"
                >
                  {[-4, -2, 0, 2, 4].map((v) => (
                    <line
                      key={`vx-${v}`}
                      x1={toSvgX(v)}
                      y1={0}
                      x2={toSvgX(v)}
                      y2={320}
                      stroke={v === 0 ? '#64748b' : '#e2e8f0'}
                    />
                  ))}
                  {[0, 4, 8, 12, 16].map((yVal) => {
                    const sy = 290 - (yVal / 18) * 260;
                    return (
                      <line
                        key={`hy-${yVal}`}
                        x1={0}
                        y1={sy}
                        x2={420}
                        y2={sy}
                        stroke={yVal === 0 ? '#64748b' : '#e2e8f0'}
                      />
                    );
                  })}

                  <path
                    d={(() => {
                      const pts: string[] = [];
                      for (let x = -6; x <= 6; x += 0.2) {
                        const y = Math.abs(x - p1) + Math.abs(x - p2) + Math.abs(x - p3);
                        const sx = toSvgX(x);
                        const sy = 290 - (y / 18) * 260;
                        pts.push(`${pts.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
                      }
                      return pts.join(' ');
                    })()}
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth={2.5}
                  />

                  {/* Minimum point */}
                  <circle
                    cx={toSvgX(absStats.median)}
                    cy={290 - (absStats.minVal / 18) * 260}
                    r={6}
                    fill="#059669"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />

                  {/* Current testX point */}
                  <circle
                    cx={toSvgX(testX)}
                    cy={290 - (absStats.currentVal / 18) * 260}
                    r={5}
                    fill="#d97706"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-3 text-xs">
                <div>
                  <div className="text-slate-500">排序后零点</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {absStats.sorted.join(' ≤ ')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">当前测试 f({testX})</div>
                  <div className="mt-0.5 font-mono font-semibold text-amber-700 tabular-nums">
                    {absStats.currentVal.toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">理论最小值</div>
                  <div className="mt-0.5 font-mono font-semibold text-emerald-700 tabular-nums">
                    {absStats.minVal.toFixed(1)} (x={absStats.median})
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === 'circleline' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="text-sm font-semibold text-slate-900">
                  <MathText
                    text={`圆 $(x${cx >= 0 ? '-' : '+'}${Math.abs(cx)})^2 + (y${cy >= 0 ? '-' : '+'}${Math.abs(cy)})^2 = ${radius}^2$ 与直线 $3x+4y${lineC >= 0 ? '+' : ''}${lineC}=0$`}
                  />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    circleStats.relation === 'secant'
                      ? 'text-emerald-700'
                      : circleStats.relation === 'tangent'
                        ? 'text-blue-700'
                        : 'text-amber-700'
                  }`}
                >
                  {circleStats.relation === 'secant' && (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>d &lt; R · 相交（2交点）</span>
                    </>
                  )}
                  {circleStats.relation === 'tangent' && (
                    <>
                      <Info className="h-3.5 w-3.5" />
                      <span>d = R · 相切（1交点）</span>
                    </>
                  )}
                  {circleStats.relation === 'disjoint' && (
                    <>
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>d &gt; R · 相离（无交点）</span>
                    </>
                  )}
                </span>
              </div>

              <div className="my-4 flex justify-center">
                <svg
                  viewBox="0 0 420 320"
                  className="w-full max-w-[540px] rounded-lg border border-slate-200 bg-slate-50"
                  aria-label="直线与圆位置关系图"
                >
                  {[-4, -2, 0, 2, 4].map((v) => (
                    <React.Fragment key={v}>
                      <line
                        x1={toSvgX(v)}
                        y1={0}
                        x2={toSvgX(v)}
                        y2={320}
                        stroke={v === 0 ? '#64748b' : '#e2e8f0'}
                      />
                      <line
                        x1={0}
                        y1={toSvgY(v)}
                        x2={420}
                        y2={toSvgY(v)}
                        stroke={v === 0 ? '#64748b' : '#e2e8f0'}
                      />
                    </React.Fragment>
                  ))}

                  {/* Circle (note aspect ratio 420/320 -> scale x/y uniformly using 26.67px/unit) */}
                  <circle
                    cx={toSvgX(cx)}
                    cy={toSvgY(cy)}
                    r={(radius / 12) * 320}
                    fill="rgba(29, 78, 216, 0.08)"
                    stroke="#1d4ed8"
                    strokeWidth={2}
                  />
                  <circle cx={toSvgX(cx)} cy={toSvgY(cy)} r={4} fill="#1d4ed8" />

                  {/* Line 3x + 4y + lineC = 0 => y = (-3x - lineC)/4 */}
                  <line
                    x1={toSvgX(-6)}
                    y1={toSvgY((-3 * -6 - lineC) / 4)}
                    x2={toSvgX(6)}
                    y2={toSvgY((-3 * 6 - lineC) / 4)}
                    stroke="#dc2626"
                    strokeWidth={2}
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-3 text-xs">
                <div>
                  <div className="text-slate-500">圆心距 d</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {circleStats.dist.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">圆半径 R</div>
                  <div className="mt-0.5 font-mono font-semibold text-slate-900 tabular-nums">
                    {radius.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">截得弦长 L</div>
                  <div className="mt-0.5 font-mono font-semibold text-blue-700 tabular-nums">
                    {circleStats.relation === 'secant' ? circleStats.chord.toFixed(2) : '0.00'}
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === 'mixture' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="text-sm font-semibold text-slate-900">
                  <MathText
                    text={`反复倒出加满水浓度衰减：$C_${diluteSteps} = ${initConc}\\% \\times (1 - \\frac{${pourOut}}{${totalVol}})^${diluteSteps}$`}
                  />
                </div>
                <span className="text-xs font-semibold text-blue-700 font-mono tabular-nums">
                  最终浓度：{mixStats.finalConc.toFixed(2)}%
                </span>
              </div>

              <div className="my-5 space-y-3">
                {mixStats.history.map((h) => (
                  <div key={h.step} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">
                        {h.step === 0 ? '初始原液' : `第 ${h.step} 次倒出加满水后`}
                      </span>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">
                        浓度 {h.conc.toFixed(2)}% · 溶质 {h.solute.toFixed(1)} g
                      </span>
                    </div>
                    <div className="h-3.5 w-full overflow-hidden rounded-md bg-slate-100">
                      <div
                        className="h-full bg-blue-600 transition-all duration-150"
                        style={{ width: `${Math.min(100, h.conc)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3 text-xs text-slate-600">
                每次倒出占总容积的 <span className="font-mono font-semibold text-slate-900">{((pourOut / totalVol) * 100).toFixed(1)}%</span>，因此每次溶质保留比例为 <span className="font-mono font-semibold text-slate-900">{(mixStats.ratio * 100).toFixed(1)}%</span>。
              </div>
            </>
          )}
        </div>

        {/* Right Zone: Parameter Sliders & Real-Time Formula Deck */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-6">
          {mode === 'parabola' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-900">参数控制面板</h3>
              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>二次项系数 a（开口方向与宽窄）</span>
                    <span className="font-mono tabular-nums">{parabolaStats.safeA}</span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={a}
                    onChange={(e) => setA(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>一次项系数 b（影响对称轴位置）</span>
                    <span className="font-mono tabular-nums">{b}</span>
                  </div>
                  <input
                    type="range"
                    min={-6}
                    max={6}
                    step={0.5}
                    value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>常数项 c（y 轴截距）</span>
                    <span className="font-mono tabular-nums">{c}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.5}
                    value={c}
                    onChange={(e) => setC(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 space-y-2">
                <div className="font-semibold text-slate-900">实时公式推演：</div>
                <MathFormula
                  latex={`\\Delta = (${b})^2 - 4(${parabolaStats.safeA})(${c}) = ${parabolaStats.delta.toFixed(2)}`}
                  displayMode={true}
                />
                <MathFormula
                  latex={`x_1+x_2 = -\\frac{b}{a} = ${parabolaStats.sumRoots.toFixed(2)}, \\quad x_1 x_2 = \\frac{c}{a} = ${parabolaStats.prodRoots.toFixed(2)}`}
                  displayMode={true}
                />
              </div>
            </div>
          )}

          {mode === 'absvalue' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-900">绝对值零点与试探点</h3>
              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>零点 a₁</span>
                    <span className="font-mono tabular-nums">{p1}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={1}
                    value={p1}
                    onChange={(e) => setP1(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>零点 a₂</span>
                    <span className="font-mono tabular-nums">{p2}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={1}
                    value={p2}
                    onChange={(e) => setP2(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>零点 a₃</span>
                    <span className="font-mono tabular-nums">{p3}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={1}
                    value={p3}
                    onChange={(e) => setP3(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-amber-800">
                    <span>拖动数轴试探点 x（橙色点）</span>
                    <span className="font-mono tabular-nums">x = {testX}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.5}
                    value={testX}
                    onChange={(e) => setTestX(Number(e.target.value))}
                    className="mt-1.5 w-full accent-amber-600"
                  />
                </label>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <div className="font-semibold text-slate-900">几何解释：</div>
                <p className="mt-1">
                  奇数个绝对值相加时，函数图像在最中间零点 <span className="font-mono font-semibold">x = {absStats.median}</span> 处形成最低尖点；最小值即为最大零点与最小零点之差：{absStats.sorted[2]} - ({absStats.sorted[0]}) = {absStats.minVal}。
                </p>
              </div>
            </div>
          )}

          {mode === 'circleline' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-900">圆心、半径与直线平移</h3>
              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>圆心横坐标 a</span>
                    <span className="font-mono tabular-nums">{cx}</span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={cx}
                    onChange={(e) => setCx(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>圆心纵坐标 b</span>
                    <span className="font-mono tabular-nums">{cy}</span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={cy}
                    onChange={(e) => setCy(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>圆半径 R</span>
                    <span className="font-mono tabular-nums">{radius}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4.5}
                    step={0.5}
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>直线常数项 C（3x + 4y + C = 0）</span>
                    <span className="font-mono tabular-nums">{lineC}</span>
                  </div>
                  <input
                    type="range"
                    min={-15}
                    max={15}
                    step={1}
                    value={lineC}
                    onChange={(e) => setLineC(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <MathFormula
                  latex={`d = \\frac{|3(${cx})+4(${cy})+(${lineC})|}{\\sqrt{3^2+4^2}} = ${circleStats.dist.toFixed(2)}`}
                  displayMode={true}
                />
                {circleStats.relation === 'secant' && (
                  <MathFormula
                    latex={`L = 2\\sqrt{R^2-d^2} = 2\\sqrt{${radius}^2-${circleStats.dist.toFixed(2)}^2} = ${circleStats.chord.toFixed(2)}`}
                    displayMode={true}
                  />
                )}
              </div>
            </div>
          )}

          {mode === 'mixture' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-900">溶液稀释参数调节</h3>
              <div className="space-y-4">
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>初始溶液浓度 C₀ (%)</span>
                    <span className="font-mono tabular-nums">{initConc}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    step={5}
                    value={initConc}
                    onChange={(e) => setInitConc(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>容器总容积 V (克)</span>
                    <span className="font-mono tabular-nums">{totalVol} g</span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={1000}
                    step={100}
                    value={totalVol}
                    onChange={(e) => {
                      const nextV = Number(e.target.value);
                      setTotalVol(nextV);
                      if (pourOut >= nextV) setPourOut(nextV / 2);
                    }}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>每次倒出并加满水的质量 a (克)</span>
                    <span className="font-mono tabular-nums">{pourOut} g</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={totalVol - 50}
                    step={50}
                    value={pourOut}
                    onChange={(e) => setPourOut(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>重复操作次数 n</span>
                    <span className="font-mono tabular-nums">{diluteSteps} 次</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={diluteSteps}
                    onChange={(e) => setDiluteSteps(Number(e.target.value))}
                    className="mt-1.5 w-full accent-blue-700"
                  />
                </label>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <div className="font-semibold text-slate-900">等比衰减核心公式：</div>
                <MathFormula
                  latex={`C_n = C_0\\left(1-\\frac{a}{V}\\right)^n = ${initConc}\\%\\left(1-\\frac{${pourOut}}{${totalVol}}\\right)^${diluteSteps} = ${mixStats.finalConc.toFixed(2)}\\%`}
                  displayMode={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
