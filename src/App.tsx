import React, { useEffect, useMemo, useState } from 'react';
import {
  Menu,
  X,
  Search,
  Printer,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  Download,
  FileText,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { ALL_FORMULAS, HIGH_FREQUENCY_FORMULAS, MODULES_META } from './data';
import { ModuleId } from './types/formula';
import { FormulaCard } from './components/FormulaCard';
import { CheatSheetView } from './components/CheatSheetView';
import { InteractiveLab } from './components/InteractiveLab';
import { TrapsAndSufficiencyView } from './components/TrapsAndSufficiencyView';
import { FlashcardQuiz } from './components/FlashcardQuiz';
import {
  downloadFormulaStudyPackZip,
  downloadSourceCodeZip,
} from './utils/exportArchive';

type ActiveView = 'encyclopedia' | 'cheatsheet' | 'lab' | 'traps' | 'quiz';
type StatusFilter = 'all' | 'high' | 'bookmarked' | 'unmastered';

const STORAGE_MASTERED_KEY = 'mpacc_math_mastered_v1';
const STORAGE_BOOKMARKED_KEY = 'mpacc_math_bookmarked_v1';

function loadSavedSet(key: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('encyclopedia');
  const [selectedModule, setSelectedModule] = useState<'all' | ModuleId>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadingType, setDownloadingType] = useState<'notes' | 'source' | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const [masteredIds, setMasteredIds] = useState<Set<string>>(() =>
    loadSavedSet(STORAGE_MASTERED_KEY)
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() =>
    loadSavedSet(STORAGE_BOOKMARKED_KEY)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_MASTERED_KEY,
        JSON.stringify(Array.from(masteredIds))
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_BOOKMARKED_KEY,
        JSON.stringify(Array.from(bookmarkedIds))
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePrint = () => {
    setDownloadModalOpen(false);
    window.setTimeout(() => window.print(), 100);
  };

  const handleDownloadNotesZip = async () => {
    setDownloadingType('notes');
    setDownloadSuccessMsg(null);
    try {
      await downloadFormulaStudyPackZip();
      setDownloadSuccessMsg('已成功打包下载《MPAcc_199_数学公式全套资料.zip》');
    } finally {
      setDownloadingType(null);
    }
  };

  const handleDownloadSourceZip = async () => {
    setDownloadingType('source');
    setDownloadSuccessMsg(null);
    try {
      const count = await downloadSourceCodeZip();
      setDownloadSuccessMsg(`已成功打包下载《MPAcc_199_数学公式全书_项目源码.zip》（共 ${count} 个文件）`);
    } finally {
      setDownloadingType(null);
    }
  };

  const filteredFormulas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_FORMULAS.filter((entry) => {
      if (selectedModule !== 'all' && entry.moduleId !== selectedModule) {
        return false;
      }
      if (statusFilter === 'high' && entry.frequency !== '高频必考') {
        return false;
      }
      if (statusFilter === 'bookmarked' && !bookmarkedIds.has(entry.id)) {
        return false;
      }
      if (statusFilter === 'unmastered' && masteredIds.has(entry.id)) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        entry.title,
        entry.moduleName,
        entry.chapter,
        entry.summary,
        entry.mnemonic || '',
        entry.code,
        ...entry.formulas.map((f) => `${f.label} ${f.latex} ${f.note || ''}`),
        entry.example.question,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [selectedModule, statusFilter, searchQuery, bookmarkedIds, masteredIds]);

  const activeModuleMeta =
    selectedModule === 'all'
      ? null
      : MODULES_META.find((m) => m.id === selectedModule) || null;

  const totalFormulasCount = useMemo(
    () => ALL_FORMULAS.reduce((acc, item) => acc + item.formulas.length, 0),
    []
  );

  const navItems: { id: ActiveView; label: string }[] = [
    { id: 'encyclopedia', label: '公式百科' },
    { id: 'cheatsheet', label: '高频速记清单' },
    { id: 'lab', label: '互动实验室' },
    { id: 'traps', label: '易错与充要' },
    { id: 'quiz', label: '抽背自测' },
  ];

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('encyclopedia');
              setSelectedModule('all');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 sm:text-lg"
          >
            MPAcc 199 数学公式全书
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            aria-label="主导航"
          >
            {navItems.map((nav) => {
              const active = activeView === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveView(nav.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {nav.label}
                  {active && (
                    <span
                      className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-blue-700"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setDownloadSuccessMsg(null);
                setDownloadModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Download className="h-3.5 w-3.5" />
              <span>打包下载</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
              aria-label="打开导航菜单"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((nav) => (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => {
                    setActiveView(nav.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    activeView === nav.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDownloadSuccessMsg(null);
                  setDownloadModalOpen(true);
                }}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-medium text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>打包下载全部文件</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {activeView === 'encyclopedia' && (
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Left Sidebar: Search, Progress & 7-Module Tree */}
            <aside className="no-print lg:col-span-3 space-y-5 lg:sticky lg:top-20">
              {/* Mastery Progress Summary */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">学习掌握进度</span>
                  <span className="font-mono font-semibold text-blue-700 tabular-nums">
                    {masteredIds.size} / {ALL_FORMULAS.length} 考点
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-blue-700 transition-all duration-200"
                    style={{
                      width: `${Math.round(
                        (masteredIds.size / ALL_FORMULAS.length) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>覆盖 {totalFormulasCount} 条核心公式</span>
                  <span>已收藏 {bookmarkedIds.size} 项</span>
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索公式、定理或关键词..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2">筛选状态</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all' as StatusFilter, label: '全部考点' },
                      { id: 'high' as StatusFilter, label: '高频必考' },
                      { id: 'bookmarked' as StatusFilter, label: '我的收藏' },
                      { id: 'unmastered' as StatusFilter, label: '待攻克' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setStatusFilter(btn.id)}
                        className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                          statusFilter === btn.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7-Module Navigation List */}
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                  考纲七大知识模块
                </div>
                <nav className="mt-1 space-y-0.5" aria-label="数学考纲模块导航">
                  <button
                    type="button"
                    onClick={() => setSelectedModule('all')}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                      selectedModule === 'all'
                        ? 'bg-blue-50 text-blue-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>全部模块汇总</span>
                    <span className="font-mono text-slate-400 tabular-nums">
                      {ALL_FORMULAS.length}
                    </span>
                  </button>

                  {MODULES_META.map((mod) => {
                    const count = ALL_FORMULAS.filter((f) => f.moduleId === mod.id).length;
                    const active = selectedModule === mod.id;
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setSelectedModule(mod.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-800 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-2">{mod.name}</span>
                        <span className="font-mono text-slate-400 tabular-nums shrink-0">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Main Stage */}
            <div className="lg:col-span-9 space-y-5">
              {/* Hero / Module Summary Card */}
              <section className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="text-xs font-medium text-blue-700">
                      {activeModuleMeta
                        ? `${activeModuleMeta.examWeight}`
                        : `管理类联考 199 数学完整考点 · 共 ${ALL_FORMULAS.length} 大专题 ${totalFormulasCount} 条核心公式`}
                    </div>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {activeModuleMeta
                        ? activeModuleMeta.name
                        : 'MPAcc 数学全考点公式百科与真题精讲'}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {activeModuleMeta
                        ? activeModuleMeta.description
                        : '系统整理算术数论、代数方程、数列函数、平面立体几何、解析几何、排列组合概率统计及应用题与条件充分性判断全部公式、约束条件、易错陷阱及经典真题分步解法。'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveView('cheatsheet')}
                    className="no-print inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-800 whitespace-nowrap shrink-0 transition-colors"
                  >
                    <span>进入高频速记清单 ({HIGH_FREQUENCY_FORMULAS.length} 类)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Quick Chapter Jump Links when viewing filtered formulas */}
                {filteredFormulas.length > 0 && (
                  <div className="no-print mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">本页考点目录：</span>
                    {filteredFormulas.map((item) => (
                      <a
                        key={item.id}
                        href={`#formula-${item.id}`}
                        className="inline-flex items-center gap-0.5 hover:text-blue-700 hover:underline"
                      >
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                        <span>{item.code} {item.title.split('、')[0]}</span>
                      </a>
                    ))}
                  </div>
                )}
              </section>

              {/* Formula Cards List */}
              {filteredFormulas.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                  <p className="text-base font-semibold text-slate-900">
                    没有找到符合当前筛选条件的公式
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    尝试清空搜索关键词，或重置模块与状态筛选。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedModule('all');
                      setStatusFilter('all');
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>重置全部筛选</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredFormulas.map((entry) => (
                    <FormulaCard
                      key={entry.id}
                      entry={entry}
                      isMastered={masteredIds.has(entry.id)}
                      isBookmarked={bookmarkedIds.has(entry.id)}
                      onToggleMastered={toggleMastered}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'cheatsheet' && (
          <CheatSheetView
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
            onPrint={handlePrint}
          />
        )}

        {activeView === 'lab' && <InteractiveLab />}

        {activeView === 'traps' && <TrapsAndSufficiencyView />}

        {activeView === 'quiz' && (
          <FlashcardQuiz
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
          />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-5">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span>MPAcc 199 管理类联考数学全考点公式系统</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDownloadNotesZip}
              className="font-medium text-blue-700 hover:underline"
            >
              下载公式资料包 (.zip)
            </button>
            <button
              type="button"
              onClick={handleDownloadSourceZip}
              className="font-medium text-slate-700 hover:underline"
            >
              下载项目源码 (.zip)
            </button>
          </div>
        </div>
      </footer>

      {/* Archive Packaging & Export Modal */}
      {downloadModalOpen && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 id="download-modal-title" className="text-lg font-bold text-slate-900">
                  打包下载全部文件
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  选择需要打包生成的离线压缩包或打印导出版本
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="关闭弹窗"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                disabled={downloadingType !== null}
                onClick={handleDownloadNotesZip}
                className="flex w-full items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/40 disabled:opacity-60"
              >
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      全套公式笔记与真题解析资料包 (.zip)
                    </span>
                    <span className="text-xs font-medium text-blue-700 shrink-0">
                      {downloadingType === 'notes' ? '打包中...' : '立即下载'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    包含 7 大模块独立 Markdown/LaTeX 笔记、高频速记清单、十大易错陷阱、常用数值表及完整结构化 JSON 数据，适合 Obsidian / Notion / 离线打印。
                  </p>
                </div>
              </button>

              <button
                type="button"
                disabled={downloadingType !== null}
                onClick={handleDownloadSourceZip}
                className="flex w-full items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-slate-300 hover:bg-slate-100/70 disabled:opacity-60"
              >
                <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      完整应用项目源代码 (.zip)
                    </span>
                    <span className="text-xs font-medium text-slate-700 shrink-0">
                      {downloadingType === 'source' ? '打包中...' : '立即下载'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    打包全部前端源码（src/components、src/data、src/utils、package.json、vite.config.ts 等），解压后执行 npm install 即可本地运行。
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex w-full items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50"
              >
                <Printer className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      直接打印 / 另存为 PDF 文档
                    </span>
                    <span className="text-xs font-medium text-slate-600 shrink-0">
                      打开打印
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    自动隐藏导航栏与按钮，按 A4 排版输出当前公式页面。
                  </p>
                </div>
              </button>
            </div>

            {downloadSuccessMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{downloadSuccessMsg}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
