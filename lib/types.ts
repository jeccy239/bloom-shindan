export type BloomTypeId =
  | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08'
  | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

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

export interface BloomTypeDef {
  id: BloomTypeId;
  catchTitle: string;
  jobTitle: string;
  catchCopy: string;
  stats: DiagnosisStats;
  battlePower: number;
  jobs: string[];
  hobbies: string[];
  compatibleType: BloomTypeId;
  compatibleReason: string;
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
    jobTitle: '誰も解けない問題を一人で解くエンジニア',
    catchCopy: '静かに、でも誰より深く',
    stats: { analysis: 99, action: 30, empathy: 25, expression: 20, change: 35 },
    battlePower: 8420,
    jobs: ['エンジニア', '研究者', 'データサイエンティスト', '投資家'],
    hobbies: ['プログラミング', '将棋', '読書', 'ひとり旅'],
    compatibleType: '10',
    compatibleReason: '自分にない行動力と発信力を持つ最強の相棒',
    description: '誰よりも深く考え、一人で解を見つけ出す。感情より論理、群衆より孤独。あなたの頭の中には他の誰も踏み込めない知的宇宙がある。静かに、でも誰より深く。',
  },
  '02': {
    id: '02',
    catchTitle: '影の参謀',
    jobTitle: '誰も気づかない戦略を静かに立案する参謀',
    catchCopy: '暗闇で輝く知性',
    stats: { analysis: 90, action: 35, empathy: 30, expression: 40, change: 75 },
    battlePower: 8650,
    jobs: ['戦略コンサルタント', 'アナリスト', 'スタートアップCTO', 'ベンチャーキャピタリスト'],
    hobbies: ['チェス', 'ランニング', 'ポッドキャスト', '投資'],
    compatibleType: '09',
    compatibleReason: '大胆な開拓者と緻密な参謀が組むと革命が生まれる',
    description: '表舞台には立たずとも、戦略の要は常にあなたが握っている。冷静な分析と先読みの力で、チームの方向性を静かに、しかし確実に変えていく。',
  },
  '03': {
    id: '03',
    catchTitle: '共感の達人',
    jobTitle: '人の心を動かすコミュニティリーダー',
    catchCopy: '心を動かすのが天命',
    stats: { analysis: 30, action: 40, empathy: 95, expression: 80, change: 55 },
    battlePower: 7200,
    jobs: ['カウンセラー', 'HR担当者', 'SNSマーケター', 'コミュニティマネージャー'],
    hobbies: ['ボランティア', '料理', 'SNS発信', '音楽鑑賞'],
    compatibleType: '14',
    compatibleReason: '共感力と実行力が融合した最強チーム',
    description: 'あなたの一言が、誰かの心に深く刺さる。他者の感情を鋭く察知し、言葉と行動で包み込む。人の心を動かすのは、あなたにとって天性の才能だ。',
  },
  '04': {
    id: '04',
    catchTitle: '不動の守護者',
    jobTitle: '嵐の中でも揺るがない組織の砦',
    catchCopy: '揺るがぬ安定こそ最強',
    stats: { analysis: 35, action: 30, empathy: 85, expression: 25, change: 20 },
    battlePower: 6800,
    jobs: ['教師', '公務員', '医療職', '福祉職'],
    hobbies: ['園芸', '料理', '読書', '神社巡り'],
    compatibleType: '13',
    compatibleReason: '安定の守護者と変革者の絶妙なバランス',
    description: 'どんな嵐の中でも揺るがない、静かな砦。派手さはないが、その安定感と誠実さが周りの人を支え続ける。最後に頼られるのは、必ずあなただ。',
  },
  '05': {
    id: '05',
    catchTitle: '時代を創る者',
    jobTitle: '次の時代を最初に動き出す起業家',
    catchCopy: '行動が世界を変える',
    stats: { analysis: 55, action: 90, empathy: 60, expression: 75, change: 85 },
    battlePower: 9100,
    jobs: ['起業家', 'プロデューサー', 'ベンチャーキャピタリスト', 'ソーシャルアントレプレナー'],
    hobbies: ['ネットワーキング', '旅行', 'スポーツ', 'ビジネス書'],
    compatibleType: '08',
    compatibleReason: 'ビジョンと緻密な計画が合わさると無敵になれる',
    description: '行動力と共感力を武器に、誰も思い描けなかった未来を形にする。あなたが動く場所には必ず変革が生まれ、人々がついてくる。',
  },
  '06': {
    id: '06',
    catchTitle: '冷静な支配者',
    jobTitle: '混乱した戦場で最善手を打つCOO',
    catchCopy: '感情を超えた判断力',
    stats: { analysis: 45, action: 85, empathy: 70, expression: 60, change: 50 },
    battlePower: 8900,
    jobs: ['経営者', '弁護士', 'ファンドマネージャー', '外科医'],
    hobbies: ['ゴルフ', '武道', '歴史研究', '海外旅行'],
    compatibleType: '07',
    compatibleReason: '行動と共感と変革の視点が交わる最高の組み合わせ',
    description: '感情に流されず、常に最善手を打つ。あなたの冷静な判断力と行動力は、混乱した状況でこそ輝く。戦場で最も頼りになる指揮官だ。',
  },
  '07': {
    id: '07',
    catchTitle: '未来の預言者',
    jobTitle: 'まだ見ぬ社会課題を先読みするソーシャルイノベーター',
    catchCopy: '未来は今ここに見えている',
    stats: { analysis: 45, action: 35, empathy: 80, expression: 65, change: 80 },
    battlePower: 7500,
    jobs: ['NPO代表', 'UXデザイナー', '社会起業家', 'コミュニティマネージャー'],
    hobbies: ['ヨガ', '瞑想', '読書', '旅行'],
    compatibleType: '06',
    compatibleReason: '行動力と変革のビジョンが最高の形で組み合わさる',
    description: '今まだ誰も気づいていない「次のトレンド」を、あなたは静かに見えている。共感力と変革への情熱を武器に、世界をより良い方向へ動かしていく。',
  },
  '08': {
    id: '08',
    catchTitle: '完璧な設計者',
    jobTitle: '誰も気づかない細部まで設計し尽くすアーキテクト',
    catchCopy: '完璧を、静かに追求する',
    stats: { analysis: 50, action: 40, empathy: 75, expression: 45, change: 30 },
    battlePower: 7800,
    jobs: ['建築家', 'システムエンジニア', 'プロジェクトマネージャー', '品質管理'],
    hobbies: ['DIY', 'パズル', '料理', '登山'],
    compatibleType: '05',
    compatibleReason: '完璧な設計図とダイナミックな実行力が出会う時',
    description: '「なんとなく」では動かない。あなたの頭の中には常に緻密な設計図がある。チームの中で縁の下の力持ちとして、最高品質のアウトプットを静かに届け続ける。',
  },
  '09': {
    id: '09',
    catchTitle: '無謀な開拓者',
    jobTitle: '地図なき荒野を単独で切り開く冒険家',
    catchCopy: '前例なき道を突き進む',
    stats: { analysis: 85, action: 99, empathy: 50, expression: 90, change: 98 },
    battlePower: 9980,
    jobs: ['連続起業家', '冒険家', '宇宙開発エンジニア', 'ベンチャーキャピタリスト'],
    hobbies: ['登山', '格闘技', '冒険旅行', 'ゲーム開発'],
    compatibleType: '02',
    compatibleReason: '無謀な行動力と緻密な戦略が組み合わさると無敵',
    description: '常識？知らん。地図？いらない。前人未踏の荒野に、ただ一人飛び込んでいく。破壊的なエネルギーと圧倒的な行動力で、新しい時代そのものを創り上げる。',
  },
  '10': {
    id: '10',
    catchTitle: '熱狂の伝道師',
    jobTitle: '場の空気を熱狂に変えるカリスマリーダー',
    catchCopy: '熱狂を、伝播させる',
    stats: { analysis: 75, action: 90, empathy: 45, expression: 85, change: 65 },
    battlePower: 9400,
    jobs: ['インフルエンサー', '起業家', 'ビジネス開発', 'プロスポーツ選手'],
    hobbies: ['SNS発信', 'スポーツ', '旅行', 'ネットワーキング'],
    compatibleType: '01',
    compatibleReason: '孤高の天才の深さと伝道師の熱量が融合する',
    description: 'あなたが話すと、人が集まる。あなたが動くと、場が変わる。知性と情熱と行動力を兼ね備えた、稀有な存在。熱狂を生み出すのが、あなたの天命だ。',
  },
  '11': {
    id: '11',
    catchTitle: '孤高の職人',
    jobTitle: '誰も追いつけない技術を静かに磨く職人',
    catchCopy: '唯一無二を、黙々と磨く',
    stats: { analysis: 50, action: 80, empathy: 60, expression: 35, change: 40 },
    battlePower: 8200,
    jobs: ['デザイナー', '職人', 'フリーランスエンジニア', 'アーティスト'],
    hobbies: ['アート', 'DIY', 'ゲーム', '釣り'],
    compatibleType: '15',
    compatibleReason: '職人の技術力と魔術師の発信力が組むと革命が起きる',
    description: '「一番」ではなく「唯一」を目指す。黙々と自分の技を磨き続け、誰も追いつけないクオリティを静かに積み上げる。それがあなたの戦い方だ。',
  },
  '12': {
    id: '12',
    catchTitle: '型破りの革命家',
    jobTitle: '古い秩序を壊して新しいルールを創るゲームチェンジャー',
    catchCopy: '壊してこそ、創れる',
    stats: { analysis: 40, action: 85, empathy: 55, expression: 50, change: 90 },
    battlePower: 8700,
    jobs: ['スタートアップファウンダー', 'ハッカー', 'クリエイター', '投資家'],
    hobbies: ['プログラミング', 'DJ', '筋トレ', '起業'],
    compatibleType: '16',
    compatibleReason: '革命家の熱気を癒し手が受け止め補い合う',
    description: '慣習？ルール？関係ない。あなたが通ると、既存の秩序が揺らぐ。孤独を恐れず、変革を恐れず、ただ自分の信じる道を突き進む。',
  },
  '13': {
    id: '13',
    catchTitle: '魂の扇動者',
    jobTitle: '不特定多数の心に火をつけるカリスマ発信者',
    catchCopy: '言葉と情熱で火をつける',
    stats: { analysis: 80, action: 85, empathy: 35, expression: 75, change: 85 },
    battlePower: 9200,
    jobs: ['マーケター', 'コピーライター', '営業エース', 'ブロガー'],
    hobbies: ['執筆', 'SNS', 'トレーニング', '映画鑑賞'],
    compatibleType: '04',
    compatibleReason: '扇動者の熱意と守護者の安定感が支え合う',
    description: '言葉と行動で、人の心に火をつける。あなたが語りかけると、無関心だった人が突然動き出す。社会を変える原動力は、あなたの情熱から生まれる。',
  },
  '14': {
    id: '14',
    catchTitle: '現場の守護神',
    jobTitle: '現場の複雑な問題を確実に解決するプロ',
    catchCopy: '現場力こそ最強の武器',
    stats: { analysis: 70, action: 88, empathy: 40, expression: 55, change: 45 },
    battlePower: 8800,
    jobs: ['プロジェクトリーダー', 'コンサルタント', '士業', '開発エンジニア'],
    hobbies: ['読書', '筋トレ', 'カラオケ', '旅行'],
    compatibleType: '03',
    compatibleReason: '現場の実行力と共感力が融合した最強チーム',
    description: '現場のことを誰よりも知っている。理論と行動力を兼ね備え、チームの実力を最大限に引き出す。あなたがいるだけで、プロジェクトの成功確率が跳ね上がる。',
  },
  '15': {
    id: '15',
    catchTitle: '言葉の魔術師',
    jobTitle: '一本の文章で1000人の行動を変える編集者',
    catchCopy: '言葉は、世界を変える',
    stats: { analysis: 88, action: 45, empathy: 50, expression: 90, change: 70 },
    battlePower: 8950,
    jobs: ['作家', '編集者', 'マーケター', '研究者'],
    hobbies: ['執筆', '読書', 'ゲーム', '映画'],
    compatibleType: '11',
    compatibleReason: '言葉の力と職人の技術力が組み合わさる最強コンビ',
    description: '一本の文章で、世界を変える力がある。静かな外見の内側に、溢れ出す知識と表現欲が眠っている。あなたの言葉は、読む人の人生を変える。',
  },
  '16': {
    id: '16',
    catchTitle: '魂の癒し手',
    jobTitle: '傷ついた心を静かに回復させるヒーラー',
    catchCopy: 'あなたのそばで、心が安らぐ',
    stats: { analysis: 80, action: 35, empathy: 65, expression: 45, change: 35 },
    battlePower: 7900,
    jobs: ['カウンセラー', 'コーチ', 'セラピスト', '教育者'],
    hobbies: ['絵を描く', 'ヨガ', '読書', '自然散策'],
    compatibleType: '12',
    compatibleReason: '癒し手の静けさと革命家の情熱が補い合う',
    description: 'あなたのそばにいると、なぜか安心する。分析と共感の両方を持つあなたは、人の心の深いところに届くケアができる唯一無二の存在だ。',
  },
};
