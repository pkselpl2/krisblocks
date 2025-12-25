/* =========================================================
   KrisBlocks v2 FINAL
   API + iframe 통합
   ========================================================= */

// ============================
// 중복 로드 방지
// ============================
if (window.__KRISBLOCKS_V2__) {
  console.warn('[KrisBlocks v2] 이미 로드됨');
  return;
}
window.__KRISBLOCKS_V2__ = true;

// ============================
// 색상 (연두 / 노랑)
// ============================
const GREEN = '#19da39ff';
const GREEN_O = '#0f9f2aff';
const YELLOW = '#e7ed3fff';
const YELLOW_O = '#c5c92aff';

// ============================
// iframe API 블록들
// ============================

// iframe 생성
addBlock(
  'kris_iframe_create',
  'iframe %1 생성 너비 %2 높이 %3',
  { color: GREEN, outerline: GREEN_O },
  {
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'number' },
      { type: 'Block', accept: 'number' },
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['400'] },
      { type: 'text', params: ['300'] },
    ],
    map: { ID: 0, W: 1, H: 2 },
  },
  'text',
  (sprite, script) => {
    const id = script.getValue('ID', script);
    if (!document.getElementById(id)) {
      const iframe = document.createElement('iframe');
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
  },
  'basic'
);

// iframe URL 열기
addBlock(
  'kris_iframe_open',
  'iframe %1 URL %2 열기',
  { color: YELLOW, outerline: YELLOW_O },
  {
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'string' },
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['https://playentry.org'] },
    ],
    map: { ID: 0, URL: 1 },
  },
  'text',
  (sprite, script) => {
    const iframe = document.getElementById(script.getValue('ID', script));
    if (iframe) iframe.src = script.getValue('URL', script);
  },
  'basic'
);

// iframe 이동
addBlock(
  'kris_iframe_move',
  'iframe %1 이동 x %2 y %3',
  { color: GREEN, outerline: GREEN_O },
  {
    params: [
      { type: 'Block', accept: 'string' },
      { type: 'Block', accept: 'number' },
      { type: 'Block', accept: 'number' },
    ],
    def: [
      { type: 'text', params: ['iframe1'] },
      { type: 'text', params: ['0'] },
      { type: 'text', params: ['0'] },
    ],
    map: { ID: 0, X: 1, Y: 2 },
  },
  'text',
  (sprite, script) => {
    const iframe = document.getElementById(script.getValue('ID', script));
    if (iframe) {
      iframe.style.left = script.getValue('X', script) + 'px';
      iframe.style.top = script.getValue('Y', script) + 'px';
    }
  },
  'basic'
);

// iframe 숨기기 / 보이기
addBlock(
  'kris_iframe_toggle',
  'iframe %1 %2',
  { color: YELLOW, outerline: YELLOW_O },
  {
    params: [
      { type: 'Block', accept: 'string' },
      {
        type: 'Dropdown',
        options: [
          ['보이기', 'show'],
          ['숨기기', 'hide'],
        ],
        value: 'show',
        fontSize: 11,
      },
    ],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { ID: 0, MODE: 1 },
  },
  'text',
  (sprite, script) => {
    const iframe = document.getElementById(script.getValue('ID', script));
    if (iframe) {
      iframe.style.display =
        script.getValue('MODE', script) === 'show' ? 'block' : 'none';
    }
  },
  'basic'
);

// iframe 삭제
addBlock(
  'kris_iframe_delete',
  'iframe %1 삭제',
  { color: GREEN, outerline: GREEN_O },
  {
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['iframe1'] }],
    map: { ID: 0 },
  },
  'text',
  (sprite, script) => {
    const iframe = document.getElementById(script.getValue('ID', script));
    if (iframe) iframe.remove();
  },
  'basic_without_next'
);

// ============================
// API 제어 블록
// ============================

// 작품 정지
addBlock(
  'kris_project_stop',
  '작품 정지하기',
  { color: '#ff2200ff', outerline: '#a90000ff' },
  { params: [], def: [], map: {} },
  'text',
  () => Entry.engine.toggleStop(true),
  'basic_without_next'
);

// 작품 재생
addBlock(
  'kris_project_play',
  '작품 재생하기',
  { color: '#6223d5ff', outerline: '#3c0163ff' },
  { params: [], def: [], map: {} },
  'text',
  () => Entry.engine.toggleStop(false),
  'basic_without_next'
);

// ============================
// API 카테고리 등록
// ============================
Entry.staticBlocks.push({
  category: 'API',
  blocks: [
    'kris_iframe_create',
    'kris_iframe_open',
    'kris_iframe_move',
    'kris_iframe_toggle',
    'kris_iframe_delete',
    'kris_project_stop',
    'kris_project_play',
  ],
});

updateCategory('API');

// ============================
// 카테고리 스타일
// ============================
$('head').append(`
<style>
#entryCategoryAPI {
  background-image: url(https://raw.githubusercontent.com/pkselpl2/krisblocks/master/kris.png);
  background-repeat: no-repeat;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.entrySelectedCategory#entryCategoryAPI {
  background-image: url(https://raw.githubusercontent.com/pkselpl2/krisblocks/master/kris.png);
  background-color: #19da39ff;
  color: #fff;
}
</style>
`);

$('#entryCategoryAPI').append('크리스');

console.log('[KrisBlocks v2] API + iframe 통합 로드 완료');
