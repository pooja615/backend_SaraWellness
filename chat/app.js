/* ========= HELPERS ========= */
const $ = (id) => document.getElementById(id);

function safeText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function onClick(id, fn) {
  const el = $(id);
  if (el) el.addEventListener("click", fn);
}

function show(el) {
  if (el) el.classList.remove("hidden");
}
function hide(el) {
  if (el) el.classList.add("hidden");
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ========= LANGUAGE DATA ========= */
const LANG = {
  ne: {
    welcome:
      "नमस्कार! म Sara हुँ, तपाईंको स्वास्थ्य सहायक। म तपाईंलाई स्वास्थ्य सम्बन्धी जानकारी र मार्गदर्शन प्रदान गर्न यहाँ छु। तपाईंको स्वास्थ्य चिन्ता के हो?",
    history: "इतिहास",
    resources: "संसाधन",
    photo: "फोटो विश्लेषण",
    recent: "हालैका कुराकानी",
    clear: "सफा गर्नुहोस्",
    faqTitle: "बारम्बार सोधिने प्रश्न",
    faqHint: "क्लिक गर्दा उत्तर तुरुन्तै मुख्य च्याटमा देखिन्छ।",
    typing: "टाइप गर्दै...",
    disclaimer:
      "यो चैटबट चिकित्सकको विकल्प होइन। गम्भीर समस्याका लागि डाक्टरको सल्लाह लिनुहोस्।",
    placeholder: "आफ्नो स्वास्थ्य चिन्ता लेख्नुहोस्...",
    historyTitle: "कुराकानी इतिहास",
    back: "← फर्कनुहोस्",
    notFound: "कुनै इतिहास भेटिएन।",
    faqs: [
      ["मलाई ज्वरो आएको छ", "ज्वरो हुँदा आराम गर्नुहोस्, धेरै पानी पिउनुहोस्। ३ दिनभन्दा बढी रह्यो/धेरै उच्च ज्वरो भयो भने चिकित्सकलाई देखाउनुहोस्।"],
      ["टाउको दुखाइ", "पानी पिउनुहोस्, आराम गर्नुहोस्। तनाव/निद्रा कमीले पनि हुन सक्छ। धेरै बढे वा बारम्बार भए चिकित्सकसँग सल्लाह लिनुहोस्।"],
      ["खोकी लागेको छ", "तातो पानी/झोल पिउनुहोस्। १ हप्ताभन्दा बढी रह्यो, सास फेर्न गाह्रो भयो वा रगत आयो भने चिकित्सकलाई देखाउनुहोस्।"],
      ["पेट दुखाइ", "हल्का खाना, पानी, र विश्राम गर्नुहोस्। अत्यधिक दुखाइ, बान्ता/रगत, वा १–२ दिनमा नठिक भए चिकित्सकलाई देखाउनुहोस्।"],
      ["ब्लड प्रेसर", "नुन कम गर्नुहोस्, नियमित व्यायाम/सन्तुलित आहार अपनाउनुहोस्। धेरै उच्च/कम भए चिकित्सकसँग सल्लाह लिनुहोस्।"]
    ]
  },
  en: {
    welcome:
      "Hello! I'm Sara, your health assistant. I can provide health information and guidance. What are you concerned about today?",
    history: "History",
    resources: "Resources",
    photo: "Photo Analysis",
    recent: "Recent chats",
    clear: "Clear",
    faqTitle: "Frequently Asked Questions",
    faqHint: "Click to instantly show an answer in the main chat.",
    typing: "Typing...",
    disclaimer:
      "This chatbot is not a substitute for a doctor. For serious problems, consult a physician.",
    placeholder: "Type your health concern...",
    historyTitle: "Chat History",
    back: "← Back",
    notFound: "No history found.",
    faqs: [
      ["I have a fever", "Rest, drink fluids, and monitor your temperature. If it lasts more than 3 days or is very high, consult a doctor."],
      ["Headache", "Hydrate and rest. Stress and lack of sleep can also cause headaches. Seek medical advice if severe or frequent."],
      ["Cough", "Drink warm fluids. If it lasts more than a week, you have breathing difficulty, or cough blood, see a doctor."],
      ["Stomach pain", "Try light meals and hydration. If pain is severe, persistent, or you have vomiting/blood, consult a doctor."],
      ["Blood pressure", "Reduce salt, stay active, and check BP regularly. Consult a clinician for very high/low readings."]
    ]
  },
  hi: {
    welcome:
      "नमस्ते! मैं Sara हूँ, आपकी स्वास्थ्य सहायक। मैं स्वास्थ्य संबंधी जानकारी और मार्गदर्शन दे सकती हूँ। आपकी परेशानी क्या है?",
    history: "इतिहास",
    resources: "संसाधन",
    photo: "फोटो विश्लेषण",
    recent: "हाल की बातचीत",
    clear: "साफ करें",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqHint: "क्लिक करते ही उत्तर मुख्य चैट में दिखेगा।",
    typing: "टाइप कर रही हूँ...",
    disclaimer:
      "यह चैटबॉट डॉक्टर का विकल्प नहीं है। गंभीर समस्या में डॉक्टर से सलाह लें।",
    placeholder: "अपनी समस्या लिखें...",
    historyTitle: "चैट इतिहास",
    back: "← वापस",
    notFound: "कोई इतिहास नहीं मिला।",
    faqs: [
      ["मुझे बुखार है", "आराम करें, तरल पदार्थ पिएँ। 3 दिन से अधिक रहे या बहुत अधिक हो तो डॉक्टर से मिलें।"],
      ["सिरदर्द", "पानी पिएँ और आराम करें। तनाव/नींद की कमी से भी हो सकता है। ज्यादा हो तो डॉक्टर से सलाह लें।"],
      ["खांसी", "गर्म तरल पिएँ। 1 हफ्ते से ज्यादा रहे, सांस में दिक्कत या खून आए तो डॉक्टर को दिखाएँ।"],
      ["पेट दर्द", "हल्का खाना और पानी लें। तेज दर्द/उल्टी/खून या न सुधरे तो डॉक्टर से मिलें।"],
      ["ब्लड प्रेशर", "नमक कम करें, सक्रिय रहें, नियमित जाँच करें। बहुत अधिक/कम हो तो डॉक्टर से सलाह लें।"]
    ]
  },
  mai: {
    welcome:
      "नमस्कार! हम Sara छी, अहाँक स्वास्थ्य सहायक। हम स्वास्थ्य सम्बन्धी जानकारी आ मार्गदर्शन दऽ सकैत छी। अहाँकेँ की समस्या अछि?",
    history: "इतिहास",
    resources: "संसाधन",
    photo: "फोटो विश्लेषण",
    recent: "हालक बातचीत",
    clear: "सफा करू",
    faqTitle: "बार-बार पूछल जाएवाला प्रश्न",
    faqHint: "क्लिक करतहि उत्तर मुख्य चैटमे देखायत।",
    typing: "टाइप करैत छी...",
    disclaimer:
      "ई चैटबट डॉक्टरक विकल्प नहि अछि। गंभीर समस्या मे डॉक्टरसँ सलाह लिअ।",
    placeholder: "अपन समस्या लिखू...",
    historyTitle: "चैट इतिहास",
    back: "← वापस",
    notFound: "कोनो इतिहास नहि भेटल।",
    faqs: [
      ["ज्वर अछि", "आराम करू, तरल चीज पियू। 3 दिनसँ बेसी रहल/बहुत बढ़ल तँ डॉक्टरसँ मिलू।"],
      ["सिरदर्द", "पानी पियू आ आराम करू। तनाव/नींद कमी सँ हो सकैत अछि। बहुत बढ़ल तँ सलाह लिअ।"],
      ["खांसी", "गरम तरल पियू। 1 हफ्ता सँ बेसी रहल/साँस दिक्कत/रक्त आयल तँ डॉक्टर देखाउ।"],
      ["पेट दर्द", "हल्का खाना आ पानी। बहुत तेज/उल्टी/रक्त वा ठीक नहि भेल तँ डॉक्टर देखाउ।"],
      ["ब्लड प्रेसर", "नून कम करू, सक्रिय रहू, नियमित जाँच। बहुत अधिक/कम भेल तँ सलाह लिअ।"]
    ]
  }
};

let currentLang = localStorage.getItem("lang") || "ne";

/* ========= STORAGE (history) ========= */
const HISTORY_KEY = "sara_chat_history_v1";

function loadHistoryStore() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistoryStore(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

function pushHistory(role, text) {
  const h = loadHistoryStore();
  h.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    role,
    text,
    time: new Date().toISOString()
  });
  saveHistoryStore(h);
}

