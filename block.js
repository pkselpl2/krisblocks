/* =========================================================
   KrisBlocks v1.0 FINAL
   ========================================================= */

// ============================
// 중복 로드 방지
// ============================
// 이 블록은 2차 창작 해도 됩니다 마음껏 쓰세요!
//============================================================ */
if (window.__KRIS_BLOCKS_LOADED__) {
  console.warn('[KrisBlocks] 이미 로드됨');
  return;
}
window.__KRIS_BLOCKS_LOADED__ = true;

// ============================
// 블록 정의
// ============================
const blocks = [

  // iframe 생성
  {
    name: 'kris_iframe_create',
    template: 'iframe %1 생성 너비 %2 높이 %3',
    skeleton: 'basic',
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'number' },
      { type: 'Block', accept: 'number' }
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['400'] },
      { type: 'text', params: ['300'] }
    ],
    map: { IFRAME: 0, W: 1, H: 2 },
    class: 'kris',
    func: async (sprite, script) => {
      const id = script.getValue('IFRAME', script);
      let iframe = document.getElementById(id);

      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = id;
        iframe.style.position = 'absolute';
        iframe.style.left = '0px';
        iframe.style.top = '0px';
        iframe.style.border = '0';
        iframe.style.zIndex = '9999';
        iframe.width = script.getValue('W', script);
        iframe.height = script.getValue('H', script);
        document.body.appendChild(iframe);
      }
      return script.callReturn();
    }
  },

  // iframe 이동
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
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) {
        iframe.style.left = script.getValue('X', script) + 'px';
        iframe.style.top = script.getValue('Y', script) + 'px';
      }
      return script.callReturn();
    }
  },

  // iframe 보이기
  {
    name: 'kris_iframe_show',
    template: 'iframe %1 보이기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { IFRAME: 0 },
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.display = 'block';
      return script.callReturn();
    }
  },

  // iframe 숨기기
  {
    name: 'kris_iframe_hide',
    template: 'iframe %1 숨기기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { IFRAME: 0 },
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.display = 'none';
      return script.callReturn();
    }
  },

  // iframe 열기
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
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.src = script.getValue('URL', script);
      return script.callReturn();
    }
  },

  // iframe 투명도
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
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.style.opacity = script.getValue('OPACITY', script) / 100;
      return script.callReturn();
    }
  },

  // iframe 삭제
  {
    name: 'kris_iframe_delete',
    template: 'iframe %1 삭제',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { IFRAME: 0 },
    class: 'kris',
    func: async (sprite, script) => {
      const iframe = document.getElementById(script.getValue('IFRAME', script));
      if (iframe) iframe.remove();
      return script.callReturn();
    }
  },

  // iframe 전체 정리
  {
    name: 'kris_iframe_clear_all',
    template: 'iframe 전체 삭제',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'kris',
    func: async () => {
      document.querySelectorAll('iframe').forEach(i => i.remove());
      return;
    }
  },

  // 작품 정지
  {
    name: 'kris_project_stop',
    template: '작품 정지하기',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'kris',
    func: async () => {
      Entry.engine.toggleStop(true);
      return;
    }
  },

  // 작품 재생
  {
    name: 'kris_project_play',
    template: '작품 재생하기',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'kris',
    func: async () => {
      Entry.engine.toggleStop(false);
      return;
    }
  },

  // 블록 존재 확인
  {
    name: 'kris_block_exists',
    template: '%1 블록 존재 확인',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['kris_iframe_create'] }],
    map: { BLOCK: 0 },
    class: 'kris',
    func: async (sprite, script) => {
      const name = script.getValue('BLOCK', script);
      script.setReturn(Entry.block[name] ? 1 : 0);
      return script.callReturn();
    }
  },

  // 엔트리 이야기 올리기 (복사)
  {
    name: 'kris_story_post',
    template: '%1 를 엔트리 이야기에 올리기',
    skeleton: 'basic',
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['크리스블록 v1.0 공유합니다!'] }],
    map: { TEXT: 0 },
    class: 'kris',
    func: async (sprite, script) => {
      const userText = script.getValue('TEXT', script);
      const text =
`${userText}

────────────────
이건 크리스블록으로 등록된 블록입니다

코드 입력하세요!
$.get('https://raw.githack.com/pkselpl2/krisblocks/master/block.js');
`;
      navigator.clipboard.writeText(text);
      alert('이야기용 글이 복사되었습니다!\n이야기 → 새 글 → 붙여넣기');
      return script.callReturn();
    }
  },

  // 제작자 정보
  {
    name: 'kris_block_credit',
    template: '크리스블록 제작자 정보',
    skeleton: 'basic',
    params: [],
    def: [],
    map: {},
    class: 'kris',
    func: async (sprite, script) => {
      script.setReturn('이 블록의 제작자는 gpt입니다 추가 정보는 크리스입니다!');
      return script.callReturn();
    }
  }
];

// ============================
// 색상 (연두 / 노랑 반복)
// ============================
const colors = [
  { default: '#15b01a', darken: '#0f800f' },
  { default: '#f0a500', darken: '#d18b00' }
];
blocks.forEach((b, i) => b.color = colors[i % colors.length]);

// ============================
// 기존 kris 카테고리 제거
// ============================
Entry.staticBlocks = (Entry.staticBlocks || []).filter(v => v.category !== 'kris');

// ============================
// 블록 등록
// ============================
blocks.forEach(b => Entry.block[b.name] = b);
Entry.staticBlocks.push({
  category: 'kris',
  blocks: blocks.map(b => b.name)
});

// ============================
// 카테고리 아이콘 / 스타일
// ============================
const style = document.createElement('style');
style.innerHTML = `
#entryCategorykris {
  background-image: url(https://raw.githubusercontent.com/pkselpl2/krisblocks/master/kris.png);
  background-repeat: no-repeat;
  background-position: 6px center;
  padding-left: 28px;
}
.entrySelectedCategory#entryCategorykris {
  background-color: #222;
}
`;
document.head.appendChild(style);

console.log('[KrisBlocks] v1.0 FINAL 로드 완료');
