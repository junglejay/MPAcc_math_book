import { FormulaEntry, ModuleMeta } from '../types/formula';

export const MODULES_META: ModuleMeta[] = [
  {
    id: 'arithmetic',
    name: '算术与数论',
    shortName: '算术数论',
    examWeight: '约 3~4 题 · 基础得分盘',
    description: '涵盖实数分类、奇偶质合、整除与余数、比和比例性质、绝对值几何意义与三角不等式、均值与非负性。',
  },
  {
    id: 'algebra',
    name: '代数、方程与不等式',
    shortName: '代数方程',
    examWeight: '约 4~5 题 · 运算核心',
    description: '涵盖整式乘法与因式分解、余式/因式定理、分式裂项、指数对数、一元二次方程韦达定理与根的分布、均值不等式链。',
  },
  {
    id: 'sequences',
    name: '函数与数列',
    shortName: '函数数列',
    examWeight: '约 3 题 · 性质推演核心',
    description: '涵盖通用递推求通项、等差数列完整体系、等比数列完整体系、无穷递缩等比求和、错位相减与裂项求和技巧。',
  },
  {
    id: 'geometry',
    name: '平面与立体几何',
    shortName: '平立几何',
    examWeight: '约 4~5 题 · 图形转化关键',
    description: '涵盖三角形全等相似与心、常见面积与勾股公式、圆与扇形阴影割补、长方体/圆柱/圆锥/球体体积及内切外接球。',
  },
  {
    id: 'analytic',
    name: '平面解析几何',
    shortName: '解析几何',
    examWeight: '约 3 题 · 数形结合高分点',
    description: '涵盖斜率与五种直线方程、点到直线与平行线距离、点线对称公式、圆的标准与一般方程、直线与圆位置关系及最值模型。',
  },
  {
    id: 'data',
    name: '排列组合、概率与统计',
    shortName: '数据分析',
    examWeight: '约 5 题 · 区分度最高模块',
    description: '涵盖两大计数原理、排列组合八大模型（捆绑/插空/隔板/错排/分组）、古典概型、独立事件与伯努利概型、均值方差与标准差。',
  },
  {
    id: 'applications',
    name: '应用题模型与条件充分性判断',
    shortName: '应用与充要',
    examWeight: '约 6~8 题 · 联考实战主力',
    description: '涵盖利润增长率、浓度与十字交叉法、工程与行程、容斥原理、最值与不定方程模型，以及条件充分性判断（A-E）逻辑判定体系。',
  },
];

