import JSZip from 'jszip';
import {
  ALL_FORMULAS,
  EXAM_TRAPS_DATA,
  HIGH_FREQUENCY_FORMULAS,
  MODULES_META,
  REFERENCE_TABLES,
} from '../data';
import { FormulaEntry } from '../types/formula';
import { PROJECT_GLOB_LOADERS } from './sourceFiles';
import sourceFilesRaw from './sourceFiles.ts?raw';

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function formatEntryMarkdown(entry: FormulaEntry): string {
  const lines: string[] = [];
  lines.push(`## ${entry.code} ${entry.title}`);
  lines.push(``);
  lines.push(`- **所属模块**：${entry.moduleName} / ${entry.chapter}`);
  lines.push(`- **考频评级**：${entry.frequency}`);
  lines.push(`- **核心概述**：${entry.summary}`);
  if (entry.mnemonic) {
    lines.push(`- **速记口诀**：${entry.mnemonic}`);
  }
  lines.push(``);
  lines.push(`### 核心公式与推论`);
  lines.push(``);
  entry.formulas.forEach((f) => {
    lines.push(`**${f.label}**`);
    lines.push(``);
    lines.push(`$$`);
    lines.push(f.latex);
    lines.push(`$$`);
    if (f.note) {
      lines.push(`> 注：${f.note}`);
    }
    lines.push(``);
  });

  lines.push(`### 适用条件与变形要点`);
  entry.conditions.forEach((c) => lines.push(`- ${c}`));
  lines.push(``);

  lines.push(`### 高频易错陷阱`);
  entry.traps.forEach((t) => lines.push(`- ${t}`));
  lines.push(``);

  lines.push(`### 经典真题例题与分步解析（${entry.example.source}）`);
  lines.push(``);
  lines.push(`**题目**：${entry.example.question}`);
  lines.push(``);
  if (entry.example.options && entry.example.options.length > 0) {
    lines.push(entry.example.options.join('　'));
    lines.push(``);
  }
  lines.push(`**标准答案**：${entry.example.answer}`);
  lines.push(``);
  entry.example.steps.forEach((s) => {
    lines.push(`- **${s.stepTitle}**：${s.content}`);
  });
  lines.push(``);
  lines.push(`> **解题规律总结**：${entry.example.keyTakeaway}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  return lines.join('\n');
}

export async function downloadFormulaStudyPackZip(): Promise<void> {
  const zip = new JSZip();

  // 1. README / Table of Contents
  const readmeLines = [
    `# MPAcc（管理类联考 199）数学全考点公式与真题解析资料包`,
    ``,
    `本资料包包含管理类联考 199 数学全部 7 大知识模块的完整公式、推导变形、适用条件、易错陷阱及经典真题分步解析（Markdown + LaTeX 格式，兼容 Obsidian / Notion / Typora / VS Code 阅读与打印）。`,
    ``,
    `## 文件目录`,
    `- \`00_高频公式速记清单与真题解析.md\`（考前冲刺首选：高频必考公式 + 口诀 + 真题三步实战）`,
    ...MODULES_META.map(
      (m, idx) => `- \`0${idx + 1}_${m.name}.md\`（${m.examWeight}）`
    ),
    `- \`08_十大易错陷阱与考场常用数值表.md\``,
    `- \`mpacc_formulas_data.json\`（结构化完整数据备份）`,
    ``,
  ];
  zip.file('README.md', readmeLines.join('\n'));

  // 2. High-Frequency Cheat Sheet
  const cheatLines = [
    `# MPAcc 数学高频公式速记清单与真题实战`,
    ``,
    `共精选 ${HIGH_FREQUENCY_FORMULAS.length} 类高频必考核心公式组，建议考前每日过一遍口诀与真题破题点。`,
    ``,
    `---`,
    ``,
    ...HIGH_FREQUENCY_FORMULAS.map((entry) => formatEntryMarkdown(entry)),
  ];
  zip.file('00_高频公式速记清单与真题解析.md', cheatLines.join('\n'));

  // 3. Individual Module Markdown Files
  MODULES_META.forEach((mod, idx) => {
    const entries = ALL_FORMULAS.filter((f) => f.moduleId === mod.id);
    const modLines = [
      `# ${mod.name}`,
      ``,
      `> ${mod.examWeight}｜${mod.description}`,
      ``,
      `---`,
      ``,
      ...entries.map((e) => formatEntryMarkdown(e)),
    ];
    zip.file(`0${idx + 1}_${mod.name}.md`, modLines.join('\n'));
  });

  // 4. Traps & Reference Tables
  const trapsLines: string[] = [
    `# MPAcc 数学十大高频易错陷阱与常用数值速查表`,
    ``,
    `## 一、十大高频易错陷阱`,
    ``,
  ];
  EXAM_TRAPS_DATA.forEach((trap, idx) => {
    trapsLines.push(`### 陷阱 ${idx + 1}：${trap.title}（${trap.category}）`);
    trapsLines.push(`- **常见错误**：${trap.wrongThinking}`);
    trapsLines.push(`- **正确规避**：${trap.correctRule}`);
    trapsLines.push(``);
    trapsLines.push(`$$`);
    trapsLines.push(trap.formulaLatex);
    trapsLines.push(`$$`);
    trapsLines.push(``);
  });

  trapsLines.push(`## 二、考场必备常用数值速查表`);
  trapsLines.push(``);
  REFERENCE_TABLES.forEach((tbl) => {
    trapsLines.push(`### ${tbl.title}`);
    trapsLines.push(`${tbl.subtitle}`);
    trapsLines.push(``);
    trapsLines.push(`| ${tbl.columns.join(' | ')} |`);
    trapsLines.push(`| ${tbl.columns.map(() => '---').join(' | ')} |`);
    tbl.rows.forEach((r) => {
      trapsLines.push(`| ${r.join(' | ')} |`);
    });
    trapsLines.push(``);
  });
  zip.file('08_十大易错陷阱与考场常用数值表.md', trapsLines.join('\n'));

  // 5. Raw JSON Dataset
  zip.file(
    'mpacc_formulas_data.json',
    JSON.stringify(
      {
        modules: MODULES_META,
        formulas: ALL_FORMULAS,
        traps: EXAM_TRAPS_DATA,
        referenceTables: REFERENCE_TABLES,
      },
      null,
      2
    )
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'MPAcc_199_数学公式全套资料.zip');
}

export async function downloadSourceCodeZip(): Promise<number> {
  const zip = new JSZip();
  const loaders: Record<string, () => Promise<string>> = {
    ...PROJECT_GLOB_LOADERS,
    '/src/utils/sourceFiles.ts': async () => sourceFilesRaw,
  };
  const entries = Object.entries(loaders);

  await Promise.all(
    entries.map(async ([filePath, loader]) => {
      const content = await loader();
      const relativePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
      zip.file(relativePath, content);
    })
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, 'MPAcc_199_数学公式全书_项目源码.zip');
  return entries.length;
}
