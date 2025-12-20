// 1️⃣ 기존 staticBlocks 유지
if (!Array.isArray(Entry.staticBlocks)) Entry.staticBlocks = Entry.staticBlocks || [];

// 2️⃣ 크리스 블록 정의
const krisBlocks = Object.keys(Entry.block).filter(k => k.startsWith("kris"));

// 3️⃣ API 블록 정의 (기존 코드 참고)
const apiBlocks = [
    'fetch','array_number','array_length','json_key','json_length','post_commu','post_qna','get_browser',
    'toast','console','console_clear','entry_console','entry_console_clear','change_var','entry_console_writing',
    'finish','likeList','boost_mode','mouse','didScroll','scrollHandle','stop_button(click)_start','open_win',
    'pc','PromptConfirm','user.username','change(X)','mypage','asdf'
];

// 4️⃣ staticBlocks에 새 카테고리 추가
Entry.staticBlocks.push(
    { category: 'API', blocks: apiBlocks },
    { category: 'kris', blocks: krisBlocks }
);

// 5️⃣ 카테고리 업데이트 함수 (안전하게)
const updateCategory = () => {
    if (!Entry.playground || !Entry.playground.mainWorkspace || !Entry.playground.blockMenu) return;

    // 기존 카테고리 + 새 카테고리 표시
    const categories = Entry.staticBlocks.map(c => ({ category: c.category, visible: true }));
    Entry.playground.mainWorkspace.blockMenu._generateCategoryView(categories);

    // 카테고리 데이터 업데이트
    Entry.playground.blockMenu._categoryData = Entry.staticBlocks;

    // 각 카테고리 코드 생성
    categories.forEach(c => Entry.playground.blockMenu._generateCategoryCode(c.category));
};

// 6️⃣ 카테고리 스타일 적용
$('head').append(`
<style>
#entryCategoryAPI {
    background-image: url(/lib/entry-js/images/hardware.svg);
    background-repeat: no-repeat;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    margin-bottom: 1px;
}
.entrySelectedCategory#entryCategoryAPI {
    background-image: url(/lib/entry-js/images/hardware_on.svg);
    background-color: #000;
    border-color: #000;
    color: #fff;
}
#entryCategorykris {
    background-image: url(/lib/entry-js/images/green.png); /* 원하는 아이콘 */
    background-repeat: no-repeat;
    border-radius: 6px;
}
.entrySelectedCategory#entryCategorykris {
    background-color: #0f0;
    color: #000;
}
</style>
`);

// 7️⃣ 카테고리 업데이트 실행
setTimeout(updateCategory, 500);

// 8️⃣ 알림/콘솔/문서 제목 통일
alert("크리스블록 로드 완료!");
console.log("크리스블록 1.0 beta 작동 시작!");
document.title = "Special_Block_entry";
