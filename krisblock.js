(function () {
    if (!window.Entry) {
        console.error("❌ Entry가 로드되지 않았습니다");
        return;
    }

    /* ===============================
       Kris Custom Blocks 1.0
       Category: 크리스
       Icon: hardware (내장)
       Color: Light Green
    ================================ */

    /* 1️⃣ iframe로 웹사이트 열기 */
    Entry.block.kris_iframe_open = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            {
                type: "Block",
                accept: "string",
                defaultType: "string",
                value: "https://example.co.kr"
            }
        ],
        paramsKeyMap: {
            URL: 0
        },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let url = script.getStringValue("URL");

            if (!url.startsWith("http")) {
                url = "https://" + url;
            }

            let iframe = document.getElementById("kris_iframe");
            if (!iframe) {
                iframe = document.createElement("iframe");
                iframe.id = "kris_iframe";
                iframe.style.position = "fixed";
                iframe.style.top = "80px";
                iframe.style.left = "80px";
                iframe.style.width = "900px";
                iframe.style.height = "500px";
                iframe.style.border = "2px solid #7CFC00";
                iframe.style.background = "#fff";
                iframe.style.zIndex = "99999";
                document.body.appendChild(iframe);
            }

            iframe.src = url;
            return script.callReturn();
        }
    };

    /* 2️⃣ 새 창으로 웹사이트 열기 */
    Entry.block.kris_open_window = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_statement",
        params: [
            {
                type: "Block",
                accept: "string",
                defaultType: "string",
                value: "https://example.co.kr"
            }
        ],
        paramsKeyMap: {
            URL: 0
        },
        class: "kris",
        isNotFor: ["sprite"],

        func: function (sprite, script) {
            let url = script.getStringValue("URL");
            if (!url.startsWith("http")) {
                url = "https://" + url;
            }
            window.open(url, "_blank");
            return script.callReturn();
        }
    };

    /* 3️⃣ iframe 닫기 */
    Entry.block.kris_iframe_close = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic",
        params: [],
        class: "kris",
        isNotFor: ["sprite"],

        func: function () {
            const iframe = document.getElementById("kris_iframe");
            if (iframe) iframe.remove();
            return Entry.Engine ? Entry.Engine.execute() : null;
        }
    };

    /* 4️⃣ 버전 확인 블록 */
    Entry.block.kris_block_version = {
        color: "#7CFC00",
        outerLine: "#5cbf00",
        fontColor: "#000000",
        skeleton: "basic_string_field",
        params: [],
        class: "kris",
        isNotFor: ["sprite"],

        func: function () {
            return "크리스블록 1.0";
        }
    };

    /* 5️⃣ ⭐ 카테고리 등록 (정답) */
    Entry.blockInfo.kris = {
        name: "크리스",
        color: "#7CFC00",

        // ✅ 내장 아이콘 강제 사용
        icon: "hardware",

        blocks: [
            "kris_iframe_open",
            "kris_open_window",
            "kris_iframe_close",
            "kris_block_version"
        ]
    };

    console.log("✅ 크리스 블록 1.0 로드 완료 (카테고리 정상)");
})();
