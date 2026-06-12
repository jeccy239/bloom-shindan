export type BloomTypeId =
  | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08'
  | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

export type AbilityRank = 'S' | 'A' | 'B' | 'C' | 'D';
export type Faction = '知略陣営' | '統治陣営' | '創造陣営' | '共鳴陣営';
export type FactionColor = 'blue' | 'red' | 'purple' | 'gold';
export type Rarity = 'SSR' | 'SR' | 'R' | 'N';

export interface AxisScore {
  axis1: number; // エネルギー源: L=内省派, H=行動派
  axis2: number; // 思考スタイル: L=共感, H=分析
  axis3: number; // 環境適性: L=個人, H=チーム
  axis4: number; // 変化への態度: L=安定, H=変化
  axis5: number; // 表現スタイル: L=静か, H=発信
}

export interface QuestionChoice {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  scores: [number, number, number, number, number];
}

export interface Question {
  id: number;
  axis: 1 | 2 | 3 | 4 | 5;
  text: string;
  choices: QuestionChoice[];
}

export interface Answer {
  questionId: number;
  choiceLabel: 'A' | 'B' | 'C' | 'D';
  scores: [number, number, number, number, number];
}

export interface DiagnosisStats {
  analysis: number;
  action: number;
  empathy: number;
  expression: number;
  change: number;
}

export interface RPGStats {
  知力: number;
  創造力: number;
  統率力: number;
  共感力: number;
  行動力: number;
  精神力: number;
}

export interface SpecialSkill {
  emoji: string;
  name: string;
  level: number;
}

export interface GuildAbilities {
  分析力: AbilityRank;
  行動力: AbilityRank;
  共感力: AbilityRank;
  適応力: AbilityRank;
}

export interface BloomTypeDef {
  id: BloomTypeId;
  catchTitle: string;
  characterTitle: string;
  jobClass: string;
  faction: Faction;
  factionColor: FactionColor;
  guild: string;
  guildRole: string;
  guildTags: string[];
  abilities: GuildAbilities;
  jobTitle: string;
  catchCopy: string;
  stats: DiagnosisStats;
  battlePower: number;
  rpgStats: RPGStats;
  specialSkills: SpecialSkill[];
  populationPercent: number;
  rarity: Rarity;
  jobs: string[];
  hobbies: string[];
  compatibleType: BloomTypeId;
  compatibleReason: string;
  enemyType: BloomTypeId;
  description: string;
}

export interface DiagnosisResult {
  answers: Answer[];
  axisScores: AxisScore;
  typeId: BloomTypeId;
  battlePower: number;
  stats: DiagnosisStats;
  completedAt: string;
}

