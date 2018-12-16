// Master Data
const elementsMaster = {
  flame: '火',
  water: '水',
  wind: '風',
  light: '光',
  shadow: '闇'
};
const levelsMaster = {
  none: '',
  beginner: '初級',
  standard: '中級',
  expert: '上級',
  master: '超級',
  extra: 'EX'
};
const questsMaster = [
  // {
  //   id: 'resplendent',
  //   name: '闇穿つ光の歌声',
  //   quests: [
  //     {
  //       id: 'sabnock',
  //       element: 'shadow',
  //       name: 'サブナック大討伐戦',
  //       levels: ['beginner', 'standard', 'expert', 'extra',]
  //     },
  //     {
  //       id: 'manticore',
  //       element: 'shadow',
  //       name: 'マンティコア討伐戦',
  //       levels: ['beginner', 'standard', 'expert',]
  //     }
  //   ]
  // },
  // {
  //   id: 'wish',
  //   name: '天つ風に願いを',
  //   quests: [
  //     {
  //       id: 'megafiend',
  //       element: 'water',
  //       name: '魔獣注意報！',
  //       levels: ['beginner', 'standard', 'expert',]
  //     }
  //   ]
  // },
  // {
  //   id: 'kindness',
  //   name: '優しき少女と拘囚の守護竜',
  //   quests: [
  //     {
  //       id: 'hypnos',
  //       element: 'wind',
  //       name: 'ヒュプノス大討伐戦',
  //       levels: ['beginner', 'standard', 'expert', 'extra',]
  //     },
  //     {
  //       id: 'stormsentinel',
  //       element: 'wind',
  //       name: 'ストームストーン討伐戦',
  //       levels: ['beginner', 'standard', 'expert',]
  //     }
  //   ]
  // },
  {
    id: 'onslaught',
    name: 'ディアネル帝国迎撃戦',
    quests: [
      {
        id: 'adolla',
        element: 'flame',
        name: 'アドラ火山の戦い',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'myriage',
        element: 'water',
        name: 'ミレージュ湖畔の戦い',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'rovetelle',
        element: 'wind',
        name: 'ロブレール森林の戦い',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'dornith',
        element: 'light',
        name: 'ドルニトス山脈の戦い',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'wartarch',
        element: 'shadow',
        name: 'ワルトアール遺跡の戦い',
        levels: ['beginner', 'standard', 'expert', 'master',]
      }
    ]
  },
  {
    id: 'dragon',
    name: 'ドラゴンの試練',
    quests: [
      {
        id: 'midgardsormr',
        element: 'wind',
        name: 'ミドガルズオルムの試練',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'mercury',
        element: 'water',
        name: 'マーキュリーの試練',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'brunhilda',
        element: 'flame',
        name: 'ブリュンヒルデの試練',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'jupiter',
        element: 'light',
        name: 'ユピテルの試練',
        levels: ['beginner', 'standard', 'expert', 'master',]
      },
      {
        id: 'zodiark',
        element: 'shadow',
        name: 'ゾディアークの試練',
        levels: ['beginner', 'standard', 'expert', 'master',]
      }
    ]
  },
  {
    id: 'highdragon',
    name: '真ドラゴンの試練',
    quests: [
      {
        id: 'highmidgardsormr',
        element: 'wind',
        name: '真ミドガルズオルムの試練',
        levels: ['none',]
      },
      // {
      //   id: 'highmercury',
      //   element: 'water',
      //   name: '真マーキュリーの試練',
      //   levels: ['none',]
      // },
      {
        id: 'highbrunhilda',
        element: 'flame',
        name: '真ブリュンヒルデの試練',
        levels: ['none',]
      },
      // {
      //   id: 'highjupiter',
      //   element: 'light',
      //   name: '真ユピテルの試練',
      //   levels: ['none',]
      // },
      // {
      //   id: 'highzodiark',
      //   element: 'shadow',
      //   name: '真ゾディアークの試練',
      //   levels: ['none',]
      // }
    ]
  }
];

if (typeof(exports) !== 'undefined') {
  exports.elementsMaster = elementsMaster;
  exports.levelsMaster = levelsMaster;
  exports.questsMaster = questsMaster;
}