export const FORMULAS_PART_1: FormulaEntry[] = [
  // ======================== 1. 算术与数论 ========================
  {
    id: 'arith-01',
    moduleId: 'arithmetic',
    moduleName: '算术与数论',
    chapter: '第一章 整数、整除与质合数',
    code: '1.1',
    title: '实数性质、奇偶分析与整除判定法则',
    frequency: '核心基础',
    summary: '利用奇偶性、尾数特征与整除判定快速缩小不定方程和数论题的枚举范围。',
    mnemonic: '加减同奇偶，乘积偶为王；2看末位4看末两位，3和9看数字和，11看奇偶位差。',
    formulas: [
      {
        label: '奇偶运算基本律',
        latex: '\\text{奇}\\pm\\text{奇}=\\text{偶}, \\quad \\text{偶}\\pm\\text{偶}=\\text{偶}, \\quad \\text{奇}\\pm\\text{偶}=\\text{奇}',
      },
      {
        label: '奇偶乘积与差和同性',
        latex: '\\text{奇}\\times\\text{奇}=\\text{奇}, \\quad \\text{偶}\\times\\text{整数}=\\text{偶}; \\quad a+b \\text{ 与 } a-b \\text{ 同奇偶}',
      },
      {
        label: '整除判定通则（设 $N=\\overline{a_k\\cdots a_1a_0}$）',
        latex: '4\\mid N \\Leftrightarrow 4\\mid \\overline{a_1a_0}; \\quad 8\\mid N \\Leftrightarrow 8\\mid \\overline{a_2a_1a_0}; \\quad 3(9)\\mid N \\Leftrightarrow 3(9)\\mid \\sum_{i=0}^{k} a_i',
      },
      {
        label: '11 的整除判定与约数定理',
        latex: '11\\mid N \\Leftrightarrow 11\\mid (S_{\\text{奇位}}-S_{\\text{偶位}}); \\quad N=p_1^{\\alpha_1}p_2^{\\alpha_2}\\cdots p_r^{\\alpha_r} \\Rightarrow d(N)=\\prod_{i=1}^{r}(\\alpha_i+1)',
        note: '正约数个数公式 $d(N)$ 与所有正约数和公式 $\\sigma(N)=\\prod \\frac{p_i^{\\alpha_i+1}-1}{p_i-1}$',
      },
      {
        label: '最大公约数与最小公倍数恒等式',
        latex: '(a, b) \\cdot [a, b] = a \\cdot b \\quad (a, b \\in \\mathbb{Z}^+)',
      },
    ],
    conditions: [
      '质数中唯一的偶数是 $2$，最小的合数是 $4$；$1$ 既不是质数也不是合数，$|0|=0$ 是偶数。',
      '正整数 $N$ 有奇数个正约数 $\\Leftrightarrow N$ 为完全平方数。',
      '互质两数 $(a,b)=1$ 时，其和差也与原数互质。',
    ],
    traps: [
      '题目若只说“整数”未限定“正整数”，不可漏掉 $0$ 和负整数（如 $0$ 是偶数也是自然数）。',
      '看到两个质数之和为奇数时，其中必有一个质数是 $2$（考试极高频切入点！）。',
    ],
    example: {
      source: '经典联考真题模型（质数与奇偶结合）',
      question: '设 $p, q$ 均为质数，且满足 $5p^2 + 3q = 59$，则 $p + q$ 的值为（ ）。',
      options: ['A. 11', 'B. 13', 'C. 15', 'D. 17', 'E. 19'],
      answer: 'C. 15',
      steps: [
        {
          stepTitle: '第 1 步：利用奇偶性锁定唯一偶质数 2',
          content: '方程右边 $59$ 为奇数，故 $5p^2$ 与 $3q$ 必为一奇一偶，因此 $p$ 与 $q$ 必为一奇一偶。由于质数中唯一的偶数是 $2$，因此 $p=2$ 或 $q=2$。',
        },
        {
          stepTitle: '第 2 步：分两种情况代入验证整除性',
          content: '情况一：若 $p=2$，代入得 $5\\times 2^2 + 3q = 59 \\Rightarrow 20 + 3q = 59 \\Rightarrow 3q = 39 \\Rightarrow q = 13$。检验 $13$ 为质数，符合题意。\n情况二：若 $q=2$，代入得 $5p^2 + 6 = 59 \\Rightarrow 5p^2 = 53$，无整数解，舍去。',
        },
        {
          stepTitle: '第 3 步：计算目标结果',
          content: '故唯一解为 $p=2,\\; q=13$，因此 $p + q = 2 + 13 = 15$，故选 C。',
        },
      ],
      keyTakeaway: '遇到“多个质数的线性组合等于奇数”时，第一步永远先用奇偶分析锁定其中必有偶质数 $2$，瞬间将二元方程降为一元方程。',
    },
  },
  {
    id: 'arith-02',
    moduleId: 'arithmetic',
    moduleName: '算术与数论',
    chapter: '第二章 比、比例与平均值',
    code: '1.2',
    title: '比与比例定理（等比定理与合分比定理）',
    frequency: '高频必考',
    summary: '处理分式连等式求值、多变量比例分配以及条件充分性判断的必考核心工具。',
    mnemonic: '见连比设 $k$，用等比防分母为零；$b+d+f=0$ 必须单独查！',
    formulas: [
      {
        label: '比例基本性质与合比、分比定理',
        latex: '\\frac{a}{b}=\\frac{c}{d} \\Leftrightarrow ad=bc \\quad (b,d\\ne 0); \\qquad \\frac{a}{b}=\\frac{c}{d} \\Rightarrow \\frac{a\\pm b}{b}=\\frac{c\\pm d}{d}',
      },
      {
        label: '等比定理（极其高频）',
        latex: '\\text{若 } \\frac{a}{b}=\\frac{c}{d}=\\frac{e}{f}=k \\text{ 且 } b+d+f\\ne 0,\\quad \\text{则 } \\frac{a+c+e}{b+d+f}=k',
      },
      {
        label: '推广加权等比定理',
        latex: '\\frac{ma+nc+pe}{mb+nd+pf}=k \\quad (mb+nd+pf\\ne 0)',
      },
      {
        label: '见比设 $k$ 法（万金油）',
        latex: 'a:b:c = m:n:p \\iff a=mk,\\; b=nk,\\; c=pk \\quad (k\\ne 0)',
      },
    ],
    conditions: [
      '使用等比定理的前提条件是新分母 $b+d+f \\ne 0$；若题干未说明分母之和非零，必须分 $b+d+f=0$ 与 $b+d+f\\ne 0$ 两类讨论！',
      '联考条件充分性判断最喜欢用“$a+b+c=0$ 时 $k=-1$”来制造反例陷阱。',
    ],
    traps: [
      '直接套用 $\\frac{a}{b+c}=\\frac{b}{a+c}=\\frac{c}{a+b}=k \\Rightarrow k=\\frac{1}{2}$ 而忽略 $a+b+c=0$ 导致 $k=-1$ 的双解陷阱！',
    ],
    example: {
      source: '管理类联考经典高频真题',
      question: '已知实数 $a, b, c$ 满足 $\\frac{a}{b+c}=\\frac{b}{a+c}=\\frac{c}{a+b}=k$，则 $k$ 的值为（ ）。',
      options: ['A. $\\frac{1}{2}$', 'B. $-1$', 'C. $\\frac{1}{2}$ 或 $-1$', 'D. $1$ 或 $-1$', 'E. $\\frac{1}{2}$ 或 $-\\frac{1}{2}$'],
      answer: 'C. $\\frac{1}{2}$ 或 $-1$',
      steps: [
        {
          stepTitle: '第 1 步：讨论分母之和不为零的情况（应用等比定理）',
          content: '三个分母之和为 $(b+c)+(a+c)+(a+b)=2(a+b+c)$。\n当 $a+b+c \\ne 0$ 时，由等比定理得：$$k = \\frac{a+b+c}{2(a+b+c)} = \\frac{1}{2}$$',
        },
        {
          stepTitle: '第 2 步：讨论分母之和为零的临界情况',
          content: '当 $a+b+c = 0$ 时，有 $b+c = -a$（且由原分式有意义知 $a, b, c \\ne 0$），代入第一个比例式得：$$k = \\frac{a}{b+c} = \\frac{a}{-a} = -1$$',
        },
        {
          stepTitle: '第 3 步：汇总全部可能取值',
          content: '综合两种情况，$k$ 的值可能为 $\\frac{1}{2}$ 或 $-1$，故选 C。',
        },
      ],
      keyTakeaway: '凡是使用等比定理，必须在草稿纸上写下“分母之和 $=0$ 了吗？”，一旦存在分母之和为 $0$ 的可能，必有第二个解。',
    },
  },
  {
    id: 'arith-03',
    moduleId: 'arithmetic',
    moduleName: '算术与数论',
    chapter: '第三章 绝对值与非负性',
    code: '1.3',
    title: '绝对值三角不等式与几何意义（平底锅最值）',
    frequency: '高频必考',
    summary: '联考每年必考 1~2 题，核心在于绝对值去符号、三角不等式取等条件以及数轴折线求最值。',
    mnemonic: '加减之和最小看中间（平底锅）；差之最大看两端；奇取最中间，偶取中间段。',
    formulas: [
      {
        label: '绝对值基本定义与自比性',
        latex: '|a|=\\begin{cases} a, & a>0 \\\\ 0, & a=0 \\\\ -a, & a<0 \\end{cases} \\qquad \\frac{|a|}{a}=\\begin{cases} 1, & a>0 \\\\ -1, & a<0 \\end{cases}',
      },
      {
        label: '绝对值三角不等式（核心公式）',
        latex: '||a|-|b|| \\le |a \\pm b| \\le |a| + |b|',
      },
      {
        label: '三角不等式取等充要条件',
        latex: '|a+b|=|a|+|b| \\Leftrightarrow ab \\ge 0; \\qquad |a-b|=|a|+|b| \\Leftrightarrow ab \\le 0',
      },
      {
        label: '数轴几何最值公式（$a_1 \\le a_2 \\le \\cdots \\le a_n$）',
        latex: 'f(x)=\\sum_{i=1}^{n} |x-a_i| \\text{ 在 } \\begin{cases} x=a_{\\frac{n+1}{2}} & (n\\text{为奇数}) \\\\ x\\in[a_{\\frac{n}{2}},\\, a_{\\frac{n}{2}+1}] & (n\\text{为偶数}) \\end{cases} \\text{ 处取最小值}',
      },
      {
        label: '平底锅差模型最值',
        latex: '| |x-a| - |x-b| | \\le |a-b|, \\quad \\text{最小值 } -|a-b|, \\text{ 最大值 } |a-b|',
      },
    ],
    conditions: [
      '带系数的绝对值和如 $2|x-1|+|x-3|$，可拆写成 $|x-1|+|x-1|+|x-3|$ 后再用中位数法则。',
      '非负性求和为零：若 $|A| + B^2 + \\sqrt{C} = 0$，则必有 $A=0,\\, B=0,\\, C=0$。',
    ],
    traps: [
      '三角不等式 $|a+b|=|a|-|b|$ 成立不仅需要 $ab \\le 0$，还必须保证 $|a| \\ge |b|$！',
      '解 $|x-a| < b$ 时，若未确定 $b > 0$，当 $b \\le 0$ 时解集为空集 $\\varnothing$。',
    ],
    example: {
      source: 'MPAcc 高频真题模型（带系数绝对值最值）',
      question: '求函数 $f(x) = |x - 1| + 2|x - 3| + |x - 5|$ 的最小值及取最小值时 $x$ 的取值范围。',
      answer: '最小值为 $4$，当 $x = 3$ 时取得',
      steps: [
        {
          stepTitle: '第 1 步：展开系数转化为标准点距和',
          content: '将 $2|x-3|$ 拆分为 $|x-3|+|x-3|$，原函数等价于数轴上点 $x$ 到 $4$ 个定点 $1, 3, 3, 5$ 的距离之和：$$f(x) = |x-1| + |x-3| + |x-3| + |x-5|$$',
        },
        {
          stepTitle: '第 2 步：确定中位数区间',
          content: '将 $4$ 个零点从小到大排列为 $1, 3, 3, 5$（偶数个点）。中间两个点均为 $3$，故当 $x \\in [3, 3]$ 即 $x = 3$ 时距离之和最小。',
        },
        {
          stepTitle: '第 3 步：代入计算最小值',
          content: '将 $x = 3$ 代入原式：$$f(3) = |3-1| + 2|3-3| + |3-5| = 2 + 0 + 2 = 4$$',
        },
      ],
      keyTakeaway: '遇到含正整数系数的绝对值加和最值，直接将系数拆成多个相同零点后找“中位数”，3秒出答案，完全无需分段讨论去绝对值。',
    },
  },
  {
    id: 'arith-04',
    moduleId: 'arithmetic',
    moduleName: '算术与数论',
    chapter: '第四章 实数运算与无理数',
    code: '1.4',
    title: '非负性、分母有理化与整数小数部分',
    frequency: '核心基础',
    summary: '处理根式化简、无理数比较大小及多个非负项相加为零的定值求值题。',
    mnemonic: '平方根号绝对值，非负之和各为零；无理分母乘共轭，整数取整小数减。',
    formulas: [
      {
        label: '四大非负性模型',
        latex: '|a|\\ge 0, \\quad a^{2n}\\ge 0, \\quad \\sqrt{a}\\ge 0 \\; (a\\ge 0) \\quad \\Rightarrow \\quad \\sum \\text{非负项}=0 \\Leftrightarrow \\text{各项均为 } 0',
      },
      {
        label: '共轭分母有理化公式',
        latex: '\\frac{1}{\\sqrt{a}+\\sqrt{b}} = \\frac{\\sqrt{a}-\\sqrt{b}}{a-b}, \\qquad \\frac{1}{\\sqrt{n+1}+\\sqrt{n}} = \\sqrt{n+1}-\\sqrt{n}',
      },
      {
        label: '双重二次根式化简公式（$a>b>0$）',
        latex: '\\sqrt{a+b \\pm 2\\sqrt{ab}} = \\sqrt{a} \\pm \\sqrt{b}',
      },
      {
        label: '实数的整数部分 $[x]$ 与小数部分 $\\{x\\}$',
        latex: 'x = [x] + \\{x\\}, \\quad [x] \\in \\mathbb{Z}, \\quad 0 \\le \\{x\\} < 1',
      },
    ],
    conditions: [
      '$\\sqrt{a^2} = |a|$，而非直接等于 $a$；只有当 $a \\ge 0$ 时，$(\\sqrt{a})^2 = a$。',
      '负数的整数部分注意向负无穷取整，例如 $[-3.2] = -4$，小数部分 $\\{-3.2\\} = 0.8$。',
    ],
    traps: [
      '$\\sqrt{(x-3)^2}$ 化简切忌直接写成 $x-3$，必须先写成 $|x-3|$ 再根据 $x$ 的范围去绝对值。',
    ],
    example: {
      source: '经典非负性与有理化综合题',
      question: '已知实数 $x, y$ 满足 $\\sqrt{x-2} + |y+3| + (z-5)^2 = 0$，且 $a = \\frac{1}{\\sqrt{x}+1}$，求 $a^2 + y + z$ 的值。',
      answer: '$5 - 2\\sqrt{2}$',
      steps: [
        {
          stepTitle: '第 1 步：利用非负性之和为零求变量',
          content: '三项均具有非负性，和为 $0$ 则各项均为 $0$：$$x-2=0 \\Rightarrow x=2; \\quad y+3=0 \\Rightarrow y=-3; \\quad z-5=0 \\Rightarrow z=5$$',
        },
        {
          stepTitle: '第 2 步：共轭分母有理化',
          content: '将 $x=2$ 代入 $a$ 并分子分母同乘 $\\sqrt{2}-1$：$$a = \\frac{1}{\\sqrt{2}+1} = \\frac{\\sqrt{2}-1}{2-1} = \\sqrt{2}-1$$',
        },
        {
          stepTitle: '第 3 步：代入求代数式的值',
          content: '$$a^2 + y + z = (\\sqrt{2}-1)^2 - 3 + 5 = (3 - 2\\sqrt{2}) + 2 = 5 - 2\\sqrt{2}$$',
        },
      ],
      keyTakeaway: '见到“根号 + 绝对值 + 平方 = 0”的形式，不用解方程，直接令每一项内部等于零即可瞬间锁定全部未知数。',
    },
  },

  // ======================== 2. 代数、方程与不等式 ========================
  {
    id: 'alg-01',
    moduleId: 'algebra',
    moduleName: '代数、方程与不等式',
    chapter: '第一章 整式乘法与因式分解',
    code: '2.1',
    title: '高频乘法公式、立方和差与轮换对称公式',
    frequency: '高频必考',
    summary: '代数恒等变形的根基，几乎所有高次代数求值与条件充分性判断均由此展开。',
    mnemonic: '三数平方和配两倍乘积；$a^3+b^3+c^3-3abc$ 必考零和与等边。',
    formulas: [
      {
        label: '平方差与三项完全平方公式',
        latex: 'a^2-b^2=(a+b)(a-b); \\qquad (a+b+c)^2 = a^2+b^2+c^2+2(ab+bc+ca)',
      },
      {
        label: '立方和、立方差与完全立方公式',
        latex: 'a^3 \\pm b^3 = (a\\pm b)(a^2 \\mp ab + b^2); \\qquad (a\\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3',
      },
      {
        label: '三元立方核心公式（考场大杀器）',
        latex: 'a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)',
      },
      {
        label: '轮换配方变形（极高频）',
        latex: 'a^2+b^2+c^2-ab-bc-ca = \\frac{1}{2}\\left[(a-b)^2+(b-c)^2+(c-a)^2\\right] \\ge 0',
      },
      {
        label: '倒数和幂次递推',
        latex: 'x^2+\\frac{1}{x^2}=\\left(x+\\frac{1}{x}\\right)^2-2; \\qquad x^3+\\frac{1}{x^3}=\\left(x+\\frac{1}{x}\\right)^3-3\\left(x+\\frac{1}{x}\\right)',
      },
    ],
    conditions: [
      '由三元立方公式可得重要推论：若 $a^3+b^3+c^3=3abc$，则必有 $a+b+c=0$ 或 $a=b=c$。',
      '若 $a,b,c$ 为三角形三边且 $a^2+b^2+c^2=ab+bc+ca$，则该三角形必为等边三角形。',
    ],
    traps: [
      '条件充分性判断中遇到 $a^3+b^3+c^3=3abc$ 时，若只得出 $a=b=c$ 而忘记 $a+b+c=0$（比如 $a,b,c$ 可为负数），极易错选充分！若限定 $a,b,c$ 为三角形三边（正数），则 $a+b+c>0$，此时唯一推出 $a=b=c$。',
    ],
    example: {
      source: '管理类联考真题经典（三元轮换求值）',
      question: '若实数 $a, b, c$ 满足 $a+b+c=0$ 且 $abc=2$，则 $a^3+b^3+c^3$ 的值为（ ）。',
      options: ['A. 0', 'B. 2', 'C. 4', 'D. 6', 'E. 8'],
      answer: 'D. 6',
      steps: [
        {
          stepTitle: '第 1 步：写出三元立方核心恒等式',
          content: '$$a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$$',
        },
        {
          stepTitle: '第 2 步：代入已知条件化简',
          content: '因为 $a+b+c=0$，故等式右边整体为 $0$，从而：$$a^3+b^3+c^3 - 3abc = 0 \\Rightarrow a^3+b^3+c^3 = 3abc$$',
        },
        {
          stepTitle: '第 3 步：代值求最终结果',
          content: '将 $abc=2$ 代入：$$a^3+b^3+c^3 = 3 \\times 2 = 6$$ 故选 D。',
        },
      ],
      keyTakeaway: '记住结论：只要出现 $a+b+c=0$，立即得到 $a^3+b^3+c^3=3abc$ 以及 $a^2+b^2+c^2=-2(ab+bc+ca)$。',
    },
  },
  {
    id: 'alg-02',
    moduleId: 'algebra',
    moduleName: '代数、方程与不等式',
    chapter: '第二章 多项式、余式定理与裂项',
    code: '2.2',
    title: '余式定理、因式定理与分式裂项相消',
    frequency: '高频必考',
    summary: '解决高次多项式求余式、含参多项式整除待定系数，以及分式求和难题。',
    mnemonic: '除以 $(x-a)$ 余 $f(a)$；因式整除余为零；分母两项差为 $k$，提 $\\frac{1}{k}$ 拆两头。',
    formulas: [
      {
        label: '多项式除法恒等式与余式定理',
        latex: 'f(x) = g(x)\\cdot q(x) + r(x) \\quad (\\deg r < \\deg g); \\qquad f(x) \\text{ 除以 } (ax-b) \\text{ 的余式 } R = f\\left(\\frac{b}{a}\\right)',
      },
      {
        label: '因式定理',
        latex: '(x-a) \\mid f(x) \\Leftrightarrow f(a) = 0',
      },
      {
        label: '常见分式裂项公式',
        latex: '\\frac{1}{n(n+k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n+k}\\right); \\qquad \\frac{1}{n(n+1)(n+2)} = \\frac{1}{2}\\left[\\frac{1}{n(n+1)} - \\frac{1}{(n+1)(n+2)}\\right]',
      },
      {
        label: '二次齐次分式代入技巧',
        latex: '\\frac{x}{x^2+ax+1} = \\frac{1}{x + \\frac{1}{x} + a}',
      },
    ],
    conditions: [
      '当除式 $g(x)$ 为二次多项式时，设余式为一次式 $r(x)=Ax+B$，然后令 $g(x)=0$ 的两个根代入 $f(x)$ 建立二元一次方程组求 $A, B$。',
    ],
    traps: [
      '若除式 $g(x)=(x-a)^2$（重根），不能仅靠代一个根求 $Ax+B$，需用多项式展开、长除法或导数法（$f(a)=r(a)$ 且 $f\'(a)=r\'(a)$）。',
    ],
    example: {
      source: 'MPAcc 联考真题经典（二次除式求余式）',
      question: '已知多项式 $f(x)$ 除以 $x-1$ 余 $2$，除以 $x-2$ 余 $5$，则 $f(x)$ 除以 $(x-1)(x-2)$ 所得的余式为（ ）。',
      options: ['A. $3x-1$', 'B. $3x+1$', 'C. $2x-1$', 'D. $2x+1$', 'E. $x+1$'],
      answer: 'A. $3x-1$',
      steps: [
        {
          stepTitle: '第 1 步：利用余式定理转化已知条件',
          content: '由余式定理得：$f(1) = 2$，$f(2) = 5$。',
        },
        {
          stepTitle: '第 2 步：设二次除式的标准余式',
          content: '因为除式 $(x-1)(x-2)$ 为二次式，故余式次数必低于 $2$，可设为 $r(x) = ax + b$，即：$$f(x) = (x-1)(x-2)q(x) + ax + b$$',
        },
        {
          stepTitle: '第 3 步：代入零点列方程求解',
          content: '分别令 $x=1$ 和 $x=2$ 得：$$\\begin{cases} f(1) = a + b = 2 \\\\ f(2) = 2a + b = 5 \\end{cases}$$ 两式相减得 $a = 3$，回代得 $b = -1$。因此余式为 $3x - 1$，选 A。',
        },
      ],
      keyTakeaway: '二次除式设余式 $ax+b$，找除式两个根代入 $f(x)$ 联立二元一次方程组，是多项式除法的标准通解。',
    },
  },
  {
    id: 'alg-03',
    moduleId: 'algebra',
    moduleName: '代数、方程与不等式',
    chapter: '第三章 指数与对数运算',
    code: '2.3',
    title: '指数幂与对数运算法则、换底公式',
    frequency: '核心基础',
    summary: '实现指对互化、化同底数比大小以及化简复杂连乘对数表达式。',
    mnemonic: '底真同调才正，积变和、商变差；换底链式相消，倒数底真互换。',
    formulas: [
      {
        label: '指对互化与恒等式',
        latex: 'a^b = N \\Leftrightarrow b = \\log_a N \\quad (a>0, a\\ne 1, N>0); \\qquad a^{\\log_a N} = N, \\quad \\log_a a^b = b',
      },
      {
        label: '对数基本运算法则（$M,N>0$）',
        latex: '\\log_a(MN) = \\log_a M + \\log_a N; \\quad \\log_a\\frac{M}{N} = \\log_a M - \\log_a N; \\quad \\log_{a^m} b^n = \\frac{n}{m}\\log_a b',
      },
      {
        label: '换底公式与倒数推论',
        latex: '\\log_a b = \\frac{\\log_c b}{\\log_c a}; \\qquad \\log_a b \\cdot \\log_b a = 1; \\qquad \\log_a b \\cdot \\log_b c \\cdot \\log_c d = \\log_a d',
      },
    ],
    conditions: [
      '对数函数定义域要求：真数严格大于 $0$，底数大于 $0$ 且不等于 $1$。',
      '利用单调性解对数不等式时，当底数 $0 < a < 1$ 时不等号方向必须反转！',
    ],
    traps: [
      '将 $\\log_a(x^2)$ 化简成 $2\\log_a x$ 时，若未说明 $x>0$ 会缩小定义域，正确写法应为 $2\\log_a |x|$。',
    ],
    example: {
      source: '经典对数换底与指数方程真题',
      question: '已知 $2^a = 3^b = 6$，则 $\\frac{1}{a} + \\frac{1}{b}$ 的值为（ ）。',
      options: ['A. $\\frac{1}{2}$', 'B. $1$', 'C. $\\frac{3}{2}$', 'D. $2$', 'E. $6$'],
      answer: 'B. $1$',
      steps: [
        {
          stepTitle: '第 1 步：利用指对互化表示 $a, b$',
          content: '由 $2^a = 6$ 和 $3^b = 6$，取对数得：$$a = \\log_2 6, \\qquad b = \\log_3 6$$',
        },
        {
          stepTitle: '第 2 步：利用倒数推论换底',
          content: '由 $\\frac{1}{\\log_a b} = \\log_b a$ 得：$$\\frac{1}{a} = \\log_6 2, \\qquad \\frac{1}{b} = \\log_6 3$$',
        },
        {
          stepTitle: '第 3 步：同底对数相加化简',
          content: '$$\\frac{1}{a} + \\frac{1}{b} = \\log_6 2 + \\log_6 3 = \\log_6(2\\times 3) = \\log_6 6 = 1$$ 故选 B。',
        },
      ],
      keyTakeaway: '遇到 $m^a = n^b = k$ 求 $\\frac{1}{a}+\\frac{1}{b}$，除了用对数换底，也可直接利用幂运算：$2 = 6^{1/a},\\; 3 = 6^{1/b}$，两式相乘得 $6 = 6^{1/a+1/b} \\Rightarrow \\frac{1}{a}+\\frac{1}{b}=1$！',
    },
  },
  {
    id: 'alg-04',
    moduleId: 'algebra',
    moduleName: '代数、方程与不等式',
    chapter: '第四章 一元二次函数、方程与不等式',
    code: '2.4',
    title: '二次函数最值、韦达定理与根的分布',
    frequency: '高频必考',
    summary: '管理类联考第一核心考点，几乎每年必考 1~2 题，贯穿方程、不等式、数列及解析几何。',
    mnemonic: '两根和负 b 比 a，两根积 c 比 a；判别式先站岗（Δ≥0），根分布看“口、Δ、轴、端点”。',
    formulas: [
      {
        label: '一元二次函数顶点式与最值',
        latex: 'f(x)=ax^2+bx+c = a\\left(x+\\frac{b}{2a}\\right)^2 + \\frac{4ac-b^2}{4a} \\quad (a\\ne 0)',
      },
      {
        label: '求根公式与判别式',
        latex: '\\Delta = b^2-4ac \\ge 0 \\Rightarrow x_{1,2} = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
      },
      {
        label: '韦达定理（根与系数关系）',
        latex: 'x_1 + x_2 = -\\frac{b}{a}, \\qquad x_1 x_2 = \\frac{c}{a}',
      },
      {
        label: '韦达定理四大高频变形（必背！）',
        latex: '\\begin{aligned} x_1^2 + x_2^2 &= (x_1+x_2)^2 - 2x_1x_2 \\\\ |x_1 - x_2| &= \\sqrt{(x_1+x_2)^2 - 4x_1x_2} = \\frac{\\sqrt{\\Delta}}{|a|} \\\\ \\frac{1}{x_1} + \\frac{1}{x_2} &= \\frac{x_1+x_2}{x_1x_2} \\\\ x_1^3 + x_2^3 &= (x_1+x_2)^3 - 3x_1x_2(x_1+x_2) \\end{aligned}',
      },
      {
        label: '两根同号/异号判定条件（$a\\ne 0$）',
        latex: '\\text{两正根} \\Leftrightarrow \\begin{cases} \\Delta \\ge 0 \\\\ x_1+x_2 > 0 \\\\ x_1x_2 > 0 \\end{cases} \\qquad \\text{一正一负} \\Leftrightarrow x_1x_2 < 0 \\;(\\text{此时 } \\Delta>0 \\text{ 自动成立})',
      },
      {
        label: '一般区间根分布（以两根均大于 $k$ 为例，$a>0$）',
        latex: '\\text{两根均大于 } k \\Leftrightarrow \\begin{cases} \\Delta \\ge 0 \\\\ -\\frac{b}{2a} > k \\\\ f(k) > 0 \\end{cases} \\qquad \\text{一根大于 } k \\text{ 一根小于 } k \\Leftrightarrow a\\cdot f(k) < 0',
      },
    ],
    conditions: [
      '使用韦达定理求参数值后，必须将参数回代检验 $\\Delta \\ge 0$（求实根时）或 $\\Delta > 0$（两不等实根时）！',
      '二次项系数含参数 $m$ 时（如 $mx^2+2x+1=0$），题干说“有实根”或“恒成立”必须先讨论 $m=0$（退化为一次方程/常数）的情况！',
    ],
    traps: [
      '忽视 $\\Delta \\ge 0$ 是韦达定理题目第一大失分点！例如求出 $m=1$ 或 $m=-5$ 后，其中之一可能让 $\\Delta < 0$。',
      '二次不等式 $ax^2+bx+c > 0$ 对一切实数恒成立，充要条件是（$a=b=0, c>0$）或（$a>0$ 且 $\\Delta<0$），漏掉 $a=0$ 必错。',
    ],
    example: {
      source: 'MPAcc 联考真题经典（韦达定理 + Δ 检验陷阱）',
      question: '已知关于 $x$ 的方程 $x^2 - (k+2)x + 2k = 0$ 有两个正实数根 $x_1, x_2$，且满足 $x_1^2 + x_2^2 = 5$，则实数 $k$ 的值为（ ）。',
      options: ['A. $1$ 或 $-\\frac{1}{2}$', 'B. $1$', 'C. $-1$', 'D. $1$ 或 $-1$', 'E. $-\\frac{1}{2}$'],
      answer: 'B. $1$',
      steps: [
        {
          stepTitle: '第 1 步：写出韦达定理与两正根约束',
          content: '判别式 $\\Delta = (k+2)^2 - 8k = (k-2)^2 \\ge 0$ 对任意实数 $k$ 恒成立。\n由韦达定理及“两正根”要求得：$$\\begin{cases} x_1 + x_2 = k+2 > 0 \\\\ x_1 x_2 = 2k > 0 \\end{cases} \\Rightarrow k > 0$$',
        },
        {
          stepTitle: '第 2 步：利用对称式变形列方程',
          content: '$$x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = (k+2)^2 - 4k = k^2 + 4$$ 令 $k^2 + 4 = 5$，解得 $k^2 = 1 \\Rightarrow k = 1$ 或 $k = -1$。',
        },
        {
          stepTitle: '第 3 步：回代检验限制条件',
          content: '由第 1 步两正根约束 $k > 0$，必须舍去增根 $k = -1$（当 $k=-1$ 时两根为 $-1$ 与 $2$，含负根），故唯一解为 $k = 1$，选 B。',
        },
      ],
      keyTakeaway: '解韦达定理求参题的标准三步曲：① 写 $\\Delta \\ge 0$；② 写韦达代入变形公式求解；③ 回代检验 $\\Delta$ 及题干额外限制（如两正根/两负根/异号根）。',
    },
  },
  {
    id: 'alg-05',
    moduleId: 'algebra',
    moduleName: '代数、方程与不等式',
    chapter: '第五章 均值不等式与高次/分式不等式',
    code: '2.5',
    title: '均值不等式链（AM-GM-HM-QM）与穿针引线法',
    frequency: '高频必考',
    summary: '联考求最值题的绝对主力，必须牢记“一正、二定、三相等”三原则及穿针引线标根法。',
    mnemonic: '一正二定三相等，积定和最小、和定积最大；分式不等式先通分再标根，奇穿偶不穿。',
    formulas: [
      {
        label: '二元均值不等式链（$a, b > 0$）',
        latex: '\\frac{2}{\\frac{1}{a}+\\frac{1}{b}} \\le \\sqrt{ab} \\le \\frac{a+b}{2} \\le \\sqrt{\\frac{a^2+b^2}{2}} \\quad (\\text{当且仅当 } a=b \\text{ 取等})',
        note: '依次为调和平均 $H_n$ $\\le$ 几何平均 $G_n$ $\\le$ 算术平均 $A_n$ $\\le$ 平方平均 $Q_n$',
      },
      {
        label: '三元均值不等式（$a, b, c > 0$）',
        latex: '\\frac{a+b+c}{3} \\ge \\sqrt[3]{abc} \\quad \\text{或} \\quad a+b+c \\ge 3\\sqrt[3]{abc} \\quad (\\text{当且仅当 } a=b=c \\text{ 取等})',
      },
      {
        label: '对勾函数最值与“1 的代换”模型',
        latex: 'x + \\frac{k}{x} \\ge 2\\sqrt{k} \\; (x>0,k>0); \\qquad \\left(\\frac{m}{a}+\\frac{n}{b}\\right)(pa+qb) \\text{ 展开后用二元均值}',
      },
      {
        label: '分式不等式等价转化（严禁直接去分母！）',
        latex: '\\frac{f(x)}{g(x)} > 0 \\Leftrightarrow f(x)g(x) > 0; \\qquad \\frac{f(x)}{g(x)} \\ge 0 \\Leftrightarrow \\begin{cases} f(x)g(x) \\ge 0 \\\\ g(x) \\ne 0 \\end{cases}',
      },
    ],
    conditions: [
      '“一正”：各项必须大于 $0$（若各项为负，先提负号转化为正数后再放缩）。',
      '“二定”：乘积为定值求合最小，或和为定值求积最大；若不是定值需通过拆项、配凑构造定值。',
      '“三相等”：若等号取不到（如 $\\sqrt{x^2+3}+\\frac{1}{\\sqrt{x^2+3}}$ 令 $\\sqrt{x^2+3}=1$ 无实解），不可直接等于 $2$，需用对勾函数单调性求端点最值！',
    ],
    traps: [
      '连续两次使用均值不等式时，两次取等号的条件必须同时兼容！',
      '解 $\\frac{x-1}{x-2} \\ge 0$ 时千万不能忘记 $x \\ne 2$（空心点），否则边界多算一个增根。',
    ],
    example: {
      source: 'MPAcc 联考经典（“1 的代换”与拆项配凑）',
      question: '已知正实数 $x, y$ 满足 $2x + y = 1$，则 $\\frac{1}{x} + \\frac{2}{y}$ 的最小值为（ ）。',
      options: ['A. $4$', 'B. $6$', 'C. $8$', 'D. $9$', 'E. $10$'],
      answer: 'C. $8$',
      steps: [
        {
          stepTitle: '第 1 步：利用“1 的代换”构造齐次乘积',
          content: '由 $2x+y=1$，将目标式乘以 $1=(2x+y)$ 保持值不变：$$\\frac{1}{x} + \\frac{2}{y} = \\left(\\frac{1}{x} + \\frac{2}{y}\\right)(2x+y)$$',
        },
        {
          stepTitle: '第 2 步：展开化出常数项与互为倒数项',
          content: '$$\\left(\\frac{1}{x} + \\frac{2}{y}\\right)(2x+y) = 2 + \\frac{y}{x} + \\frac{4x}{y} + 2 = 4 + \\frac{y}{x} + \\frac{4x}{y}$$',
        },
        {
          stepTitle: '第 3 步：应用均值不等式并检验取等条件',
          content: '因 $x,y>0$，由二元均值不等式：$$\\frac{y}{x} + \\frac{4x}{y} \\ge 2\\sqrt{\\frac{y}{x}\\cdot\\frac{4x}{y}} = 4$$ 故原式 $\\ge 4 + 4 = 8$。当且仅当 $\\frac{y}{x} = \\frac{4x}{y}$ 即 $y = 2x$，结合 $2x+y=1$ 得 $x=\\frac{1}{4},\\; y=\\frac{1}{2}$ 时取等号。故选 C。',
        },
      ],
      keyTakeaway: '遇到“$ax+by=C$，求 $\\frac{m}{x}+\\frac{n}{y}$ 最小值”的定式题，直接用乘“$\\frac{ax+by}{C}$”的代换法展开，10秒必出结果。',
    },
  },

  // ======================== 3. 函数与数列 ========================
  {
    id: 'seq-01',
    moduleId: 'sequences',
    moduleName: '函数与数列',
    chapter: '第一章 数列通项与递推通法',
    code: '3.1',
    title: '数列 $a_n$ 与 $S_n$ 的关系及递推求通项',
    frequency: '高频必考',
    summary: '已知前 $n$ 项和 $S_n$ 求通项 $a_n$ 是管理类联考最爱考的“首项分段检验陷阱”。',
    mnemonic: '先算 $n=1$ 取 $S_1$，再算 $n\\ge 2$ 用作差；首项能并就合并，不能并就分段写！',
    formulas: [
      {
        label: '$a_n$ 与 $S_n$ 通用转化公式（必背！）',
        latex: 'a_n = \\begin{cases} S_1, & n = 1 \\\\ S_n - S_{n-1}, & n \\ge 2 \\end{cases}',
      },
      {
        label: '累加法（已知 $a_{n+1} - a_n = f(n)$）',
        latex: 'a_n = a_1 + \\sum_{k=1}^{n-1} (a_{k+1}-a_k) = a_1 + \\sum_{k=1}^{n-1} f(k) \\quad (n\\ge 2)',
      },
      {
        label: '累乘法（已知 $\\frac{a_{n+1}}{a_n} = f(n)$）',
        latex: 'a_n = a_1 \\cdot \\prod_{k=1}^{n-1} \\frac{a_{k+1}}{a_k} = a_1 \\cdot \\prod_{k=1}^{n-1} f(k) \\quad (n\\ge 2)',
      },
      {
        label: '待定系数构造等比法（$a_{n+1} = p a_n + q$）',
        latex: 'a_{n+1} + \\lambda = p(a_n + \\lambda), \\quad \\text{其中 } \\lambda = \\frac{q}{p-1} \\quad (p\\ne 1)',
      },
    ],
    conditions: [
      '当且仅当 $S_n = An^2 + Bn + C$ 中的常数项 $C = 0$ 时，数列为完整等差数列；若 $C \\ne 0$，则从第 $2$ 项起才成等差！',
      '等比数列前 $n$ 项和特征：$S_n = k\\cdot q^n - k$（常数项与 $q^n$ 系数互为相反数），若常数项不等于 $-k$，则 $a_1$ 不满足后续通项。',
    ],
    traps: [
      '题干给出 $S_n = 2n^2 + 3n + 1$，条件充分性判断问“$\\{a_n\\}$ 是等差数列”时，答案是不充分！因为 $a_1 = S_1 = 6$，而 $a_2 = S_2 - S_1 = 15-6=9$，$a_3 = 28-15=13$，$a_2-a_1=3 \\ne a_3-a_2=4$！',
    ],
    example: {
      source: 'MPAcc 联考真题经典（含常数项的 $S_n$ 求通项）',
      question: '已知数列 $\\{a_n\\}$ 的前 $n$ 项和 $S_n = 2n^2 + n + 3$，则 $a_1 + a_5$ 的值为（ ）。',
      options: ['A. 22', 'B. 25', 'C. 28', 'D. 30', 'E. 32'],
      answer: 'B. 25',
      steps: [
        {
          stepTitle: '第 1 步：单独计算首项 $a_1$',
          content: '当 $n=1$ 时：$$a_1 = S_1 = 2(1)^2 + 1 + 3 = 6$$',
        },
        {
          stepTitle: '第 2 步：利用作差公式计算 $a_5$（$n\\ge 2$）',
          content: '切勿套用等差通项，直接利用定义 $a_5 = S_5 - S_4$：\n$$S_5 = 2(25) + 5 + 3 = 58$$\n$$S_4 = 2(16) + 4 + 3 = 39$$\n$$a_5 = 58 - 39 = 19$$',
        },
        {
          stepTitle: '第 3 步：求和得出结果',
          content: '$$a_1 + a_5 = 6 + 19 = 25$$ 故选 B。（注意：若误用 $a_n = S_n - S_{n-1}=4n-1$ 直接求 $a_1=3$，就会算出 $3+19=22$ 掉入 A 选项陷阱！）',
        },
      ],
      keyTakeaway: '求解具体第 $k$ 项（$k\\ge 2$）时，直接用 $a_k = S_k - S_{k-1}$ 计算最稳妥；求 $a_1$ 永远只用 $S_1$！',
    },
  },
  {
    id: 'seq-02',
    moduleId: 'sequences',
    moduleName: '函数与数列',
    chapter: '第二章 等差数列完整体系',
    code: '3.2',
    title: '等差数列通项、中项、求和与片段和性质',
    frequency: '高频必考',
    summary: '管理类联考数列第一高频考点，几乎每年考 1~2 题，核心在于角标和性质与 $S_n$ 最值。',
    mnemonic: '角标和相等，项和就相等；等差求和看中项，奇项和等于项数乘中间项；片段和仍成等差，公差乘 $k^2$。',
    formulas: [
      {
        label: '通项公式与公差公式',
        latex: 'a_n = a_1 + (n-1)d = a_m + (n-m)d \\quad \\Rightarrow \\quad d = \\frac{a_n - a_m}{n - m}',
      },
      {
        label: '等差中项与角标和性质',
        latex: '2A = a + b; \\qquad m + n = p + q \\Rightarrow a_m + a_n = a_p + a_q \\quad (m+n=2k \\Rightarrow a_m+a_n=2a_k)',
      },
      {
        label: '前 $n$ 项和核心公式',
        latex: 'S_n = \\frac{n(a_1+a_n)}{2} = n a_1 + \\frac{n(n-1)}{2}d = \\frac{d}{2}n^2 + \\left(a_1 - \\frac{d}{2}\\right)n',
      },
      {
        label: '奇数项求和妙用与两等差和之比',
        latex: 'S_{2n-1} = (2n-1) a_n; \\qquad \\frac{a_n}{b_n} = \\frac{S_{2n-1}}{T_{2n-1}}',
      },
      {
        label: '片段和性质与奇偶项和差',
        latex: 'S_k,\\; S_{2k}-S_k,\\; S_{3k}-S_{2k} \\text{ 成等差数列，公差 } d\' = k^2 d; \\qquad S_{\\text{偶}} - S_{\\text{奇}} = n d \\;(\\text{共 } 2n \\text{ 项})',
      },
    ],
    conditions: [
      '角标性质要求左右两边相加的**项数必须完全相同**！例如 $a_1 + a_4 = a_5$ 是错误的（左边两项，右边一项），除非 $a_1+a_4=a_2+a_3$ 或 $a_1+a_5=2a_3$。',
      '求 $S_n$ 最大（小）值的两种方法：① 变号法：$a_k \\ge 0$ 且 $a_{k+1} \\le 0$（注意若某项恰好为 $0$，则最大项数有两个）；② 二次函数对称轴邻近整数法。',
    ],
    traps: [
      '求等差数列前 $n$ 项和最大值的项数 $n$ 时，若 $a_k = 0$，则 $S_{k-1} = S_k$ 同为最大值，漏掉其中之一会导致计算题漏解。',
    ],
    example: {
      source: 'MPAcc 联考真题经典（等差中项 + 片段和性质）',
      question: '设等差数列 $\\{a_n\\}$ 的前 $n$ 项和为 $S_n$，若 $S_4 = 10$，$S_8 = 36$，则 $S_{12}$ 的值为（ ）。',
      options: ['A. 62', 'B. 72', 'C. 78', 'D. 84', 'E. 96'],
      answer: 'C. 78',
      steps: [
        {
          stepTitle: '第 1 步：写出片段和数列',
          content: '由等差数列片段和性质可知，$S_4,\\; S_8 - S_4,\\; S_{12} - S_8$ 仍成等差数列。',
        },
        {
          stepTitle: '第 2 步：计算前两段的值与新公差',
          content: '第一段：$S_4 = 10$\n第二段：$S_8 - S_4 = 36 - 10 = 26$\n新等差数列公差为 $26 - 10 = 16$。',
        },
        {
          stepTitle: '第 3 步：推出第三段并还原 $S_{12}$',
          content: '第三段 $S_{12} - S_8 = 26 + 16 = 42$，因此：$$S_{12} = S_8 + 42 = 36 + 42 = 78$$ 故选 C。',
        },
      ],
      keyTakeaway: '遇到 $S_k, S_{2k}, S_{3k}$ 类问题，绝对不要傻傻地去解 $a_1$ 和 $d$ 的方程组，直接用片段和等差性质 5 秒心算秒杀！',
    },
  },
  {
    id: 'seq-03',
    moduleId: 'sequences',
    moduleName: '函数与数列',
    chapter: '第三章 等比数列完整体系',
    code: '3.3',
    title: '等比数列通项、中项、求和与无穷递缩求和',
    frequency: '高频必考',
    summary: '公比分类讨论与无穷递缩等比数列求和（结合几何分形面积）是联考压轴常客。',
    mnemonic: '等比任何项不为零，求和先查 $q=1$；角标积等项积等，无穷递缩首项除 $(1-q)$。',
    formulas: [
      {
        label: '通项公式与公比关系',
        latex: 'a_n = a_1 q^{n-1} = a_m q^{n-m} \\quad (a_1 \\ne 0,\\; q \\ne 0)',
      },
      {
        label: '等比中项与角标积性质',
        latex: 'G^2 = ab \\Rightarrow G = \\pm\\sqrt{ab} \\; (ab>0); \\qquad m+n=p+q \\Rightarrow a_m a_n = a_p a_q',
      },
      {
        label: '前 $n$ 项和公式（必分 $q=1$ 讨论！）',
        latex: 'S_n = \\begin{cases} n a_1, & q = 1 \\\\ \\dfrac{a_1(1-q^n)}{1-q} = \\dfrac{a_1 - a_n q}{1-q}, & q \\ne 1 \\end{cases}',
      },
      {
        label: '无穷递缩等比数列所有项之和（$|q| < 1$ 且 $q \\ne 0$）',
        latex: 'S = \\lim_{n\\to\\infty} S_n = \\frac{a_1}{1 - q}',
      },
      {
        label: '等比片段和性质',
        latex: 'S_k,\\; S_{2k}-S_k,\\; S_{3k}-S_{2k} \\text{ 成等比数列（公比为 } q^k \\text{，需注意 } q=-1 \\text{ 且 } k \\text{ 为偶数时片段和为 } 0\\text{）}',
      },
    ],
    conditions: [
      '等比数列任意一项 $a_n \\ne 0$，且公比 $q \\ne 0$。',
      '已知 $a, b$ 的等比中项 $G$，若未限定同号正项，则 $G = \\pm\\sqrt{ab}$ 有两个值！但注意同一等比数列中隔项必同号（如 $a_1$ 与 $a_3$ 必同号）。',
      '无穷递缩等比数列求和公式必须满足 $0 < |q| < 1$。',
    ],
    traps: [
      '利用 $S_n = \\frac{a_1(1-q^n)}{1-q}$ 做题时忘记检查 $q=1$ 的情况！在条件充分性判断中经常因此漏解或误判。',
      '已知 $a_1, a_2, a_3$ 成等比数列，写表达式时直接用 $a_2^2 = a_1 a_3$ 不够，必须附带 $a_1, a_2, a_3 \\ne 0$！比如 $(0, 0, 5)$ 满足 $0^2=0\\times 5$ 但不是等比数列！',
    ],
    example: {
      source: 'MPAcc 联考高频真题（无穷递缩等比 + 几何面积）',
      question: '边长为 $2$ 的正方形内部依次作各边中点连成第二个正方形，再依次作各边中点连成第三个正方形，如此无限继续下去，则所有这些正方形的面积之和为（ ）。',
      options: ['A. 4', 'B. 6', 'C. 8', 'D. 12', 'E. 16'],
      answer: 'C. 8',
      steps: [
        {
          stepTitle: '第 1 步：确定首项面积 $a_1$ 与第二项面积 $a_2$',
          content: '第一个正方形边长为 $2$，故面积 $a_1 = 2^2 = 4$。\n顺次连接各边中点形成的新正方形面积为原正方形的一半，即 $a_2 = 2$。',
        },
        {
          stepTitle: '第 2 步：判断数列类型并确定公比 $q$',
          content: '后续正方形面积依次为 $4, 2, 1, \\frac{1}{2}, \\dots$，构成首项 $a_1 = 4$，公比 $q = \\frac{1}{2}$（满足 $|q|<1$）的无穷递缩等比数列。',
        },
        {
          stepTitle: '第 3 步：代入无穷递缩等比求和公式',
          content: '$$S = \\frac{a_1}{1-q} = \\frac{4}{1 - \\frac{1}{2}} = 8$$ 故选 C。',
        },
      ],
      keyTakeaway: '正方形中点连线面积减半（$q=\\frac{1}{2}$），正三角形中点连线面积变为四分之一（$q=\\frac{1}{4}$），结合 $S = \\frac{a_1}{1-q}$ 可瞬间秒杀所有无限嵌套几何题。',
    },
  },
];
