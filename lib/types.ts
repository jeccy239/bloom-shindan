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
    description: '「なんでわかってもらえないんだろう」と感じることが多いあなた。誰かと話す時、相手が「え、そこまで考えてた？」と驚く場面が頻繁にある。あなたの頭の中には、他人が辿り着けない深さの思考が常に展開されているからだ。一人でいる時に最もエネルギーが満ちて、コーヒー1杯で夜が明けるくらい没頭できる。感情より事実、雰囲気より論理——それが揺るぎない価値観。周囲からは「近づきにくい」「クール」と思われがちだが、本当は内側で誰よりも激しく燃えている。自分の専門分野に触れた時の目の色が変わる瞬間、それがあなたの本当の姿だ。他人のペースに合わせると消耗するが、自分のペースで動ける環境では誰にも止められない。上位3%にしか存在しない、静かで深い天才。',
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
    description: '表舞台には立たない。でも気づいたら、物事がうまく動いている。それがあなたの仕事のやり方だ。誰も全体の構造を見ていない時、あなたは既に三手先を読んでいる。会議中は静かだが、終わった後に「実はあれ、こういう構造になっていて」と話すと全員がはっとする。変化への適応力が高く、情報を瞬時に整理して最適解を導く。信頼できない相手に自分の思考を晒すことを、本能的に嫌う。感情で動く人が少し苦手に感じることがあるが、それは彼らを否定しているのではなく、自分が感情で判断すると精度が落ちると知っているからだ。孤独を愛するが、孤立はしていない。気づけばいつも「あなたが必要な人」がそこにいる。「実はこの人が全部設計してた」と後で気づかれる、静かな天才。',
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
    description: '相手が言葉にできていなかった感情を、あなたは先に言語化してしまう。「そうそう、それが言いたかった」と言われる回数が、他の人より圧倒的に多い。一人でじっくり内省した後に出てくる言葉には、不思議なほど人の心に刺さるものがある。感受性が高く、映画やドラマで普通に感情移入する。他人の痛みに敏感で、「なんか最近元気ない？」と先に気づける人でもある。弱点は、感情に引っ張られすぎると自分自身が消耗してしまうこと。「つい人の悩みを全部抱えてしまう」という経験が何度もあるはずだ。でも、あなたの共感力と言語化能力の組み合わせは本当に稀有な才能。人の感情を言葉にして世界に届けることが、あなたにしかできない仕事だ。',
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
    description: '「あなたがいると安心する」という言葉を、これまで何度も言われてきた。自分では特別なことをしているつもりはないのに、なぜか周囲がそう感じる。それはあなたが「変わらない」からだ。感情が激しく揺れる場面でも、ゆっくりと揺るぎなく存在し続ける。誰かが傷ついていることに、誰よりも早く、静かに気づく。でも大げさには動かない。ただそこにいる——それがあなたの最強の力だ。変化を好まないのは怠惰ではなく、今あるものを守ることに深い意味を見出しているから。派手な舞台には立たないが、あなたがいるから崩れない場所がある。「縁の下の力持ち」という言葉が最もしっくりくるが、それは決して地味なことではない。あなたの存在なしに続く場所は、本当は脆い。',
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
    description: '「なぜ今の仕組みがこうなっているのか」が理解できず、「こうすべきだ」と感じたら動かずにいられない。あなたの周囲には、なぜか自然と人が集まってくる。それはあなたが「一緒に何かを変えよう」という空気を無意識に作り出しているからだ。感性で動き、感情でチームを動かし、最終的には結果として形にしてしまう。論理的な計画より、確信と勢いで突き進む。弱点は、熱量に任せて動きすぎると仕組みが追いつかなくなること。でもそれを補う人が必ず近くに現れる。あなたのエネルギーは、一人では生まれない化学反応を起こす触媒だ。世の中をより良くしたいという強い衝動が常にある。その衝動は本物で、あなたが動いた場所には必ず変化が残る。上位4%にしか存在しない、時代を変える者。',
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
    description: '感情的な場面でも冷静に状況を見渡せる。それがあなたの最大の強みであり、周囲が「あの人なら任せられる」と感じる理由だ。チームの感情状態を把握しながらも、それに流されることなく判断を下す。「感情的になっている場合ではない」という認識が常に働く。外から見るとクールに映るが、内側では組織全体の動きを計算し続けている。リーダーとして機能するのは天性だが、部下への共感が少し足りないと感じる瞬間もある。それを自覚しているあなたは、意識的にコミュニケーションを取ろうとする。安定した組織と確実な成果にこそ誇りがある。急な変化より着実な前進、派手さより持続性を好む。あなたが舵を取ることで、組織は長く、強く、機能し続ける。それが、あなたの静かな覇道だ。',
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
    description: '「なんとなくこっちの方が正しい気がする」という感覚が、数年後に現実になることが多い。データより感性、マニュアルより直感を信頼する。まだ誰も問題だと気づいていない段階で、社会の違和感を察知できる。ビジョンが先行するため「説明するのが難しい」と感じることが多いが、最終的にあなたが見ていたものの方が正しかった——という経験が積み重なっている。変化を恐れず、むしろ変化の中にこそ可能性を見出す。人の感情にも敏感で、チームの空気がよどむと真っ先に気づく。理想と現実のギャップに苦しむこともある。あなたの感性は時代を先取りしすぎているため、孤独を感じる瞬間がある。でもその先見性こそが、あなたにしか見えない景色だ。まだ誰も歩いていない道を、最初に照らす者がいる。',
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
    description: '「なんとなく」で物事を進めることができない。すべてに理由があり、理由のないことは排除される。あなたが作った仕組みは、誰も気づかないような細部まで設計されていて、何年後かに誰かが「なんでこれがうまくいくんだろう」と首をかしげる。チームのメンバーの感情にも配慮するが、それもシステムとして捉えている——どの人がどんな状態で、どのタイミングで関わると最も機能するか。「完璧でないものは出さない」という基準が時に自分を苦しめるが、それがあなたのクオリティを守っている。急かされると本来の力が出ない。でも十分な時間と環境があれば、誰も作れないものを作る。静かだが、その設計の精度には誰も追いつけない。あなたが設計した構造は、静かに、長く、機能し続ける。',
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
    description: '「前例がない」という言葉があなたの背中を押す。他の人が「リスクがある」と言う場所を、あなたは「面白い」と感じる。分析して、計算して、それでも飛び込む。失敗しても「データが取れた」と思えるのがあなただ。チームを率いる力もあるが、本当の原動力は常に自分自身の好奇心と挑戦欲だ。変化への耐性が極めて高く、環境が激しく変わるほど力を発揮する。弱点は、スピードが速すぎてチームがついてこられなくなること。でもそれはあなたが止まれないのではなく、見えている景色が先すぎるからだ。あなたが開いた道に、後から人が集まってくる。「誰もやったことがない」というのは、あなたにとって最高の動機だ。上位3%にしか存在しない、最前線の開拓者。',
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
    description: 'あなたが話し始めると、場の空気が変わる。なぜか人が前のめりになり、やる気が生まれる。それは意識的にやっているのではなく、あなたが本当に「面白い」「これはすごい」と感じているから、その熱量がそのまま伝わるのだ。論理と感情を両方使いこなし、相手に合わせて届け方を変えられる。チームの中で火種を作る役割を、自然と担う。安定した土台があるからこそ、その熱量が持続する。一時的な盛り上がりではなく、長期にわたって影響を与え続けるのがあなたの特徴だ。弱点は、テンションが高い時の判断が後で「やりすぎた」と感じることがあること。でも、あなたが走った後には確実に何かが変わっている。熱狂は伝播する——あなたの存在が、場を変える。',
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
    description: '「こだわりが強い」と言われることが多いが、それは当然だ。あなたにとって、妥協は自分の仕事への裏切りだから。黙々と手を動かし、誰かに見せるためではなく、自分の基準を満たすために磨き続ける。チームで働くことも嫌いではないが、本領は一人で集中できる時に発揮される。感情的で人情味があるが、それは親しい人にしか見せない。初対面では寡黙に見えるが、長く付き合うほど「この人は本物だ」と周囲が気づく。「一番」には興味がない。自分だけの「唯一」を目指している。その仕事への誠実さは、時間をかければ必ず形になる。流行に流されず、変化に振り回されず、自分のペースで積み上げる。それがあなたの最強の戦い方だ。',
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
    description: '「なぜそのルールが存在するのか」を考え始めると止まらない。「意味がない」と結論が出た瞬間に、それを無視して動き始める。あなたにとって「みんなそうしてる」は理由にならない。自分が正しいと感じたルートで、自分のやり方で突き進む。群れることへの抵抗感が強く、自分の判断を最も信頼している。批判されても動じない。むしろ「面白いな」と感じることすらある。弱点は、自分のペースを崩されることへの耐性が低いこと。でも、あなたが壊したところに新しい何かが生まれていることは事実だ。「普通に生きる」ということが最も難しい——そのくらい個性が強い。それはあなたの欠点ではなく、世界を動かすための唯一の武器だ。',
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
    description: '「これは違う」と感じた時、黙っていられない。論理で武装し、言葉を武器にして、一人で状況に立ち向かう。あなたの発信には独自の視点があり、同じことを言っても「あなたが言うと説得力が違う」と感じさせる何かがある。チームより個人、協調より独立を好む。感情より分析が先に動く。人の感情を後から理解することはできるが、最初は論理で判断する。弱点は、感情的なアプローチをする人との摩擦が生じやすいこと。でも、その孤高の姿勢が信頼の源でもある。ポジションや肩書きに関係なく、言うべきことを言える強さがある。書いたもの、話したこと、出したコンテンツが、時間差で大きな波紋を生む。あなたは、一人でも社会を動かせる。',
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
    description: '「専門外のことは話せない」が口癖かもしれないが、専門分野においては誰も追いつけない深さがある。データを見れば問題の在処がわかる。現場に立てば全体像が見える。あなたの強みは、知識と行動力が同時に存在することだ。「知っているだけ」でも「動くだけ」でもなく、両方が高水準にある。一匹狼的に動く方が本来の力が出る。安定した環境と明確な役割があれば、長期にわたって最大の成果を出し続ける。変化への適応が少し苦手なこともあるが、その分だけ専門性が研ぎ澄まされている。「この分野で困ったらあの人」と真っ先に名前が出る——それがあなたの存在価値だ。専門性という武器は、積み上げれば積み上げるほど、誰も越えられない壁になる。',
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
    description: '頭の中に常に言葉があふれているが、それを外に出す前に何度も精度を高める。「なぜこの言葉を使うのか」を本能的に考えている。普通の人が10の言葉で伝えることを、あなたは3の言葉で完璧に伝えてしまう。分析と内省が深く、物事の構造を見抜く力がある。一人で考え尽くした後にチームに還元する——この流れが最も力を発揮するパターンだ。静かに見えるが、書いたもの・話したことが後から大きな波紋を生む。「この人は言葉が違う」と周囲に言わせる何かがある。弱点は、完璧な言葉を追い求めるあまり、発信が遅くなること。でも、あなたが発する言葉にはそれだけの重みがある。言葉で世界を変えることができる、本当に稀有な能力の持ち主だ。',
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
    description: 'あなたがいる場所には、なぜか人が戻ってくる。自分では特別なことをしていないつもりでも、「あなたと話すと落ち着く」「ここにいると安心する」と言われる。それはあなたが「圧をかけない」からだ。傾聴できる。急かさない。否定しない。相手のペースをそのまま受け取ることができる。感受性が高く、場の空気の変化を敏感に察知する。チームや組織の感情的な土台を、静かに支えている。弱点は、自分のことより他人を優先しすぎて、気づいたら消耗していること。「自分は大丈夫」と言いながら、内側では限界に近い——そんな経験が何度もあるはずだ。でも、あなたが存在することで救われている人は確実にいる。見えにくい貢献だが、なくなって初めてその大きさが分かる。それが魂の癒し手の生き様だ。',
  },
};
