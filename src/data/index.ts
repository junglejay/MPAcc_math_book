import { FORMULAS_PART_1, MODULES_META } from './formulasPart1';
import { EXAM_TRAPS_DATA, FORMULAS_PART_2, REFERENCE_TABLES } from './formulasPart2';
import { FormulaEntry } from '../types/formula';

export { MODULES_META, EXAM_TRAPS_DATA, REFERENCE_TABLES };

export const ALL_FORMULAS: FormulaEntry[] = [...FORMULAS_PART_1, ...FORMULAS_PART_2];

export const HIGH_FREQUENCY_FORMULAS: FormulaEntry[] = ALL_FORMULAS.filter(
  (item) => item.frequency === '高频必考'
);
