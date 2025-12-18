// ==========================
// Kris_Block 통합 스페셜 블록
// ==========================

Entry.staticBlocks = [
{
    category: 'start',
    blocks: [
        'when_run_button_click','when_some_key_pressed','mouse_clicked','mouse_click_cancled',
        'when_object_click','when_object_click_canceled','when_message_cast','message_cast',
        'message_cast_wait','when_scene_start','start_scene','start_neighbor_scene',
        'check_object_property','check_block_execution','switch_scope','is_answer_submited',
        'check_lecture_goal','check_variable_by_name','show_prompt','check_goal_success',
        'positive_number','negative_number','wildcard_string','wildcard_boolean','register_score'
    ],
},
// ... 기존 카테고리 start, flow, moving, looks, brush, text, sound, judgement, calc, variable, func, analysis, ai_utilize, expansion, arduino 모두 동일
];

// 모든 블록 반환
EntryStatic.getAllBlocks = () => Entry.staticBlocks;

// 카테고리 업데이트 함수
const updateCategory = (category, options) => {
    Entry.playground.mainWorkspace.blockMenu._generateCategoryView(
        Object.keys(Entry.staticBlocks).map(cat => ({category: cat, visible: true}))
    );
    Entry.playground.blockMenu._categoryData = EntryStatic.getAllBlocks();
    Entry.playground.blockMenu._generateCategoryCode(category);

    if (options) {
        if (options.background) {
            $(`#entryCategory${category}`).css({
                'background-image': `url(${options.background})`,
                'background-repeat': 'no-repeat',
                'background-size': options.backgroundSize ? options.backgroundSize+'px' : ''
            });
        }
        if (options.name) $(`#entryCategory${category}`)[0].innerText = options.name;
    }
};

// 블록 추가 함수
const addBlock = (blockname, template, color, params, _class, func, skeleton = 'basic') => {
    Entry.block[blockname] = {
        color: color.color,
        outerLine: color.outerline,
        skeleton: skeleton,
        statement: [],
        params: params.params,
        events: {},
        def: { params: params.def, type: blockname },
        paramsKeyMap: params.map,
        class: _class || 'default',
        func: func,
        template: template
    }
}

// ====================
// Kris_Block 전용 스페셜 블록 추가
// ====================

// fetch, array_number, array_length, json_key, json_length 등 기존 블록 모두 추가
addBlock('fetch','%1 가져오기',{color:EntryStatic.colorSet.block.default.HARDWAR,outerLine:EntryStatic.colorSet.block.darken.HARDWAR},{
    params:[{type:'Block',accept:'string'}],
    def:[{type:'text',params:['https://playentry.org/api/discuss/findNotice']}],
    map:{APIURL:0}
},'text', async (sprite, script)=>{
    let res=await fetch(script.getValue('APIURL', script));
    let data=await res.json();
    return data;
},'basic_string_field');

addBlock('array_number','배열 %1 의 %2 번째 항목',{color:EntryStatic.colorSet.block.default.HARDWAR,outerLine:EntryStatic.colorSet.block.darken.HARDWAR},{
    params:[{type:'Block',accept:'string'},{type:'Block',accept:'string'}],
    def:[{type:'text',params:["['1','2']"]},{type:'text',params:['1']}],
    map:{ARRAY:0,NUM:1}
},'text',(sprite, script)=>{
    let array=eval(script.getValue('ARRAY', script));
    return array[script.getValue('NUM', script)-1];
},'basic_string_field');

addBlock('array_length','배열 %1 의 항목 수',{color:EntryStatic.colorSet.block.default.HARDWAR,outerLine:EntryStatic.colorSet.block.darken.HARDWAR},{
    params:[{type:'Block',accept:'string'}],
    def:[{type:'text',params:["['1','2']"]}],
    map:{ARRAY:0}
},'text',(sprite, script)=>{
    return eval(script.getValue('ARRAY', script)).length;
},'basic_string_field');

addBlock('json_key','JSON %1 의 %2 항목',{color:EntryStatic.colorSet.block.default.HARDWAR,outerLine:EntryStatic.colorSet.block.darken.HARDWAR},{
    params:[{type:'Block',accept:'string'},{type:'Block',accept:'string'}],
    def:[{type:'text',params:["{'title':'Hello, world!'}"]},{type:'text',params:['title']}],
    map:{JSON:0,KEY:1}
},'text',(sprite, script)=>{
    let obj=eval(script.getValue('JSON', script));
    return obj[script.getValue('KEY', script)];
},'basic_string_field');

addBlock('json_length','JSON %1 의 항목 수',{color:EntryStatic.colorSet.block.default.HARDWAR,outerLine:EntryStatic.colorSet.block.darken.HARDWAR},{
    params:[{type:'Block',accept:'string'}],
    def:[{type:'text',params:["{'title':'Hello, world!'}"]}],
    map:{JSON:0}
},'text',(sprite, script)=>{
    return Object.keys(JSON.parse(script.getValue('JSON', script))).length;
},'basic_string_field');

// toast, console, entry_console, entry_console_clear, change_var 등도 동일 방식으로 추가
// (중복 길이 때문에 생략, 기존 스크립트 그대로 추가하면 됩니다)

// ====================
// Kris_Block 카테고리 등록
// ====================
Entry.staticBlocks.push({
    category: 'kris_block',
    blocks: [
        'fetch','array_number','array_length','json_key','json_length',
        'post_commu','post_qna','get_browser','toast','console','console_clear',
        'entry_console','entry_console_clear','change_var','entry_console_writing',
        'finish','likeList','boost_mode','mouse','didScroll','scrollHandle',
        'box','stop_button(click)_start','open_win','pc','PromptConfirm',
        'user.username','change(X)','mypage','asdf'
    ]
});

// 카테고리 갱신
updateCategory('kris_block');

// CSS 적용
$('head').append(`
<style>
#entryCategorykris_block {
    background-image: url(/lib/entry-js/images/hardware.svg);
    background-repeat: no-repeat;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    margin-bottom: 1px;
}
.entrySelectedCategory#entryCategorykris_block {
    background-image: url(/lib/entry-js/images/hardware_on.svg);
    background-color: #000;
    border-color: #000;
    color: #fff;
}
</style>
`);
$('#entryCategorykris_block').append('Kris_Block');

// 알림/콘솔 메시지
alert("현재 Kris_Block 버전 1.6입니다~");
console.log("Kris_Block 작동이 시작되었습니다.");
document.title = "Kris_Block";
