(function () {
    if (!window.Entry) {
        console.error("❌ Entry가 로드되지 않았습니다");
        return;
    }

    /* ===============================
       Kris Custom Blocks 2.0
       Category: 크리스
       Icon: hardware (내장)
       Color: Light Green
    ================================ */

    /* 1️⃣ iframe 열기 (ID, URL, 크기, 위치) */
    Entry.block.kris_iframe_open = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", defaultType: "string", value: "kris_iframe" }, // ID
            { type: "Block", accept: "string", defaultType: "string", value: "https://example.co.kr" }, // URL
            { type: "Block", accept: "number", defaultType: "number", value: 900 }, // width
            { type: "Block", accept: "number", defaultType: "number", value: 500 }, // height
            { type: "Block", accept: "number", defaultType: "number", value: 80 },  // top
            { type: "Block", accept: "number", defaultType: "number", value: 80 }   // left
        ],
        paramsKeyMap: { ID: 0, URL: 1, WIDTH: 2, HEIGHT: 3, TOP: 4, LEFT: 5 },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let id = script.getStringValue("ID");
            let url = script.getStringValue("URL");
            let width = script.getNumberValue("WIDTH");
            let height = script.getNumberValue("HEIGHT");
            let top = script.getNumberValue("TOP");
            let left = script.getNumberValue("LEFT");

            if (!url.startsWith("http")) url = "https://" + url;

            let iframe = document.getElementById(id);
            if (!iframe) {
                iframe = document.createElement("iframe");
                iframe.id = id;
                iframe.style.position = "fixed";
                iframe.style.border = "2px solid #7CFC00";
                iframe.style.background = "#fff";
                iframe.style.zIndex = "99999";
                document.body.appendChild(iframe);
            }

            iframe.src = url;
            iframe.style.width = width + "px";
            iframe.style.height = height + "px";
            iframe.style.top = top + "px";
            iframe.style.left = left + "px";
            iframe.style.display = "block";

            return script.callReturn();
        }
    };

    /* 2️⃣ iframe 닫기 (ID) */
    Entry.block.kris_iframe_close = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", defaultType: "string", value: "kris_iframe" }
        ],
        paramsKeyMap: { ID: 0 },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let id = script.getStringValue("ID");
            const iframe = document.getElementById(id);
            if (iframe) iframe.remove();
            return script.callReturn();
        }
    };

    /* 3️⃣ iframe 숨기기 */
    Entry.block.kris_iframe_hide = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", defaultType: "string", value: "kris_iframe" }
        ],
        paramsKeyMap: { ID: 0 },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let id = script.getStringValue("ID");
            const iframe = document.getElementById(id);
            if (iframe) iframe.style.display = "none";
            return script.callReturn();
        }
    };

    /* 4️⃣ iframe 보이기 */
    Entry.block.kris_iframe_show = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", defaultType: "string", value: "kris_iframe" }
        ],
        paramsKeyMap: { ID: 0 },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let id = script.getStringValue("ID");
            const iframe = document.getElementById(id);
            if (iframe) iframe.style.display = "block";
            return script.callReturn();
        }
    };

    /* 5️⃣ 새 창 열기 */
    Entry.block.kris_open_window = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", defaultType: "string", value: "https://example.co.kr" }
        ],
        paramsKeyMap: { URL: 0 },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let url = script.getStringValue("URL");
            if (!url.startsWith("http")) url = "https://" + url;
            window.open(url, "_blank");
            return script.callReturn();
        }
    };

    /* 6️⃣ 블록 버전 표시 */
    Entry.block.kris_block_version = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_string_field",
        params: [],
        class: "kris",
        isNotFor: ["sprite"],

        func: function () {
            return "크리스블록 2.0";
        }
    };

    /* 7️⃣ 카테고리 등록 */
    Entry.blockInfo.kris = {
        name: "크리스",
        color: "#7CFC00",
        icon: "hardware",
        blocks: [
            "kris_iframe_open",
            "kris_iframe_close",
            "kris_iframe_hide",
            "kris_iframe_show",
            "kris_open_window",
            "kris_block_version"
        ]
    };

    console.log("✅ 크리스 블록 2.0 로드 완료 (풀버전)");
})();