/* ========= PAGE NAV ========= */
function showPage(name) {
  const pages = {
    chat: $("pageChat"),
    history: $("pageHistory"),
    resources: $("pageResources"),
    image: $("pageImage")
  };

  Object.entries(pages).forEach(([k, el]) => {
    if (!el) return;
    if (k === name) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });

  // When returning to chat, scroll bottom
  if (name === "chat") {
    const chatContainer = $("chatContainer");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

/* ========= UI: SIDEBAR (mobile open/close) ========= */
function openMobileSidebar() {
  const mobileSidebar = $("mobileSidebar");
  const overlay = $("sidebarOverlay");
  if (mobileSidebar) mobileSidebar.classList.remove("-translate-x-full");
  if (overlay) overlay.classList.remove("hidden");
}
function closeMobileSidebar() {
  const mobileSidebar = $("mobileSidebar");
  const overlay = $("sidebarOverlay");
  if (mobileSidebar) mobileSidebar.classList.add("-translate-x-full");
  if (overlay) overlay.classList.add("hidden");
}

/* ========= CHAT RENDER ========= */
function appendMessage(role, text) {
  const container = $("messagesContainer");
  const chatScroll = $("chatContainer");
  if (!container || !chatScroll) return;

  const wrap = document.createElement("div");
  wrap.className = "max-w-4xl mx-auto";

  if (role === "user") {
    wrap.innerHTML = `
      <div class="flex items-start justify-end">
        <div class="medical-card p-4 max-w-md bg-primary-50 border border-slate-200">
          <p class="text-text-primary">${escapeHtml(text)}</p>
        </div>
      </div>
    `;
  } else {
    wrap.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <div class="medical-card p-4 max-w-md">
          <p class="text-text-primary">${escapeHtml(text)}</p>
        </div>
      </div>
    `;
  }

  container.appendChild(wrap);
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function addUserMessage(text) {
  appendMessage("user", text);
  pushHistory("user", text);
  refreshRecentChats();
}

function addBotMessage(text) {
  appendMessage("bot", text);
  pushHistory("bot", text);
  refreshRecentChats();
}

/* ========= FAQ (instant load) ========= */
function renderFAQ() {
  const L = LANG[currentLang] || LANG.ne;

  // Titles / hints
  safeText("faqSidebarTitle", L.faqTitle);
  safeText("faqSidebarTitleMobile", L.faqTitle);
  safeText("faqHintText", L.faqHint);
  safeText("faqHintTextMobile", L.faqHint);

  const desktopList = $("faqSidebarList");
  const mobileList = $("faqSidebarListMobile");

  function fillList(listEl, sizeClass) {
    if (!listEl) return;
    listEl.innerHTML = "";
    L.faqs.forEach(([q, a]) => {
      const btn = document.createElement("button");
      btn.className = `medical-button-secondary ${sizeClass} w-full text-left`;
      btn.type = "button";
      btn.textContent = q;
      btn.addEventListener("click", () => {
        showPage("chat");
        closeMobileSidebar();
        addBotMessage(a);
      });
      listEl.appendChild(btn);
    });
  }

  fillList(desktopList, "text-xs");
  fillList(mobileList, "text-sm");
}

/* ========= HISTORY PAGE ========= */
function formatLocalTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

function loadHistoryPage() {
  const L = LANG[currentLang] || LANG.ne;
  const list = $("historyList");
  if (!list) return;

  list.innerHTML = "";
  const h = loadHistoryStore();

  if (!h.length) {
    const empty = document.createElement("div");
    empty.className = "medical-card p-4";
    empty.textContent = L.notFound;
    list.appendChild(empty);
    return;
  }

  // newest first
  const reversed = [...h].reverse();
  reversed.forEach((item) => {
    const div = document.createElement("div");
    div.className = "medical-card p-4";
    div.innerHTML = `
      <div class="text-xs text-slate-500 mb-2">${escapeHtml(formatLocalTime(item.time))}</div>
      <div class="text-sm">
        <span class="font-medium text-text-secondary">${item.role === "user" ? "You" : "Sara"}:</span>
        <span class="text-text-primary">${escapeHtml(item.text)}</span>
      </div>
    `;
    list.appendChild(div);
  });
}

function clearAllHistory() {
  saveHistoryStore([]);
  const msg = (LANG[currentLang] || LANG.ne).notFound;
  // wipe chat messages UI too
  const container = $("messagesContainer");
  if (container) container.innerHTML = "";
  // show a single bot message so UI isn't empty (optional)
  addBotMessage(msg);
  loadHistoryPage();
  refreshRecentChats();
}

/* ========= RECENT CHATS (sidebar list) ========= */
function refreshRecentChats() {
  const list = $("recentChatsList");
  if (!list) return;

  const h = loadHistoryStore();
  // show last 6 messages (newest first)
  const last = [...h].slice(-6).reverse();

  list.innerHTML = "";
  if (!last.length) return;

  last.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "medical-card p-3 hover:bg-slate-50 transition-colors text-left w-full";
    btn.innerHTML = `
      <div class="text-xs text-slate-500 mb-1">${escapeHtml(formatLocalTime(item.time))}</div>
      <div class="text-sm line-clamp-2">
        <span class="font-medium text-text-secondary">${item.role === "user" ? "You" : "Sara"}:</span>
        <span class="text-text-primary">${escapeHtml(item.text)}</span>
      </div>
    `;
    btn.addEventListener("click", () => {
      showPage("chat");
      closeMobileSidebar();
      // optionally scroll bottom
      const chatContainer = $("chatContainer");
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    list.appendChild(btn);
  });
}

/* ========= APPLY LANGUAGE ========= */
function applyLanguage() {
  const L = LANG[currentLang] || LANG.ne;

  safeText("welcomeMessage", L.welcome);
  safeText("historyLink", L.history);
  safeText("mobileHistoryLink", L.history);
  safeText("resourcesLink", L.resources);
  safeText("mobileResourcesLink", L.resources);
  safeText("photoAnalysisText", L.photo);
  safeText("mobileImageLink", L.photo);
  safeText("recentChatsTitle", L.recent);
  safeText("clearHistoryText", L.clear);
  safeText("mobileClearText", L.clear);
  safeText("typingText", L.typing);
  safeText("disclaimerBanner", L.disclaimer);
  safeText("historyTitle", L.historyTitle);
  safeText("historyBackText", L.back);
  safeText("resourcesBackText", L.back);
  safeText("imgBackText", L.back);

  const msgInput = $("messageInput");
  if (msgInput) msgInput.placeholder = L.placeholder;

  // Keep header language selector synced
  const langSelect = $("headerLanguageSelect");
  if (langSelect) langSelect.value = currentLang;

  renderFAQ();
  loadHistoryPage();
  refreshRecentChats();
}

/* ========= EVENTS ========= */
function bindEvents() {
  // Language select (header)
  const langSelect = $("headerLanguageSelect");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", (e) => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      applyLanguage();
    });
  }

  // Mobile menu
  onClick("menuBtn", openMobileSidebar);
  onClick("closeMobileSidebar", closeMobileSidebar);
  onClick("sidebarOverlay", closeMobileSidebar);

  // Sidebar navigation
  const goHistory = () => {
    showPage("history");
    closeMobileSidebar();
    loadHistoryPage();
  };
  const goResources = () => {
    showPage("resources");
    closeMobileSidebar();
  };
  const goImage = () => {
    showPage("image");
    closeMobileSidebar();
  };

  onClick("openHistoryDesktop", goHistory);
  onClick("openHistoryMobile", goHistory);

  onClick("openResourcesDesktop", goResources);
  onClick("openResourcesMobile", goResources);

  onClick("openImageDesktop", goImage);
  onClick("openImageMobile", goImage);

  // Back buttons
  onClick("historyBack", () => showPage("chat"));
  onClick("resourcesBack", () => showPage("chat"));
  onClick("imgBack", () => showPage("chat"));

  // Clear history buttons
  onClick("clearHistoryDesktop", () => clearAllHistory());
  onClick("clearHistoryMobile", () => clearAllHistory());
  onClick("historyClear", () => clearAllHistory());

  // Chat form submit
  const form = $("chatForm");
  const input = $("messageInput");
  const sendBtn = $("sendButton");
  if (input && sendBtn) {
    const syncSendState = () => {
      const hasText = input.value.trim().length > 0;
      sendBtn.disabled = !hasText;
    };
    input.addEventListener("input", syncSendState);
    syncSendState();
  }

  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = input.value.trim();
      if (!txt) return;
      addUserMessage(txt);
      input.value = "";
      if (sendBtn) sendBtn.disabled = true;

      // NOTE: Here you can call your backend/AI.
      // For now, a simple placeholder reply:
      setTimeout(() => {
        addBotMessage("धन्यवाद। कृपया थप विवरण दिनुहोस् (उमेर, लक्षणको अवधि, ज्वरो/दुखाइको स्तर)।");
      }, 300);
    });
  }

  // Quick chips (existing in HTML)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick]");
    if (!btn) return;
    const q = btn.getAttribute("data-quick");
    if (!q) return;
    showPage("chat");
    closeMobileSidebar();
    addUserMessage(q);
    setTimeout(() => {
      addBotMessage("ठिक छ। कृपया थप विवरण दिनुहोस् (कति दिन भयो, कस्तो लक्षण छ, कुनै औषधि चलिरहेको छ?).");
    }, 250);
  });

  // Optional: FAQ refresh button (kept simple)
  onClick("faqRefreshBtn", () => renderFAQ());

  // History title click / other
  // Emergency modal controls (if you already have in your app.js, keep yours; this is safe)
  const emergencyModal = $("emergencyModal");
  const emergencyBtn = $("emergencyBtn");
  const emergencyClose = $("emergencyClose");
  if (emergencyBtn && emergencyModal) {
    emergencyBtn.addEventListener("click", () => show(emergencyModal));
  }
  if (emergencyClose && emergencyModal) {
    emergencyClose.addEventListener("click", () => hide(emergencyModal));
  }
  if (emergencyModal) {
    emergencyModal.addEventListener("click", (e) => {
      if (e.target === emergencyModal) hide(emergencyModal);
    });
  }
}

/* ========= INIT ========= */
(function init() {
  // Default to chat page
  showPage("chat");

  bindEvents();
  applyLanguage();

  // If you want to show previous history in chat on load, uncomment:
  // const h = loadHistoryStore();
  // if (h.length) h.forEach(item => appendMessage(item.role, item.text));
})();
