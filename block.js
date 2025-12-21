const blocks = [
  {
    name: 'kris_iframe_move',
    template: 'iframe %1 이동하기 x:%2 y:%3',
    skeleton: 'basic',
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'number' },
      { type: 'Block', accept: 'number' }
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['0'] },
      { type: 'text', params: ['0'] }
    ],
    map: { IFRAME: 0, X: 1, Y: 2 },
    class: 'iframe',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) {
        iframe.style.left = script.getValue('X', script) + 'px';
        iframe.style.top = script.getValue('Y', script) + 'px';
      }
      return script.callReturn();
    }
  },
  {
    name: 'kris_iframe_show',
    template: 'iframe %1 보이기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { IFRAME: 0 },
    class: 'iframe',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.display = 'block';
      return script.callReturn();
    }
  },
  {
    name: 'kris_iframe_hide',
    template: 'iframe %1 숨기기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { IFRAME: 0 },
    class: 'iframe',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.display = 'none';
      return script.callReturn();
    }
  },
  {
    name: 'kris_iframe_open',
    template: 'iframe %1 열기 URL %2',
    skeleton: 'basic',
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'string' }
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['https://playentry.org'] }
    ],
    map: { IFRAME: 0, URL: 1 },
    class: 'iframe',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.src = script.getValue('URL', script);
      return script.callReturn();
    }
  },
  {
    name: 'kris_iframe_opacity',
    template: 'iframe %1 투명도 %2',
    skeleton: 'basic',
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'number' }
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['100'] }
    ],
    map: { IFRAME: 0, OPACITY: 1 },
    class: 'iframe',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.opacity = script.getValue('OPACITY', script) / 100;
      return script.callReturn();
    }
  },
  {
    name: 'kris_project_stop',
    template: '작품 정지하기',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'project',
    func: async (sprite, script) => {
      Entry.engine.toggleStop(true);
      return script.callReturn();
    }
  },
  {
    name: 'kris_project_play',
    template: '작품 재생하기',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'project',
    func: async (sprite, script) => {
      Entry.engine.toggleStop(false);
      return script.callReturn();
    }
  },
  {
    name: 'kris_user_profile_image',
    template: '유저 %1 프로필 사진 가져오기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['UserName'] }],
    map: { USERNAME: 0 },
    class: 'user',
    func: async (sprite, script) => {
      const user = script.getValue('USERNAME', script);
      console.log('유저 프로필 이미지 가져오기:', user);
      return script.callReturn();
    }
  },
  {
    name: 'kris_block_exists',
    template: '%1 블록 존재 확인',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['kris_iframe_move'] }],
    map: { BLOCKNAME: 0 },
    class: 'utility',
    func: async (sprite, script) => {
      const name = script.getValue('BLOCKNAME', script);
      return Entry.block[name] ? true : false;
    }
  }
];

// ============================
// 연두-노랑 반복 색상 적용
// ============================
const colors = [
  { default: '#15b01a', darken: '#0f800f' }, // 연두
  { default: '#f0a500', darken: '#d18b00' }  // 노랑
];

blocks.forEach((block, index) => {
  const color = colors[index % colors.length]; // 0,1,0,1,... 반복
  block.color = { default: color.default, darken: color.darken };
});

// ============================
// 카테고리 등록
// ============================
LibraryCreator.start(blocks, 'kris', 'Kris 블록');
