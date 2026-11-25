export type ModuleId =
  | 'arithmetic'
  | 'algebra'
  | 'sequences'
  | 'geometry'
  | 'analytic'
  | 'data'
  | 'applications';

export type FrequencyLevel = '高频必考' | '核心基础' | '进阶技巧';

export interface FormulaItem {
  label: string;
  latex: string;
  note?: string;
}

export interface ExampleStep {
  stepTitle: string;
  content: string;
}

export interface WorkedExample {
  source: string;
  question: string;
  options?: string[];
  answer: string;
  steps: ExampleStep[];
  keyTakeaway: string;
}

export interface FormulaEntry {
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  chapter: string;
  code: string;
  title: string;
  frequency: FrequencyLevel;
  summary: string;
  mnemonic?: string;
  formulas: FormulaItem[];
  conditions: string[];
  traps: string[];
  example: WorkedExample;
}

export interface ModuleMeta {
  id: ModuleId;
  name: string;
  shortName: string;
  examWeight: string;
  description: string;
}

export interface ExamTrapItem {
  id: string;
  category: string;
  title: string;
  wrongThinking: string;
  correctRule: string;
  formulaLatex: string;
}

export interface ReferenceTable {
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
}
