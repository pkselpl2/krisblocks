(function waitEntry() {
    if (!window.Entry || !Entry.block || !Entry.blockInfo) {
        setTimeout(waitEntry, 300);
        return;
    }

    if (Entry.blockInfo.kris) return;

    /* ===============================
       iframe 공통 함수
    ================================ */
    function getIframe() {
        let iframe = document.getElementById("kris_iframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "kris_iframe";
            iframe.style.position = "fixed";
            iframe.style.left = "100px";
            iframe.style.top = "100px";
            iframe.style.width = "800px";
            iframe.style.height = "450px";
            iframe.style.border = "2px solid #7CFC00";
            iframe.style.background = "#fff";
            iframe.style.zIndex = "99999";
            iframe.style.opacity = "1";
            document.body.appendChild(iframe);
        }
        return iframe;
    }

    /* ===============================
       1️⃣ iframe 닫기
    ================================ */
    Entry.block.kris_iframe_close = {
        skeleton: "basic_statement",
        class: "kris",
        func() {
            const iframe = document.getElementById("kris_iframe");
            if (iframe) iframe.remove();
            return script.callReturn();
        }
    };

    /* ===============================
       2️⃣ iframe 이동 (x, y)
    ================================ */
    Entry.block.kris_iframe_move = {
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "number", value: 100 },
            { type: "Block", accept: "number", value: 100 }
        ],
        paramsKeyMap: { X: 0, Y: 1 },
        class: "kris",
        func(sprite, script) {
            const iframe = getIframe();
            iframe.style.left = script.getNumberValue("X") + "px";
            iframe.style.top = script.getNumberValue("Y") + "px";
            return script.callReturn();
        }
    };

    /* ===============================
       3️⃣ iframe 투명도 (0~100)
    ================================ */
    Entry.block.kris_iframe_opacity = {
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "number", value: 100 }
        ],
        paramsKeyMap: { O: 0 },
        class: "kris",
        func(sprite, script) {
            const iframe = getIframe();
            let o = script.getNumberValue("O");
            o = Math.max(0, Math.min(100, o));
            iframe.style.opacity = o / 100;
            return script.callReturn();
        }
    };

    /* ===============================
       4️⃣ 오브젝트용 iframe 열기
    ================================ */
    Entry.block.kris_object_iframe_open = {
        skeleton: "basic_statement",
        params: [
            { type: "Block", accept: "string", value: "example.co.kr" }
        ],
        paramsKeyMap: { URL: 0 },
        class: "kris",
        isNotFor: ["stage"],
        func(sprite, script) {
            let url = script.getStringValue("URL");
            if (!url.startsWith("http")) url = "https://" + url;
            const iframe = getIframe();
            iframe.src = url;
            return script.callReturn();
        }
    };

    /* ===============================
       5️⃣ 작품 정지하기
    ================================ */
    Entry.block.kris_stop_project = {
        skeleton: "basic_statement",
        class: "kris",
        func() {
            if (Entry.engine && Entry.engine.stop) {
                Entry.engine.stop();
            } else if (Entry.Engine && Entry.Engine.stop) {
                Entry.Engine.stop();
            }
            return script.callReturn();
        }
    };

    /* ===============================
       6️⃣ 유저 프로필 사진 URL 가져오기
    ================================ */
    Entry.block.kris_user_profile_image = {
        skeleton: "basic_string_field",
        class: "kris",
        func() {
            try {
                const user = Entry.store.getState().user;
                return user.profileImage || "";
            } catch (e) {
                return "";
            }
        }
    };

    /* ===============================
       카테고리 등록
    ================================ */
    Entry.blockInfo.kris = {
        name: "크리스",
        color: "#7CFC00",
        icon: "hardware",
        blocks: [
            "kris_iframe_close",
            "kris_iframe_move",
            "kris_iframe_opacity",
            "kris_object_iframe_open",
            "kris_stop_project",
            "kris_user_profile_image"
        ]
    };

    console.log("✅ 크리스 블록 확장팩 로드 완료");
})();
