(function () {
    if (!window.Entry || !Entry.block) {
        console.error('❌ Entry 로드 안됨');
        return;
    }

    /*************************************************
     * 1️⃣ iframe 공용 생성 함수
     *************************************************/
    function getIframe() {
        let iframe = document.getElementById('kris_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'kris_iframe';
            iframe.style.position = 'fixed';
            iframe.style.left = '50px';
            iframe.style.top = '50px';
            iframe.style.width = '800px';
            iframe.style.height = '500px';
            iframe.style.border = '2px solid #7CFC00';
            iframe.style.background = 'white';
            iframe.style.zIndex = '9999';
            document.body.appendChild(iframe);
        }
        return iframe;
    }

    /*************************************************
     * 2️⃣ 블록 정의 (Entry.block)
     *************************************************/

    // ▶ iframe 열기
    Entry.block.kris_iframe_open = {
        color: '#7CFC00',
        fontColor: '#000000',
        skeleton: 'basic_statement',
        template: '웹사이트 %1 iframe 열기',
        category: 'kris',

        params: [
            { type: 'Block', accept: 'string' }
        ],

        def: {
            params: [
                { type: 'text', params: ['https://example.com'] }
            ],
            type: 'kris_iframe_open'
        },

        func: function (sprite, script) {
            let url = script.getStringValue('STRING');
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            const iframe = getIframe();
            iframe.src = url;
            return script.callReturn();
        }
    };

    // ▶ iframe 닫기
    Entry.block.kris_iframe_close = {
        color: '#7CFC00',
        fontColor: '#000000',
        skeleton: 'basic_statement',
        template: 'iframe 닫기',
        category: 'kris',

        params: [],
        def: {
            params: [],
            type: 'kris_iframe_close'
        },

        func: function (sprite, script) {
            const iframe = document.getElementById('kris_iframe');
            if (iframe) iframe.remove();
            return script.callReturn();
        }
    };

    // ▶ iframe 위치 이동
    Entry.block.kris_iframe_move = {
        color: '#7CFC00',
        fontColor: '#000000',
        skeleton: 'basic_statement',
        template: 'iframe 위치 x %1 y %2',
        category: 'kris',

        params: [
            { type: 'Block', accept: 'number' },
            { type: 'Block', accept: 'number' }
        ],

        def: {
            params: [
                { type: 'number', params: [50] },
                { type: 'number', params: [50] }
            ],
            type: 'kris_iframe_move'
        },

        func: function (sprite, script) {
            const x = script.getNumberValue('NUMBER');
            const y = script.getNumberValue('NUMBER2');
            const iframe = document.getElementById('kris_iframe');
            if (iframe) {
                iframe.style.left = x + 'px';
                iframe.style.top = y + 'px';
            }
            return script.callReturn();
        }
    };

    // ▶ iframe 크기 조절
    Entry.block.kris_iframe_resize = {
        color: '#7CFC00',
        fontColor: '#000000',
        skeleton: 'basic_statement',
        template: 'iframe 크기 가로 %1 세로 %2',
        category: 'kris',

        params: [
            { type: 'Block', accept: 'number' },
            { type: 'Block', accept: 'number' }
        ],

        def: {
            params: [
                { type: 'number', params: [800] },
                { type: 'number', params: [500] }
            ],
            type: 'kris_iframe_resize'
        },

        func: function (sprite, script) {
            const w = script.getNumberValue('NUMBER');
            const h = script.getNumberValue('NUMBER2');
            const iframe = document.getElementById('kris_iframe');
            if (iframe) {
                iframe.style.width = w + 'px';
                iframe.style.height = h + 'px';
            }
            return script.callReturn();
        }
    };

    /*************************************************
     * 3️⃣ 카테고리 등록 (UI 핵심)
     *************************************************/
    Entry.blockCategory = Entry.blockCategory || {};

    Entry.blockCategory.kris = {
        name: '크리스',
        color: '#7CFC00',
        blocks: [
            'kris_iframe_open',
            'kris_iframe_close',
            'kris_iframe_move',
            'kris_iframe_resize'
        ]
    };

    /*************************************************
     * 4️⃣ 블록 메뉴 다시 그리기
     *************************************************/
    if (Entry.workspace && Entry.workspace._renderBlocks) {
        Entry.workspace._renderBlocks();
    }

    console.log('✅ 크리스블록 1.0 풀버전 로드 완료');
})();
