/***********************
크리스블록 0.3 냐옹~
***********************/

/* 색상 냐옹~ */
const KRIS_COLOR = {
  default: '#7CDB9C', // 기본색 냐옹~
  darken: '#5FBF84',  // 진한색 냐옹~
};

/* iframe 생성 냐옹~ */
function getKrisIframe() {
  let iframe = document.getElementById('kris_iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'kris_iframe';
    iframe.style.position = 'fixed';
    iframe.style.left = '0';
    iframe.style.top = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.zIndex = '9999';
    iframe.style.display = 'none';
    iframe.allow = 'fullscreen';
    document.body.appendChild(iframe);
    console.log('🐾 새로운 iframe 만들었냥~');
  }
  return iframe;
}

/* 블록 정의 냐옹~ */
const krisBlocks = [

  /* iframe 보이기 냐옹~ */
  {
    name: 'kris_iframe_show',
    template: 'iframe %1 보이기다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['https://playentry.org'] }],
    paramsKeyMap: { URL: 0 },
    class: 'text',
    func: (sprite, script) => {
      const iframe = getKrisIframe();
      iframe.src = script.getValue('URL', script);
      iframe.style.display = 'block';
      console.log('😸 iframe 보이게 했다냥~');
    },
  },

  /* iframe 숨기기 냐옹~ */
  {
    name: 'kris_iframe_hide',
    template: 'iframe 숨기기다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      const iframe = document.getElementById('kris_iframe');
      if (iframe) iframe.style.display = 'none';
      console.log('🙀 iframe 숨겼냥~');
    },
  },

  /* iframe 투명도 냐옹~ */
  {
    name: 'kris_iframe_opacity',
    template: 'iframe 투명도 %1 % 냐옹~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'number' }],
    def: [{ type: 'number', params: [100] }],
    paramsKeyMap: { OP: 0 },
    class: 'text',
    func: (sprite, script) => {
      getKrisIframe().style.opacity = script.getValue('OP', script)/100;
      console.log(`😺 iframe 투명도 ${script.getValue('OP', script)}% 냐옹~`);
    },
  },

  /* iframe 클릭 차단 냐옹~ */
  {
    name: 'kris_iframe_block_click',
    template: 'iframe 클릭 못하게 하다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      getKrisIframe().style.pointerEvents = 'none';
      console.log('🙀 클릭 차단했다냥~');
    },
  },

  /* iframe 클릭 통과 냐옹~ */
  {
    name: 'kris_iframe_allow_click',
    template: 'iframe 클릭 통과시키다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      getKrisIframe().style.pointerEvents = 'auto';
      console.log('😸 클릭 통과시켰냥~');
    },
  },

  /* 웹사이트 열기 냐옹~ */
  {
    name: 'kris_open_website',
    template: '웹사이트 %1 열기다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['https://playentry.org'] }],
    paramsKeyMap: { URL: 0 },
    class: 'text',
    func: (sprite, script) => {
      window.open(script.getValue('URL', script), '_blank');
      console.log('🌐 웹사이트 열었다냥~');
    },
  },

  /* 작품 정지 냐옹~ */
  {
    name: 'kris_project_stop',
    template: '작품 정지하다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      if(Entry.engine) Entry.engine.toggleStop();
      console.log('🛑 작품 정지했다냥~');
    },
  },

  /* 작품 시작 냐옹~ */
  {
    name: 'kris_project_start',
    template: '작품 시작하다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      if(Entry.engine) Entry.engine.toggleRun();
      console.log('▶️ 작품 시작했다냥~');
    },
  },

  /* 엔트리 alert 냐옹~ */
  {
    name: 'kris_alert',
    template: '%1 알림이다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type: 'Block', accept: 'string' }],
    def: [{ type: 'text', params: ['안녕하세요'] }],
    paramsKeyMap: { MSG: 0 },
    class: 'text',
    func: (sprite, script) => {
      alert(script.getValue('MSG', script));
      console.log(`💌 알림: ${script.getValue('MSG', script)} 냐옹~`);
    },
  },

  /* 크레딧 냐옹~ */
  {
    name: 'kris_credit',
    template: '%1 냐옹~',
    color: EntryStatic.colorSet.common.TRANSPARENT,
    skeleton: 'basic_text',
    params: [{
      type: 'Text',
      text: '이 블록은 GPT와 크리스가 만들었냥~',
      color: EntryStatic.colorSet.common.TEXT,
      align: 'center',
    }],
    def: [],
    paramsKeyMap: {},
    class: 'text',
  },

  /* 1️⃣ 터보모드 체크 냐옹~ */
  {
    name: 'kris_turbo_check',
    template: '터보모드 켜져 있냥~?',
    skeleton: 'basic_boolean_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => Entry.isTurbo === true,
  },

  /* 2️⃣ 터보모드 켜기/끄기 냐옹~ */
  {
    name: 'kris_turbo_set',
    template: '부스트 모드 %1 냐옹~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{
      type: 'Dropdown',
      options: [['켜기','true'], ['끄기','false']],
    }],
    def: [{ type:'dropdown', params:['true','true'] }],
    paramsKeyMap: { MODE: 0 },
    class: 'text',
    func: (sprite, script) => {
      Entry.isTurbo = script.getValue('MODE', script) === 'true';
      console.log(`⚡ 부스트 모드 ${Entry.isTurbo ? '켜졌다냥~' : '꺼졌다냥~'}`);
    },
  },

  /* 3️⃣ 오늘 무슨 날이냥~ */
  {
    name: 'kris_today_day',
    template: '오늘 무슨 날이냥~',
    skeleton: 'basic_string_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => {
      const days = ['일','월','화','수','목','금','토'];
      return days[new Date().getDay()] + '이다냥~';
    },
  },

  /* 4️⃣ 페이지 새로고침 냐옹~ */
  {
    name: 'kris_reload',
    template: '엔트리 페이지 다시 새로고침하다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => location.reload(),
  },

  /* 5️⃣ 모바일 환경 확인 냐옹~ */
  {
    name: 'kris_is_mobile',
    template: '모바일 환경이냥~?',
    skeleton: 'basic_boolean_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => /Mobi|Android/i.test(navigator.userAgent),
  },

  /* 6️⃣ 엔트리 애셋 URL 가져오기 냐옹~ */
  {
    name: 'kris_get_asset_url',
    template: '%1 엔트리 애셋 파일 가져오다냥~',
    skeleton: 'basic_string_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type:'Block', accept:'string' }],
    def: [{ type:'text', params:[''] }],
    paramsKeyMap: { ID:0 },
    class: 'text',
    func: (sprite, script) => {
      const id = script.getValue('ID', script);
      const asset = Entry.storage?.asset?.getAsset(id);
      return asset ? asset.fileurl : '';
    },
  },

  /* 7️⃣ 애셋 존재 확인 냐옹~ */
  {
    name: 'kris_asset_exist',
    template: '%1 애셋 존재하냥~?',
    skeleton: 'basic_boolean_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type:'Block', accept:'string' }],
    def: [{ type:'text', params:[''] }],
    paramsKeyMap: { ID:0 },
    class: 'text',
    func: (sprite, script) => !!Entry.storage?.asset?.getAsset(script.getValue('ID', script)),
  },

  /* 8️⃣ 전체화면 상태 확인 냐옹~ */
  {
    name: 'kris_is_fullscreen',
    template: '전체화면 상태냥~?',
    skeleton: 'basic_boolean_field',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [],
    def: [],
    paramsKeyMap: {},
    class: 'text',
    func: () => !!document.fullscreenElement,
  },

  /* 9️⃣ 전체화면 켜기/끄기 냐옹~ */
  {
    name: 'kris_fullscreen_set',
    template: '전체화면 %1 냐옹~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{
      type:'Dropdown',
      options:[['켜기','on'],['끄기','off']],
    }],
    def: [{ type:'dropdown', params:['켜기','켜기'] }],
    paramsKeyMap: { MODE:0 },
    class: 'text',
    func: (sprite, script) => {
      const mode = script.getValue('MODE', script);
      if(mode==='on') document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
      console.log(`🖥 전체화면 ${mode==='on' ? '켜졌다냥~' : '꺼졌다냥~'}`);
    },
  },

  /* 🔟 애셋을 iframe에 바로 띄우기 냐옹~ */
  {
    name: 'kris_iframe_asset',
    template: 'iframe에 애셋 %1 띄우다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type:'Block', accept:'string' }],
    def: [{ type:'text', params:[''] }],
    paramsKeyMap: { ID:0 },
    class: 'text',
    func: (sprite, script) => {
      const id = script.getValue('ID', script);
      const asset = Entry.storage?.asset?.getAsset(id);
      if(!asset) return;
      const iframe = getKrisIframe();
      iframe.src = asset.fileurl;
      iframe.style.display='block';
      console.log('🐾 iframe에 애셋 띄웠냥~');
    },
  },

  /* 1️⃣1️⃣ 콘솔 로그 냐옹~ */
  {
    name: 'kris_console_log',
    template: '콘솔에 %1 출력하다냥~',
    skeleton: 'basic',
    color: KRIS_COLOR.default,
    outerLine: KRIS_COLOR.darken,
    params: [{ type:'Block', accept:'string' }],
    def: [{ type:'text', params:['로그'] }],
    paramsKeyMap: { MSG:0 },
    class: 'text',
    func: (sprite, script) => {
      console.log('[KrisBlock]', script.getValue('MSG', script));
    },
  },
];

