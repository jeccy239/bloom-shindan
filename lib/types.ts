export type Axis = 'EI' | 'SN' | 'TF' | 'JP';
export type AxisDirection = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type BloomTypeCode =
  | 'ESTJ' | 'ESTP' | 'ESFJ' | 'ESFP'
  | 'ENTJ' | 'ENTP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISTP' | 'ISFJ' | 'ISFP'
  | 'INTJ' | 'INTP' | 'INFJ' | 'INFP';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  optionA: { text: string; direction: AxisDirection };
  optionB: { text: string; direction: AxisDirection };
}

export interface BloomType {
  code: BloomTypeCode;
  id: string;
  flower: string;
  flowerEn: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
  keywords: string[];
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  compatibleWith: BloomTypeCode[];
}

export interface Answer {
  questionId: number;
  direction: AxisDirection;
}

export interface AxisScores {
  E: number; I: number;
  S: number; N: number;
  T: number; F: number;
  J: number; P: number;
}

export interface AxisPercentages {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}

export interface DiagnosisResult {
  answers: Answer[];
  scores: AxisScores;
  percentages: AxisPercentages;
  typeCode: BloomTypeCode;
  typeId: string;
  completedAt: string;
}

export const BLOOM_TYPES: Record<BloomTypeCode, BloomType> = {
  ENFP: {
    code: 'ENFP',
    id: 'enfp',
    flower: 'コスモス',
    flowerEn: 'Cosmos',
    emoji: '🌸',
    title: '自由な夢想家',
    tagline: '可能性の先に、あなたの花が咲く',
    description: 'アイデアと情熱であふれる、可能性を信じる自由な魂。あなたはどんな状況でも希望の光を見つけ、周りの人にエネルギーを与えます。コスモスのように風に揺れながらも、どこでも美しく咲く力があります。新しい出会いや体験を愛し、人々の心に種を蒔く天才的な存在です。',
    strengths: ['豊かな創造力と独自のアイデア', '共感力が高く人の心に寄り添える', '情熱的で人を引きつけるカリスマ', '変化への適応力が高い', '楽観的で周りに希望を与える'],
    challenges: ['一つのことに集中し続けるのが苦手', '感情に左右されすぎることがある', '計画より衝動を優先しがち'],
    keywords: ['自由', '情熱', '創造性', '共感', '可能性', '楽観'],
    gradient: 'from-pink-400 via-fuchsia-400 to-rose-400',
    gradientFrom: '#f472b6',
    gradientTo: '#fb7185',
    compatibleWith: ['INTJ', 'INFJ', 'ENFJ'],
  },
  INFP: {
    code: 'INFP',
    id: 'infp',
    flower: 'ラベンダー',
    flowerEn: 'Lavender',
    emoji: '💜',
    title: '詩的な理想家',
    tagline: '心の奥の声が、世界を変える力になる',
    description: '深い感受性と豊かな内面世界を持つ、詩的な魂。あなたは自分の価値観に誠実で、世界をより良くしたいという静かな情熱を燃やし続けています。ラベンダーのように穏やかな香りで、周りの人の心を静かに癒す存在です。言葉や表現を通じて、自分だけの美しい世界を作り出す才能があります。',
    strengths: ['深い共感力と繊細な感受性', '強い信念と価値観への誠実さ', '豊かな想像力と創造的表現力', '深い人間理解と洞察力', '人の良いところを見つける優しさ'],
    challenges: ['批判を個人攻撃と感じやすい', '理想と現実のギャップに苦しむことがある', '自己開示に時間がかかる'],
    keywords: ['誠実', '感受性', '創造性', '理想', '深み', '内省'],
    gradient: 'from-purple-400 via-violet-400 to-indigo-400',
    gradientFrom: '#c084fc',
    gradientTo: '#818cf8',
    compatibleWith: ['ENTJ', 'ENFJ', 'INTJ'],
  },
  ENFJ: {
    code: 'ENFJ',
    id: 'enfj',
    flower: 'チューリップ',
    flowerEn: 'Tulip',
    emoji: '🌷',
    title: '輝く導き手',
    tagline: 'あなたが咲く場所に、みんなの笑顔が咲く',
    description: '人々の可能性を信じ、成長を助けることに喜びを見出す、天性のリーダー。あなたのカリスマ性と温かさで、周りの人を自然とまとめ前へ進む力を与えます。チューリップのように凛として美しく、まっすぐ空に向かって伸びながら、周りを明るく彩る存在です。',
    strengths: ['生まれながらのカリスマ性', '深い共感力と人心掌握力', '明確なビジョンと実行力', 'チームを鼓舞する力', '多様な人と信頼関係を築ける'],
    challenges: ['他者への期待が高すぎることがある', '自分のニーズを後回しにしがち', '批判を受けると傷つきやすい'],
    keywords: ['リーダーシップ', '共感', '温かさ', 'カリスマ', '成長', '調和'],
    gradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
    gradientFrom: '#fb7185',
    gradientTo: '#e879f9',
    compatibleWith: ['INFP', 'ISFP', 'ENFP'],
  },
  INFJ: {
    code: 'INFJ',
    id: 'infj',
    flower: 'スズラン',
    flowerEn: 'Lily of the Valley',
    emoji: '🌿',
    title: '繊細な洞察者',
    tagline: '静かに、でも確かに世界の本質を見抜く',
    description: '深い洞察力と強い直感を持つ、稀有な魂。あなたは表面の裏側にある真実を見抜き、人々の心の動きを敏感に感じ取ります。スズランのように可憐でありながら、その強さは内に秘めた芯から生まれます。少数の人と深くつながり、世界に意味のある変化をもたらしたいという使命感を持っています。',
    strengths: ['卓越した直感と洞察力', '深い共感と人間理解', '強い価値観と使命感', '長期的な視野での思考', '創造的かつ論理的な思考'],
    challenges: ['自分に完璧を求めすぎる', '他者のネガティブなエネルギーを吸収しやすい', '意思決定に時間がかかることがある'],
    keywords: ['直感', '洞察', '使命感', '繊細', '深み', '誠実'],
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    gradientFrom: '#34d399',
    gradientTo: '#22d3ee',
    compatibleWith: ['ENFP', 'ENTP', 'INFP'],
  },
  ENTJ: {
    code: 'ENTJ',
    id: 'entj',
    flower: 'ひまわり',
    flowerEn: 'Sunflower',
    emoji: '🌻',
    title: '燃えるリーダー',
    tagline: '大きな夢を、現実にする力がある',
    description: '生まれながらの指揮官。あなたは大きなビジョンを描き、それを実現する戦略を立て、人々を率いる力を持っています。ひまわりのように太陽に向かって堂々と咲き誇り、その存在だけで周りにエネルギーを与えます。目標に向かって全力で突き進む姿は、多くの人にインスピレーションを与えます。',
    strengths: ['強力なリーダーシップと決断力', '戦略的思考と長期的視野', '高い目標設定と実現力', '効率的な問題解決能力', '人を動かすカリスマ性'],
    challenges: ['感情面への配慮が不足することがある', '完璧主義で他者に厳しくなりがち', '人の意見を聞かずに突き進むことがある'],
    keywords: ['野心', 'リーダーシップ', '戦略', '決断力', '効率', '目標'],
    gradient: 'from-yellow-400 via-orange-400 to-amber-400',
    gradientFrom: '#facc15',
    gradientTo: '#f59e0b',
    compatibleWith: ['INFP', 'INTP', 'ENFP'],
  },
  INTJ: {
    code: 'INTJ',
    id: 'intj',
    flower: 'ラン',
    flowerEn: 'Orchid',
    emoji: '🌺',
    title: '孤高の戦略家',
    tagline: '独自の視点で、誰も見えない答えを見つける',
    description: '鋭い知性と高い基準を持つ、独立した戦略家。あなたは長期的な視野で物事を考え、複雑な問題を独自の方法で解決します。ランのように独特の美しさと希少さを持ち、唯一無二の存在感を放ちます。内なる確信に従って動く強さと、常に成長を求める向上心があります。',
    strengths: ['深い戦略的思考と計画力', '高い知的好奇心と分析力', '強い意志と自己管理能力', '長期的なビジョンを描く力', '独創的な問題解決アプローチ'],
    challenges: ['感情表現が苦手で誤解されやすい', '完璧主義で自他に厳しすぎる', '社交的な場が苦手なことがある'],
    keywords: ['戦略', '独立', '知性', '完璧主義', '長期思考', '独創性'],
    gradient: 'from-slate-600 via-purple-500 to-indigo-500',
    gradientFrom: '#475569',
    gradientTo: '#6366f1',
    compatibleWith: ['ENFP', 'ENTP', 'INFP'],
  },
  ENTP: {
    code: 'ENTP',
    id: 'entp',
    flower: 'バラ',
    flowerEn: 'Rose',
    emoji: '🌹',
    title: '鋭い探求者',
    tagline: '常識を疑い、新しい可能性を切り拓く',
    description: '知的な刺激を愛し、常に新しいアイデアを探求する、革新的な魂。あなたは鋭い洞察力と議論を楽しむ性格で、物事の本質を突き、革命的な解決策を生み出します。バラのように美しさと鋭さを兼ね備え、どんな状況でも輝く存在感があります。',
    strengths: ['卓越した知的好奇心と分析力', '革新的なアイデアと発想力', '論理的な議論と説得力', '複数の視点から問題を見る力', '新しい挑戦への高い適応力'],
    challenges: ['一つのことを最後まで仕上げるのが苦手', '人の感情への配慮が不足しがち', '議論のための議論になることがある'],
    keywords: ['革新', '議論', '知的探求', '発想力', '柔軟性', '独自性'],
    gradient: 'from-red-400 via-rose-400 to-pink-400',
    gradientFrom: '#f87171',
    gradientTo: '#f472b6',
    compatibleWith: ['INFJ', 'INTJ', 'ENFJ'],
  },
  INTP: {
    code: 'INTP',
    id: 'intp',
    flower: 'あじさい',
    flowerEn: 'Hydrangea',
    emoji: '💐',
    title: '深遠な思索家',
    tagline: '誰も気づかない真理を、静かに見つめる',
    description: '複雑なアイデアと理論を愛する、独自の視点を持つ思索家。あなたは真実を探求することに無限の情熱を持ち、誰も気づかない深いつながりを見出します。あじさいのように多彩な側面を持ち、見るたびに新しい発見があります。自分の世界の中で、宇宙の謎を解き明かす旅を続けています。',
    strengths: ['卓越した論理的思考と分析力', '深い知的好奇心と理論構築力', '客観的で偏りのない視点', '独創的なアプローチと発明力', '複雑な概念を理解する能力'],
    challenges: ['感情表現や社交的な場が苦手', 'アイデアを実行に移すのが難しい', '完璧を求めて決断が遅くなることがある'],
    keywords: ['論理', '理論', '分析', '探求', '独創性', '客観性'],
    gradient: 'from-blue-400 via-indigo-400 to-violet-400',
    gradientFrom: '#60a5fa',
    gradientTo: '#8b5cf6',
    compatibleWith: ['ENTJ', 'ESTJ', 'ENFJ'],
  },
  ESFP: {
    code: 'ESFP',
    id: 'esfp',
    flower: 'ひなぎく',
    flowerEn: 'Daisy',
    emoji: '🌼',
    title: '明るいエンターテイナー',
    tagline: '今この瞬間を、全力で楽しもう',
    description: '瞬間を愛し、周りに笑顔と活気をもたらす、生きることを謳歌する魂。あなたは自然体で人を引きつけ、その場の空気を明るくする才能があります。ひなぎくのように愛らしく、どんな場所でも元気よく咲く強さを持っています。人生を楽しむことのプロとして、周りのみんなを笑顔にします。',
    strengths: ['明るく人を引きつけるオーラ', '瞬時の判断力と行動力', '人を楽しませる天性の才能', '柔軟性と適応力の高さ', '実用的な問題解決力'],
    challenges: ['長期的な計画が苦手', '退屈なルーティンが続くと辛い', '批判に敏感で落ち込みやすい'],
    keywords: ['楽しむ', 'エネルギー', '自発性', '社交性', '現在', '行動力'],
    gradient: 'from-yellow-300 via-lime-300 to-green-400',
    gradientFrom: '#fde047',
    gradientTo: '#4ade80',
    compatibleWith: ['ISFJ', 'ISTJ', 'ESFJ'],
  },
  ISFP: {
    code: 'ISFP',
    id: 'isfp',
    flower: 'タンポポ',
    flowerEn: 'Dandelion',
    emoji: '🌟',
    title: '穏やかな芸術家',
    tagline: '自分らしく咲くことが、最高のギフト',
    description: '美しさを感じ取り、自分だけの表現方法で世界と向き合う、自由な芸術家。あなたは穏やかでありながら強い信念を持ち、自分のペースで自分らしく生きます。タンポポのようにどこでも根を張り、自由に種を飛ばし、生命力にあふれています。感覚で世界を感じ、その美しさを独自の方法で表現します。',
    strengths: ['鋭い審美眼と豊かな感性', '柔軟で開かれた心', '現在の瞬間に完全に没入する力', '実用的なスキルと器用さ', '争いを避けて調和を保つ優しさ'],
    challenges: ['将来の計画や組織化が苦手', '自己主張が弱くなることがある', '批判に敏感で引きこもりがちになる'],
    keywords: ['感性', '自由', '芸術', '現在', '柔軟', '自然'],
    gradient: 'from-orange-300 via-yellow-300 to-amber-300',
    gradientFrom: '#fdba74',
    gradientTo: '#fcd34d',
    compatibleWith: ['ESFJ', 'ENFJ', 'ESTJ'],
  },
  ESFJ: {
    code: 'ESFJ',
    id: 'esfj',
    flower: 'ガーベラ',
    flowerEn: 'Gerbera',
    emoji: '🌸',
    title: '温かい調和者',
    tagline: 'みんなの笑顔が、あなたの最高の喜び',
    description: '人々のために尽くし、調和のとれた環境を作ることに喜びを見出す、温かい魂。あなたの気配りと思いやりで、周りの人は安心して自分を表現できます。ガーベラのように明るく開いた花びらで、みんなの心を温めます。社交的で責任感が強く、大切な人のために全力を尽くします。',
    strengths: ['高い共感力と細やかな気配り', '強い責任感と信頼性', '優れた組織力と実行力', '人間関係を大切にする力', '実用的なサポートと問題解決力'],
    challenges: ['他者の承認を必要としすぎる', '変化への適応が難しいことがある', '自分のニーズを後回しにしがち'],
    keywords: ['思いやり', '責任感', '調和', '協力', '実用性', '温かさ'],
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    gradientFrom: '#f472b6',
    gradientTo: '#f87171',
    compatibleWith: ['ISFP', 'ESFP', 'ISFJ'],
  },
  ISFJ: {
    code: 'ISFJ',
    id: 'isfj',
    flower: 'スミレ',
    flowerEn: 'Violet',
    emoji: '🫐',
    title: '優しい守り人',
    tagline: '静かに、でも確かに大切なものを守る',
    description: '献身的な愛情と細やかな気配りで、大切な人を支え続ける、誠実な魂。あなたは表立って目立つことは少ないかもしれませんが、その存在が周りの人の支えになっています。スミレのように慎ましやかでありながら、確かな存在感と芯の強さを持っています。',
    strengths: ['深い忠誠心と献身的なサポート', '細部への注意力と正確さ', '温かくて包容力のある性格', '実用的なスキルと器用さ', '強い責任感と信頼性'],
    challenges: ['自分の意見や感情を表現しにくい', '変化への適応に時間がかかる', '感謝されないと傷つきやすい'],
    keywords: ['献身', '忠誠', '気配り', '謙虚', '安定', '誠実'],
    gradient: 'from-violet-400 via-purple-400 to-indigo-400',
    gradientFrom: '#a78bfa',
    gradientTo: '#818cf8',
    compatibleWith: ['ESFP', 'ESTP', 'ESFJ'],
  },
  ESTP: {
    code: 'ESTP',
    id: 'estp',
    flower: 'ダリア',
    flowerEn: 'Dahlia',
    emoji: '🔥',
    title: '情熱的な挑戦者',
    tagline: '全力で生きる、それがあなたのスタイル',
    description: '行動力とエネルギーで現実の世界を駆け抜ける、大胆な魂。あなたはスリルと挑戦を愛し、頭で考えるより先に体が動くタイプです。ダリアのように大胆で鮮やかな存在感で、周りを圧倒します。どんな状況でも即座に最善の行動を取る、天性の問題解決者です。',
    strengths: ['卓越した実践的問題解決能力', '高いエネルギーと行動力', '鋭い観察力と環境への適応力', '論理的で直接的なコミュニケーション', 'プレッシャーの中での冷静さ'],
    challenges: ['長期的な計画より即時の行動を優先', '感情的な側面への配慮が不足しがち', 'ルールや制約が苦手'],
    keywords: ['行動力', '挑戦', '現実的', '機転', '大胆', '適応力'],
    gradient: 'from-orange-500 via-red-500 to-rose-500',
    gradientFrom: '#f97316',
    gradientTo: '#f43f5e',
    compatibleWith: ['ISFJ', 'ISTJ', 'ISFP'],
  },
  ISTP: {
    code: 'ISTP',
    id: 'istp',
    flower: 'サボテン',
    flowerEn: 'Cactus',
    emoji: '🌵',
    title: '孤高の職人',
    tagline: '少ない言葉で、確かな仕事をする',
    description: '実用的なスキルと鋭い観察力を持つ、独立した職人気質の魂。あなたは自分のペースで物事を深く追求し、必要なときに驚くほどの能力を発揮します。サボテンのように外は独立しているように見えても、内側には豊かな生命力を持っています。実際に手を動かして物事を理解する、天性のエンジニアです。',
    strengths: ['優れた実用的スキルと器用さ', '冷静で論理的な問題分析力', '効率的で無駄のない行動', '高い独立性と自己管理能力', '緊急事態での落ち着きと対応力'],
    challenges: ['感情や対人関係の管理が難しい', '長期的なコミットメントが苦手', 'ルーティンワークに飽きやすい'],
    keywords: ['実用的', '独立', '論理的', '職人', '観察力', '冷静'],
    gradient: 'from-green-500 via-teal-500 to-slate-500',
    gradientFrom: '#22c55e',
    gradientTo: '#64748b',
    compatibleWith: ['ESTJ', 'ESFJ', 'ENTJ'],
  },
  ESTJ: {
    code: 'ESTJ',
    id: 'estj',
    flower: 'カーネーション',
    flowerEn: 'Carnation',
    emoji: '🌺',
    title: '実直なリーダー',
    tagline: '誠実さと責任感で、信頼を積み重ねる',
    description: '秩序と責任感を大切にし、周りを正しい方向に導く、実直な魂。あなたは頼りがいがあり、約束を必ず守る誠実さで周りから絶大な信頼を得ています。カーネーションのように凛として長く愛される存在で、組織や家族の中心となってみんなをまとめます。',
    strengths: ['強い組織力とリーダーシップ', '高い責任感と信頼性', '実用的で効率的な問題解決', '明確な価値観と判断基準', '安定したコミュニティの構築力'],
    challenges: ['柔軟性が不足することがある', '感情よりルールを優先しすぎる', '新しいアイデアへの抵抗感'],
    keywords: ['責任感', '組織力', '誠実', '効率', '伝統', '信頼'],
    gradient: 'from-amber-400 via-yellow-400 to-lime-400',
    gradientFrom: '#fbbf24',
    gradientTo: '#a3e635',
    compatibleWith: ['ISTP', 'INTP', 'ISFJ'],
  },
  ISTJ: {
    code: 'ISTJ',
    id: 'istj',
    flower: 'さくら',
    flowerEn: 'Cherry Blossom',
    emoji: '🌸',
    title: '誠実な守護者',
    tagline: '約束を守り続けることが、あなたの強さ',
    description: '信頼性と責任感を兼ね備えた、誠実な守護者。あなたは一度決めたことをやり遂げる強い意志と、細部まで丁寧に対応する几帳面さで、周りから絶大な信頼を得ています。さくらのように毎年必ず咲く約束を守る誠実さと、その一瞬の美しさに真摯に向き合う姿勢があります。',
    strengths: ['揺るぎない信頼性と責任感', '優れた計画力と時間管理', '細部へのこだわりと正確さ', '強い意志力と持続力', '実用的かつ効率的な思考'],
    challenges: ['変化への適応に時間がかかる', '柔軟性が低く頑固になることがある', '他者との感情的なつながりが不得手'],
    keywords: ['信頼性', '誠実', '計画的', '忠実', '責任感', '堅実'],
    gradient: 'from-pink-300 via-rose-300 to-fuchsia-300',
    gradientFrom: '#f9a8d4',
    gradientTo: '#e879f9',
    compatibleWith: ['ESTP', 'ESFP', 'ESTJ'],
  },
};