export const BLOOM_TYPES: Record<BloomTypeId, BloomTypeDef> = {
  '01': {
    id: '01',
    catchTitle: '孤高の天才',
    characterTitle: '黒衣の賢者',
    jobClass: 'アークセージ',
    faction: '知略陣営',
    factionColor: 'blue',
    guild: '知識ギルド',
    guildRole: '深淵の探求者',
    guildTags: ['知識特化', '一匹狼', '思索家'],
    abilities: { 分析力: 'S', 行動力: 'D', 共感力: 'D', 適応力: 'C' },
    jobTitle: '誰も辿り着けない深さまで一人で掘り続けるスペシャリスト',
    catchCopy: '静かに、でも誰より深く',
    stats: { analysis: 92, action: 28, empathy: 20, expression: 22, change: 32 },
    battlePower: 12847,
    rpgStats: { 知力: 98, 創造力: 88, 統率力: 22, 共感力: 18, 行動力: 25, 精神力: 88 },
    specialSkills: [
      { emoji: '🧠', name: '未来予測', level: 5 },
      { emoji: '📖', name: '超速学習', level: 4 },
      { emoji: '🎯', name: '本質看破', level: 5 },
    ],
    populationPercent: 3,
    rarity: 'SSR',
    jobs: ['ソフトウェアエンジニア（専門職）', 'データサイエンティスト', '数学・物理系研究者', 'アクチュアリー（保険数理士）'],
    hobbies: ['深夜のコーディング', '数学パズル・詰将棋', 'SF・専門書', '一人旅'],
    compatibleType: '10',
    compatibleReason: '深く考えるあなたと、熱量で場を動かす炎ギルドが組む時、世界が動く',
    enemyType: '05',
    description: '会話より思索、チームより孤独、感情より論理。あなたが最も輝くのは、誰も踏み込んだことのない問題に一人で向き合う時だ。表面的な交流は得意じゃないが、頭の中に広がる知的宇宙は誰も追いつけない深さがある。長く付き合うほど「この人は本物だ」と思わせるタイプ。',
  },
  '02': {
    id: '02',
    catchTitle: '影の参謀',
    characterTitle: '軍師',
    jobClass: 'シャドウストラテジスト',
    faction: '知略陣営',
    factionColor: 'blue',
    guild: '参謀ギルド',
    guildRole: '暗闘の軍師',
    guildTags: ['策略家', '裏方の天才', '影の設計者'],
    abilities: { 分析力: 'S', 行動力: 'C', 共感力: 'D', 適応力: 'A' },
    jobTitle: '表舞台には立たず、戦略だけで勝負を決める知略家',
    catchCopy: '暗闇で輝く知性',
    stats: { analysis: 88, action: 32, empathy: 22, expression: 38, change: 78 },
    battlePower: 11650,
    rpgStats: { 知力: 95, 創造力: 72, 統率力: 65, 共感力: 22, 行動力: 38, 精神力: 85 },
    specialSkills: [
      { emoji: '🗡️', name: '暗闘策謀', level: 5 },
      { emoji: '📊', name: '情報解析', level: 5 },
      { emoji: '🎭', name: '正体秘匿', level: 4 },
    ],
    populationPercent: 5,
    rarity: 'SR',
    jobs: ['フリーランスコンサルタント', 'スタートアップ参謀・右腕', 'M&Aアドバイザー', '独立系投資家'],
    hobbies: ['チェス・将棋', '経済書・投資分析', 'ソロキャンプ', 'ポッドキャスト制作'],
    compatibleType: '09',
    compatibleReason: '大胆な開拓ギルドの前に、緻密な戦略を静かに置いておける唯一の存在',
    enemyType: '10',
    description: '組織の中で一番賢いのに、一番目立たないのがあなただ。チームより一人で動く方が力を発揮できる分析家で、誰も気づかない戦略を静かに実行する。変化を好みながらも内省的で、結果だけが語る仕事スタイルが持ち味。「実はこの人が全部設計してた」と後になって気づかれるタイプ。',
  },
  '03': {
    id: '03',
    catchTitle: '共感の達人',
    characterTitle: 'ヒーラー',
    jobClass: 'ソウルヒーラー',
    faction: '共鳴陣営',
    factionColor: 'gold',
    guild: '治癒ギルド',
    guildRole: '光を紡ぐ言葉の魔法使い',
    guildTags: ['癒し手', '感性の人', '言葉の力'],
    abilities: { 分析力: 'D', 行動力: 'C', 共感力: 'S', 適応力: 'B' },
    jobTitle: '一人ひとりの感情に寄り添いながら言葉で世界を変える人',
    catchCopy: '心を動かすのが天命',
    stats: { analysis: 28, action: 38, empathy: 92, expression: 82, change: 52 },
    battlePower: 10200,
    rpgStats: { 知力: 35, 創造力: 72, 統率力: 42, 共感力: 98, 行動力: 45, 精神力: 72 },
    specialSkills: [
      { emoji: '💖', name: '感情共鳴', level: 5 },
      { emoji: '🌿', name: '心の癒し', level: 5 },
      { emoji: '📝', name: '言葉紡ぎ', level: 4 },
    ],
    populationPercent: 8,
    rarity: 'R',
    jobs: ['キャリアコーチ・メンタルコーチ', 'カウンセラー・心理士', 'ライター（人物・感情系）', 'SNSクリエイター（個人）'],
    hobbies: ['ジャーナリング・手紙', 'カフェ巡り', '映画・ドラマ鑑賞', 'ボランティア活動'],
    compatibleType: '14',
    compatibleReason: '深い共感力と専門ギルドの行動力が組み合わさると、人を最大限に動かせる',
    enemyType: '13',
    description: '内向きの深さと、言葉で人を動かす力を同時に持つ稀有な存在。一人でじっくり感じ、考えた後、その感情を言葉にして外に出す。読んだ人・聞いた人の心に「そうそう、これだ」とダイレクトに届く。カウンセラーのように寄り添いながら、ライターのように言葉を紡ぐ。',
  },
  '04': {
    id: '04',
    catchTitle: '不動の守護者',
    characterTitle: '重装騎士',
    jobClass: 'アイアンガーディアン',
    faction: '統治陣営',
    factionColor: 'red',
    guild: '守護ギルド',
    guildRole: '銀の鎧の静かな番人',
    guildTags: ['守護者', '誠実な存在', '縁の下の力持ち'],
    abilities: { 分析力: 'D', 行動力: 'D', 共感力: 'A', 適応力: 'D' },
    jobTitle: '騒がしい世界で静かに誰かを守り続ける存在',
    catchCopy: '揺るがぬ安定こそ最強',
    stats: { analysis: 32, action: 28, empathy: 88, expression: 20, change: 18 },
    battlePower: 9800,
    rpgStats: { 知力: 38, 創造力: 28, 統率力: 55, 共感力: 92, 行動力: 32, 精神力: 98 },
    specialSkills: [
      { emoji: '🛡️', name: '鉄壁守護', level: 5 },
      { emoji: '🌳', name: '不動心', level: 5 },
      { emoji: '🤝', name: '無言の絆', level: 4 },
    ],
    populationPercent: 7,
    rarity: 'SR',
    jobs: ['看護師・介護福祉士', '保育士・幼稚園教諭', '図書館司書', '職人（陶芸・木工・刺繍等）'],
    hobbies: ['園芸・植物育て', '手仕事（編み物・陶芸）', '料理', '神社仏閣・自然散策'],
    compatibleType: '13',
    compatibleReason: '静かに守るあなたと、言葉と行動で動かす扇動ギルド。正反対だから完璧に補い合える',
    enemyType: '09',
    description: '自分からは多くを語らないが、その場にいるだけで空気が落ち着く。感情が豊かで人の痛みに敏感だが、それを大げさに表に出さない。地味に見えるかもしれないが、長く付き合うほど「この人がいないと困る」と気づかれる存在。変化より安定、派手さより誠実さを大切にする。',
  },
  '05': {
    id: '05',
    catchTitle: '時代を創る者',
    characterTitle: '発明王',
    jobClass: 'ワールドメーカー',
    faction: '創造陣営',
    factionColor: 'purple',
    guild: '革命ギルド',
    guildRole: '炎を纏う変革のリーダー',
    guildTags: ['時代の変革者', '情熱の塊', 'チームの火'],
    abilities: { 分析力: 'C', 行動力: 'S', 共感力: 'B', 適応力: 'S' },
    jobTitle: '人の感情を動かしてチームごと時代を変える社会変革者',
    catchCopy: '行動が、世界を変える',
    stats: { analysis: 48, action: 88, empathy: 65, expression: 72, change: 88 },
    battlePower: 13200,
    rpgStats: { 知力: 52, 創造力: 95, 統率力: 82, 共感力: 68, 行動力: 95, 精神力: 72 },
    specialSkills: [
      { emoji: '🔥', name: '変革の炎', level: 5 },
      { emoji: '👑', name: '心の掌握', level: 4 },
      { emoji: '🌍', name: '世界再構築', level: 5 },
    ],
    populationPercent: 4,
    rarity: 'SSR',
    jobs: ['ソーシャルアントレプレナー', 'NPO・NGO代表', 'コミュニティプロデューサー', '組織開発コンサルタント'],
    hobbies: ['コミュニティ運営', '旅行（人との交流目的）', 'ダンス・音楽・アート', 'ボランティア活動'],
    compatibleType: '08',
    compatibleReason: 'あなたのダイナミックな動きを、設計ギルドが緻密に支えてくれる最強の補完関係',
    enemyType: '01',
    description: '肩書きも既存のルールも関係ない。「こうあるべき」と感じた世界を、チームを巻き込みながら実際に形にしてしまう実行者。感性と行動力で人を惹きつけ、変化への情熱でチームを前進させる。ロジックより感情で動き、それが結果として人を動かす原動力になる。',
  },
  '06': {
    id: '06',
    catchTitle: '冷静な支配者',
    characterTitle: '皇帝',
    jobClass: 'エンペラーロード',
    faction: '統治陣営',
    factionColor: 'red',
    guild: '統率ギルド',
    guildRole: '黄金の鎧を纏う将軍',
    guildTags: ['統率力', '組織の要', '不動の柱'],
    abilities: { 分析力: 'C', 行動力: 'A', 共感力: 'B', 適応力: 'C' },
    jobTitle: '感情に流されず、冷静な判断力と統率力で組織を制する支配者',
    catchCopy: '人を束ね、確実に前進する',
    stats: { analysis: 42, action: 85, empathy: 68, expression: 58, change: 45 },
    battlePower: 12500,
    rpgStats: { 知力: 78, 創造力: 45, 統率力: 98, 共感力: 55, 行動力: 88, 精神力: 88 },
    specialSkills: [
      { emoji: '⚔️', name: '覇道支配', level: 5 },
      { emoji: '🧊', name: '冷静判断', level: 5 },
      { emoji: '👁️', name: '全知全覧', level: 4 },
    ],
    populationPercent: 5,
    rarity: 'SR',
    jobs: ['学校教師（学年主任・学担）', 'スポーツチームコーチ・監督', 'チームリーダー（製造・建設・医療）', '地域コミュニティリーダー'],
    hobbies: ['スポーツ指導・審判', '地域活動・PTA', '料理（大人数のために）', '家族との時間'],
    compatibleType: '07',
    compatibleReason: 'あなたの安定した基盤と、変革のビジョンを持つ預言ギルドが組めば止まらない',
    enemyType: '12',
    description: '感情に流されず、常に俯瞰で状況を支配する。チームのリーダーというより、盤上の駒を動かす指揮官。冷静な判断力と揺るぎない統率力で組織を動かし、結果だけで語る。畏怖と信頼が同居する存在で、「あの人が決めたなら従う」と言わせる力がある。',
  },
  '07': {
    id: '07',
    catchTitle: '未来の預言者',
    characterTitle: '預言者',
    jobClass: 'オラクル',
    faction: '知略陣営',
    factionColor: 'blue',
    guild: '預言ギルド',
    guildRole: '星を読むビジョナリー',
    guildTags: ['先見者', '感性の旅人', '社会の羅針盤'],
    abilities: { 分析力: 'C', 行動力: 'D', 共感力: 'A', 適応力: 'A' },
    jobTitle: 'まだ誰も見えていない社会課題を先読みして動き出す人',
    catchCopy: '未来は今ここに見えている',
    stats: { analysis: 42, action: 32, empathy: 82, expression: 62, change: 82 },
    battlePower: 11800,
    rpgStats: { 知力: 85, 創造力: 92, 統率力: 35, 共感力: 82, 行動力: 32, 精神力: 75 },
    specialSkills: [
      { emoji: '🔮', name: '未来視', level: 5 },
      { emoji: '✨', name: '社会直観', level: 5 },
      { emoji: '🌟', name: '星の読解', level: 4 },
    ],
    populationPercent: 6,
    rarity: 'SR',
    jobs: ['UXデザイナー・サービスデザイナー', '社会起業家', 'NPOプログラムディレクター', '教育テック・エデュテック'],
    hobbies: ['ヨガ・瞑想', '哲学書・社会課題系読書', 'バックパック旅行', 'ドキュメンタリー鑑賞'],
    compatibleType: '06',
    compatibleReason: '変革のビジョンを持つあなたと、統率ギルドの安定した実行力が出会う時に最大の力が生まれる',
    enemyType: '14',
    description: '今まだ誰も言語化していない「次の社会課題」が、あなたにはなんとなく見えている。感性と共感力で人の困りごとを察知し、チームで解決の道を探る。静かに内省しながらも、変化を恐れずに動ける。アーティストとビジョナリーの中間にいるような、独自の感性の持ち主。',
  },
  '08': {
    id: '08',
    catchTitle: '完璧な設計者',
    characterTitle: '建築士',
    jobClass: 'アーキテクト',
    faction: '知略陣営',
    factionColor: 'blue',
    guild: '設計ギルド',
    guildRole: '羽ペンを持つ静かな建築家',
    guildTags: ['縁の下の力持ち', '精密な設計者', '安定の基盤'],
    abilities: { 分析力: 'C', 行動力: 'D', 共感力: 'A', 適応力: 'D' },
    jobTitle: '完璧でないものは出さない。細部まで設計し尽くした構造を作る人',
    catchCopy: '静かに、確実に、完成させる',
    stats: { analysis: 45, action: 38, empathy: 72, expression: 42, change: 28 },
    battlePower: 11200,
    rpgStats: { 知力: 88, 創造力: 82, 統率力: 42, 共感力: 72, 行動力: 38, 精神力: 88 },
    specialSkills: [
      { emoji: '🏗️', name: '完璧設計', level: 5 },
      { emoji: '🔬', name: '細部分析', level: 5 },
      { emoji: '🎯', name: '精度強化', level: 4 },
    ],
    populationPercent: 4,
    rarity: 'SSR',
    jobs: ['プロジェクトマネージャー', '人事担当者（制度設計・労務）', '医療事務・診療情報管理士', 'チームオペレーション専門職'],
    hobbies: ['パズル・謎解き', '料理（レシピ通りに丁寧に）', 'DIY・インテリア', '植物育て'],
    compatibleType: '05',
    compatibleReason: 'あなたの緻密な設計図と、革命ギルドの実行力が出会った時に最大の成果が生まれる',
    enemyType: '10',
    description: '完璧でないものは出さない。細部まで設計し尽くした構造物は、崩れることなく何年も機能し続ける。「なんとなく」という言葉が存在しない。すべてに理由があり、理由のないものは排除する。チームの感情も組織の動きも、あなたにとっては設計対象だ。静かだが、その精度は誰も追いつけない。',
  },
  '09': {
    id: '09',
    catchTitle: '無謀な開拓者',
    characterTitle: '冒険家',
    jobClass: 'フロンティア',
    faction: '創造陣営',
    factionColor: 'purple',
    guild: '開拓ギルド',
    guildRole: '荒野を駆ける冒険者',
    guildTags: ['フロンティア', '無謀な挑戦者', '破壊と創造'],
    abilities: { 分析力: 'A', 行動力: 'S', 共感力: 'C', 適応力: 'S' },
    jobTitle: '前例も地図もない荒野に、分析と情熱でチームを率いて飛び込む人',
    catchCopy: '前例なき道を突き進む',
    stats: { analysis: 85, action: 98, empathy: 45, expression: 88, change: 98 },
    battlePower: 14200,
    rpgStats: { 知力: 88, 創造力: 82, 統率力: 78, 共感力: 38, 行動力: 99, 精神力: 88 },
    specialSkills: [
      { emoji: '⚡', name: '無限突破', level: 5 },
      { emoji: '🏔️', name: '荒野踏破', level: 5 },
      { emoji: '💥', name: '限界突破', level: 5 },
    ],
    populationPercent: 3,
    rarity: 'SSR',
    jobs: ['スタートアップ創業者・CEO', 'ベンチャーキャピタリスト', '連続起業家', '事業開発責任者（BizDev）'],
    hobbies: ['登山（アルパイン・岩登り）', '格闘技・武道', '新規事業企画', 'トライアスロン・マラソン'],
    compatibleType: '02',
    compatibleReason: 'あなたの圧倒的な行動力の前に、参謀ギルドが緻密な戦略を静かに置いておける',
    enemyType: '04',
    description: '常識という壁が、あなたには出発点にしか見えない。分析力と行動力と変革への情熱を全部持ち合わせ、チームを引き連れて前人未踏の荒野に飛び込む。失敗しても揺るがない。むしろ「やっと面白くなってきた」と加速する。あなたが動く場所には、新しい時代が生まれる。',
  },
  '10': {
    id: '10',
    catchTitle: '熱狂の伝道師',
    characterTitle: '聖火の使徒',
    jobClass: 'インフルエンサー',
    faction: '共鳴陣営',
    factionColor: 'gold',
    guild: '炎ギルド',
    guildRole: '場を燃やす情熱の使者',
    guildTags: ['熱狂', '場を動かす力', '伝道師'],
    abilities: { 分析力: 'A', 行動力: 'S', 共感力: 'C', 適応力: 'B' },
    jobTitle: '論理と熱量でチームを動かし、場を熱狂に変えるリーダー',
    catchCopy: '熱狂を、伝播させる',
    stats: { analysis: 78, action: 90, empathy: 42, expression: 82, change: 55 },
    battlePower: 13800,
    rpgStats: { 知力: 75, 創造力: 72, 統率力: 82, 共感力: 52, 行動力: 92, 精神力: 68 },
    specialSkills: [
      { emoji: '🔥', name: '熱狂感染', level: 5 },
      { emoji: '📣', name: '場の支配', level: 5 },
      { emoji: '⚡', name: 'エネルギー波', level: 4 },
    ],
    populationPercent: 9,
    rarity: 'R',
    jobs: ['マーケティングディレクター', 'PRプロデューサー・ブランドマネージャー', '大型プロジェクトリーダー', 'スポーツエージェント・スポーツビジネス'],
    hobbies: ['チームスポーツ（サッカー・バスケ等）', 'SNS・メディア発信', '読書会・勉強会主宰', 'ネットワーキングイベント'],
    compatibleType: '01',
    compatibleReason: '場を熱狂させる炎ギルドと、誰も届かない深さを持つ知識ギルド。正反対が最強になる',
    enemyType: '02',
    description: 'あなたが話すと、人が集まる。あなたが動くと、場の空気が変わる。論理と熱量を両方持ちながら、チームの中で火をつける役割を自然と担う。安定した土台の上で、持続的に影響力を発揮し続けるタイプ。一時の盛り上がりではなく、長く人の記憶に残る存在だ。',
  },
  '11': {
    id: '11',
    catchTitle: '孤高の職人',
    characterTitle: '鍛冶師',
    jobClass: 'マスタースミス',
    faction: '統治陣営',
    factionColor: 'red',
    guild: '職人ギルド',
    guildRole: '炉端に立つ無口な鍛冶師',
    guildTags: ['職人気質', '唯一無二の技', '黙々と磨く'],
    abilities: { 分析力: 'C', 行動力: 'A', 共感力: 'B', 適応力: 'C' },
    jobTitle: '自分の手と感性だけで、唯一無二の仕事を黙々と積み上げる職人',
    catchCopy: '唯一無二を、黙々と磨く',
    stats: { analysis: 42, action: 82, empathy: 62, expression: 32, change: 35 },
    battlePower: 11500,
    rpgStats: { 知力: 65, 創造力: 92, 統率力: 28, 共感力: 58, 行動力: 85, 精神力: 95 },
    specialSkills: [
      { emoji: '🔨', name: '神業鍛造', level: 5 },
      { emoji: '🎯', name: '職人の目', level: 5 },
      { emoji: '🛠️', name: '唯一無二', level: 4 },
    ],
    populationPercent: 6,
    rarity: 'SR',
    jobs: ['職人（料理人・大工・陶芸家・左官等）', 'フリーランスデザイナー・イラストレーター', '個人サロン・アトリエ経営者', 'インディペンデントアーティスト'],
    hobbies: ['料理・菓子作り（自分流）', 'DIY・ものづくり', 'フィジカルトレーニング', '釣り・登山'],
    compatibleType: '15',
    compatibleReason: 'あなたの深い技術力を、言霊ギルドが言葉と発信力で世界に届けてくれる',
    enemyType: '05',
    description: '「一番」ではなく「唯一」を目指す。黙々と手を動かし、誰も真似できない自分だけのやり方を作り上げる。チームより個人、スポットライトより実力。感情的で人情味があるが、それは表には出さない。長く続けること自体が誇りで、そこに深い充実感がある。',
  },
  '12': {
    id: '12',
    catchTitle: '型破りの革命家',
    characterTitle: '反逆者',
    jobClass: 'レボリューショナー',
    faction: '創造陣営',
    factionColor: 'purple',
    guild: '反逆ギルド',
    guildRole: '鎖を断ち切るアウトロー',
    guildTags: ['反骨精神', '型破り', '自由のために'],
    abilities: { 分析力: 'D', 行動力: 'A', 共感力: 'C', 適応力: 'S' },
    jobTitle: '既存のルールに縛られず、個人の力で新しいやり方を切り開く人',
    catchCopy: '壊してこそ、創れる',
    stats: { analysis: 38, action: 85, empathy: 55, expression: 48, change: 92 },
    battlePower: 12100,
    rpgStats: { 知力: 45, 創造力: 88, 統率力: 38, 共感力: 42, 行動力: 88, 精神力: 78 },
    specialSkills: [
      { emoji: '💣', name: '常識破壊', level: 5 },
      { emoji: '⚡', name: '自由解放', level: 5 },
      { emoji: '🔓', name: '鎖断ち', level: 4 },
    ],
    populationPercent: 4,
    rarity: 'SSR',
    jobs: ['個人起業家・フリーランサー（マルチスキル型）', 'ハッカー・インディペンデントエンジニア', 'クリエイター（YouTuber・ポッドキャスター等）', '独立系コンサルタント'],
    hobbies: ['筋トレ・格闘技', 'DJ・音楽制作', '新しいスキル習得・副業', 'プログラミング・ハッカソン'],
    compatibleType: '16',
    compatibleReason: 'あなたの激しいエネルギーを、賢者ギルドが静かに受け止めて補ってくれる',
    enemyType: '06',
    description: '既存のルールが邪魔に感じる。誰かに頼るより自分で動く方が好きで、感情と行動力で常識に挑み続ける。チームより個人、安定より変化。孤立しても気にしない。批判されても止まらない。あなたが通ると、今まであった「当たり前」が少し揺らぐ。',
  },
  '13': {
    id: '13',
    catchTitle: '魂の扇動者',
    characterTitle: '炎の演説家',
    jobClass: 'フレイムスピーカー',
    faction: '共鳴陣営',
    factionColor: 'gold',
    guild: '扇動ギルド',
    guildRole: '剣と言葉を持つ孤高の論客',
    guildTags: ['論理の戦士', '言葉で社会を動かす', '個の力'],
    abilities: { 分析力: 'A', 行動力: 'A', 共感力: 'D', 適応力: 'A' },
    jobTitle: '分析と行動力と独自の言葉で、一人で社会を動かす知性派',
    catchCopy: '言葉と行動で、時代を動かす',
    stats: { analysis: 82, action: 85, empathy: 32, expression: 72, change: 85 },
    battlePower: 12900,
    rpgStats: { 知力: 88, 創造力: 75, 統率力: 55, 共感力: 38, 行動力: 88, 精神力: 82 },
    specialSkills: [
      { emoji: '🔥', name: '炎の弁舌', level: 5 },
      { emoji: '⚔️', name: '論理の刃', level: 5 },
      { emoji: '🎤', name: '魂の言葉', level: 4 },
    ],
    populationPercent: 7,
    rarity: 'SR',
    jobs: ['ビジネス書作家・経済ライター', 'YouTuber・ポッドキャスター（知識・ビジネス系）', '独立コンサルタント・アドバイザー', 'スタートアップ顧問・エンジェル投資家'],
    hobbies: ['執筆・ブログ', 'トレーニング・マラソン', '映画・ドラマ（分析目的）', 'ビジネス書・経済書'],
    compatibleType: '04',
    compatibleReason: '激しく動くあなたの隣で、守護ギルドが静かに支え続けてくれる',
    enemyType: '03',
    description: '論理と行動力と独自の言葉を武器に、個人の力で状況を変えていく。チームより一人で動く方が強く、自分の世界観を発信することで人を動かす。感情より分析、変化への情熱が原動力。書いた記事・話したスピーチ・出したコンテンツが、時間差で大きな波紋を生む。',
  },
  '14': {
    id: '14',
    catchTitle: '現場の守護神',
    characterTitle: '戦場指揮官',
    jobClass: 'フィールドキーパー',
    faction: '統治陣営',
    factionColor: 'red',
    guild: '専門ギルド',
    guildRole: '鉄の意志を持つ現場の砦',
    guildTags: ['専門の極み', '現場最強', '一流のプロ'],
    abilities: { 分析力: 'A', 行動力: 'A', 共感力: 'D', 適応力: 'C' },
    jobTitle: '専門知識と行動力で、個人として確実な結果を出し続けるプロ',
    catchCopy: '専門性が、最強の武器になる',
    stats: { analysis: 72, action: 88, empathy: 38, expression: 52, change: 42 },
    battlePower: 12300,
    rpgStats: { 知力: 85, 創造力: 35, 統率力: 88, 共感力: 35, 行動力: 92, 精神力: 92 },
    specialSkills: [
      { emoji: '🏆', name: '現場支配', level: 5 },
      { emoji: '⚔️', name: '専門特化', level: 5 },
      { emoji: '🛡️', name: '鉄の意志', level: 4 },
    ],
    populationPercent: 8,
    rarity: 'R',
    jobs: ['弁護士・司法書士・行政書士', '公認会計士・税理士', '医師（専門医・開業医）', 'シニアエンジニア・技術スペシャリスト'],
    hobbies: ['資格・専門知識の勉強', 'ゴルフ', '歴史・伝記の読書', '一人旅・出張先の探索'],
    compatibleType: '03',
    compatibleReason: 'あなたの専門知識と行動力を、治癒ギルドが人の感情で繋いでくれる最高の相棒',
    enemyType: '07',
    description: '専門知識を武器に、個人として確実な結果を出し続ける。チームで動くより一人で深めた方が強く、分析と行動力で複雑な問題を着実に解決する。変化より安定した専門性を積み上げることに誇りがある。「この分野ならあの人」と真っ先に名前が上がる、信頼のプロフェッショナル。',
  },
  '15': {
    id: '15',
    catchTitle: '言葉の魔術師',
    characterTitle: '魔導書使い',
    jobClass: 'ワードメイジ',
    faction: '創造陣営',
    factionColor: 'purple',
    guild: '言霊ギルド',
    guildRole: '星を言葉に変える編集魔術師',
    guildTags: ['言葉で世界を変える', '構造の天才', '分析×発信'],
    abilities: { 分析力: 'S', 行動力: 'C', 共感力: 'C', 適応力: 'A' },
    jobTitle: '内省と分析から生まれた言葉で、チームと社会を動かす編集者',
    catchCopy: '言葉は、世界を変える',
    stats: { analysis: 88, action: 42, empathy: 45, expression: 88, change: 72 },
    battlePower: 12600,
    rpgStats: { 知力: 95, 創造力: 92, 統率力: 35, 共感力: 45, 行動力: 42, 精神力: 78 },
    specialSkills: [
      { emoji: '📖', name: '言霊発動', level: 5 },
      { emoji: '🎭', name: '構造魔法', level: 5 },
      { emoji: '✍️', name: '世界改変', level: 4 },
    ],
    populationPercent: 5,
    rarity: 'SR',
    jobs: ['編集者・クリエイティブディレクター', 'スタートアップCOO・創業者の右腕', '事業会社のコンテンツ責任者', '脚本家・構成作家'],
    hobbies: ['読書（月10冊以上）', '映画・批評・考察', '執筆・ブログ', 'ストラテジー系ゲーム'],
    compatibleType: '11',
    compatibleReason: '言葉の力と職人ギルドの技術力が出会う時、互いにない力が生まれる',
    enemyType: '14',
    description: '静かに見えるが、書いたものや話した言葉が後に大きな波紋を生む。内省的な深さと分析力をチームの変化のために使い、言葉を武器に社会に働きかける。一人で深く考えた後にチームで動く時、最大の力が出る。今まだ届いていない誰かに、言葉で届け続ける。',
  },
  '16': {
    id: '16',
    catchTitle: '魂の癒し手',
    characterTitle: '精霊巫女',
    jobClass: 'ソウルケアラー',
    faction: '共鳴陣営',
    factionColor: 'gold',
    guild: '賢者ギルド',
    guildRole: '静かな光を宿す精霊の巫女',
    guildTags: ['組織の知恵', '静かな影響力', '深い共感'],
    abilities: { 分析力: 'A', 行動力: 'D', 共感力: 'C', 適応力: 'D' },
    jobTitle: 'その場にいるだけで心が落ち着く、魂を癒す存在',
    catchCopy: 'あなたがいる場所は、なぜか人が戻ってくる',
    stats: { analysis: 82, action: 35, empathy: 48, expression: 42, change: 32 },
    battlePower: 10800,
    rpgStats: { 知力: 72, 創造力: 58, 統率力: 42, 共感力: 98, 行動力: 32, 精神力: 88 },
    specialSkills: [
      { emoji: '💫', name: '精霊の加護', level: 5 },
      { emoji: '🌿', name: '深層共感', level: 5 },
      { emoji: '🌈', name: '魂の修復', level: 4 },
    ],
    populationPercent: 16,
    rarity: 'N',
    jobs: ['組織コンサルタント・人事コンサルタント', '人事・組織開発専門家', 'シンクタンク研究員', '大学教員・専門学校講師'],
    hobbies: ['勉強会・読書会の参加・主宰', 'ヨガ・瞑想', 'ひとりで考える散歩', '美術館・展覧会巡り'],
    compatibleType: '12',
    compatibleReason: '静かに支える賢者ギルドと、型を破る反逆ギルド。正反対だから最高のチームになれる',
    enemyType: '13',
    description: 'その場にいるだけで、なんだか心が落ち着く。疲れた人の隣に自然と座り、言葉がなくてもそこにいるだけで回復できる空間を作る。共感力と精神力を両方持ち、チームの感情的な土台を静かに支える。癒しは意図ではなく本能。あなたがいる場所は、なぜか人が戻ってくる。',
  },
};