/* LibraryCreator 냐옹~ */
window.LibraryCreator = {
  start(blocks, category, name, icon) {
    if (!window.Entry || !Entry.block) {
      new MutationObserver((_, observer) => {
        if (window.Entry && Entry.block) {
          this.start(blocks, category, name, icon);
          observer.disconnect();
        }
      }).observe(document, { subtree: true, childList: true });
      return;
    }

    if (EntryStatic.getAllBlocks().some(block => category == block.category)) return;  
    Lang.Blocks[category.toUpperCase()] = name;  

    EntryStatic.getAllBlocks = (getAllBlocks => () => [  
      ...getAllBlocks(),  
      { category, blocks: blocks.map(v => v.name) },  
    ])(EntryStatic.getAllBlocks);  

    Entry.playground?.blockMenu?._categoryData.push({ category, blocks: [] });  
    Entry.playground?.blockMenu?._generateCategoryView(Entry.playground.blockMenu._categoryData);  
    Entry.playground?.blockMenu?._generateCategoryCode(category);  

    Entry.moduleManager?.loadBlocks({  
      categoryName: category,  
      blockSchemas: blocks.map(block => ({  
        blockName: block.name,  
        block: Object.assign(block, { def:{ params:block.def, type:block.name } }),  
        isBlockShowBlockMenu: true,  
      })),  
    });  

    Entry.playground?.blockMenu?.setMenu();  

    $('head').append(`  
      <style>  
      #entryCategory${category}{  
        background-image:url(${icon});  
        background-repeat:no-repeat;  
        background-size:20px;  
        background-position-y:8px;  
      }  
      </style>  
    `);  

    console.log(`[KrisBlock] ${name} 로드 완료 냐옹~`);
  },
};

/* 실행 냐옹~ */
LibraryCreator.start(
  krisBlocks,
  'KRIS',
  '냥냥크리스',
  'https://raw.githubusercontent.com/pkselpl2/krisblocks/ef37224a6ad7032098f43d0350e0a5d4f2dea9fe/krislogo.svg.svg'
);

console.log('✅ 크리스블록 0.3 적용 완료 냐옹~');
