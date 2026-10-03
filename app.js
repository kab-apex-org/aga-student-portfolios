const COURSES = [
  { id: "experience", name: "AI 體驗課", english: "AI Discovery Experience", open: true },
  { id: "bdg", name: "BDG 探索實踐班", english: "Explore & Practice" },
  { id: "f1f2", name: "F1-F2 AI 基礎認證班", english: "AI Foundations" },
  { id: "a1a2", name: "A1-A2 AI 應用認證班", english: "AI Applications" },
  { id: "e1e2", name: "E1-E2 AI 工程師認證班", english: "AI Engineering" },
  { id: "a3a4", name: "A3-A4 AI 應用認證班（高階）", english: "Advanced AI Applications" },
  { id: "e3e4", name: "E3-E4 AI 工程師認證班（高階）", english: "Advanced AI Engineering" }
];

const WORKS = {
  ula: { name: "Ula", title: "小章魚", detail: "皮皮的電子小寵物", url: "works/ula.html" },
  cynthia: { name: "Cynthia", title: "阿頭", detail: "安安的電子雞", url: "works/cynthia.html" }
};

const LOGIN_HASH = "9580c3cc32b02435dcf88f9d7f6395339570ac2a008d1015a307919f04f50ef5";
const AUTH_KEY = "aga_experience_access";
const app = document.getElementById("app");

function shell(content, viewer = false) {
  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="#/" aria-label="回到學生作品集首頁">
            <img src="assets/logo.png" alt="">
            <span>AI 原生學院 · 學生作品集</span>
          </a>
          <span class="topbar-note">APEXAGON GLOBAL ACADEMY</span>
        </div>
      </header>
      <main id="main" class="${viewer ? "viewer-main" : "main"}">${content}</main>
    </div>`;
}

function home() {
  const courses = COURSES.map((course, i) => `
    <a class="course-button ${course.open ? "featured" : ""}" href="#/login/${course.id}">
      <span class="course-index">${String(i + 1).padStart(2, "0")}</span>
      <span><span class="course-title">${course.name}</span><span class="course-subtitle">${course.english}</span></span>
      <span class="pill ${course.open ? "" : "dim"}">${course.open ? "作品開放中" : "登入查看"}</span>
      <span class="chevron" aria-hidden="true">›</span>
    </a>`).join("");
  return shell(`
    <section class="hero" aria-labelledby="home-title">
      <img class="hero-logo" src="assets/logo.png" alt="Apexagon Global Academy 校徽">
      <div>
        <p class="eyebrow">Apexagon Global Academy</p>
        <h1 id="home-title">學生作品集</h1>
        <p class="english-title">Student Portfolio</p>
        <p class="lead">AI 原生學院 Portfoilio - 學生作品與學習歷程檔案庫</p>
      </div>
    </section>
    <div class="section-head"><h2>選擇班級</h2><span>請點選所屬課程進入</span></div>
    <nav class="course-list" aria-label="班級列表">${courses}</nav>
    <p class="small-footer">© 2026 Apexagon Global Academy · AI 原生學院</p>
  `);
}

function login(course) {
  return shell(`
    <div class="login-wrap">
      <a class="back" href="#/">← 返回班級列表</a>
      <div class="page-head">
        <p class="eyebrow">Student Portfolio / Login</p>
        <h1>${course.name}</h1>
        <p class="lead">登入後，即可瀏覽該班級的課堂成果。</p>
      </div>
      <section class="login-panel" aria-labelledby="login-title">
        <h2 id="login-title">作品集登入</h2>
        <p>請輸入班級提供的帳號和密碼。</p>
        <form id="login-form" data-course="${course.id}">
          <label class="field"><span>登入帳號</span><input name="username" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" required></label>
          <label class="field"><span>登入密碼</span><input name="password" type="password" autocomplete="current-password" required></label>
          <button class="primary" type="submit">登入作品集 →</button>
          <p class="form-message" id="form-message" role="alert" aria-live="polite"></p>
        </form>
      </section>
    </div>
  `);
}

function sessions() {
  return shell(`
    <a class="back" href="#/">← 返回班級列表</a>
    <div class="page-head">
      <p class="eyebrow">AI Discovery Experience</p>
      <h1>AI 體驗課</h1>
      <p class="lead">選擇上課班級，瀏覽 2026 年 10 月 4 日的課堂學習與學生作品。</p>
    </div>
    <nav class="session-list" aria-label="體驗課班級">
      <a class="session-button" href="#/class/bdg">
        <span class="session-mark">B</span>
        <strong>BDG 班</strong>
        <small>2026 年 10 月 4 日 · 查看課堂與作品</small>
        <span class="chevron" aria-hidden="true">›</span>
      </a>
      <a class="session-button" href="#/class/f1">
        <span class="session-mark">F</span>
        <strong>F1 班</strong>
        <small>2026 年 10 月 4 日 · 查看課堂內容</small>
        <span class="chevron" aria-hidden="true">›</span>
      </a>
    </nav>
  `);
}

function workCard(key) {
  const work = WORKS[key];
  return `
    <a class="work-card" href="#/work/${key}" aria-label="觀看 ${work.name} 的${work.title}互動作品">
      <div class="thumb">
        <iframe src="${work.url}" title="${work.name} 作品縮圖" tabindex="-1" aria-hidden="true" loading="lazy" sandbox="allow-scripts"></iframe>
      </div>
      <div class="work-meta">
        <small>STUDENT WORK · INTERACTIVE WEBPAGE</small>
        <strong>${work.name}</strong>
        <span>${work.title}｜${work.detail}</span>
      </div>
    </a>`;
}

function classPage(classId) {
  const bdg = classId === "bdg";
  return shell(`
    <a class="back" href="#/sessions">← 返回體驗課班級</a>
    <div class="page-head">
      <p class="eyebrow">AI Discovery Experience · 2026.10.04</p>
      <h1>${bdg ? "BDG 班" : "F1 班"} · 課堂作品</h1>
      <p class="lead">主題：設計並完成專屬的互動式智能小寵物。</p>
    </div>
    <section class="content-panel" aria-labelledby="learning-title">
      <h2 id="learning-title">這堂課，從設計走到實作</h2>
      <p>學生從寵物角色與互動規則出發，理解生成式 AI 的應用，規劃動作、製作可操作的網頁，並透過測試與修改完成自己的作品。</p>
      <div class="learning-grid">
        <div class="learning-item"><b>AI 概念與判讀</b><span>辨識感知型與生成式 AI，練習檢查生成結果。</span></div>
        <div class="learning-item"><b>系統設計思維</b><span>規劃角色特徵與互動規則，建立清楚的設計規格。</span></div>
        <div class="learning-item"><b>${bdg ? "網頁互動邏輯" : "觸發與自動化邏輯"}</b><span>${bdg ? "把寵物動作轉化成可點按、會回應的網頁功能。" : "設計觸發條件、寵物反應與自動回應方式。"}</span></div>
        <div class="learning-item"><b>測試與迭代</b><span>檢查動作與按鈕，具體指出問題並調整作品。</span></div>
      </div>
    </section>
    <div class="works-head">
      <h2>學生作品</h2>
      <p>${bdg ? "點按作品縮圖，即可開啟並親自操作學生設計的電子寵物。" : "這個班級的作品將於完成後陸續上架。"}</p>
    </div>
    ${bdg ? `<div class="work-grid">${workCard("ula")}${workCard("cynthia")}</div>` : `<div class="empty-panel"><span class="empty-icon">✦</span><strong>作品即將上架</strong><span>目前尚無 F1 班作品可展示。</span></div>`}
  `);
}

function workPage(key) {
  const work = WORKS[key];
  return shell(`
    <div class="viewer-bar">
      <div><a class="back" href="#/class/bdg">← 返回 BDG 班作品</a><h1>${work.name} · ${work.title}</h1><p>點按作品中的按鈕，與寵物互動。</p></div>
    </div>
    <iframe class="work-frame" src="${work.url}" title="${work.name} 的${work.title}互動作品" sandbox="allow-scripts"></iframe>
  `, true);
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, "0")).join("");
}

function isAuthorized() {
  return sessionStorage.getItem(AUTH_KEY) === "yes";
}

function render() {
  const parts = (location.hash.slice(1) || "/").split("/").filter(Boolean);
  if (parts.length === 0) {
    app.innerHTML = home();
  } else if (parts[0] === "login") {
    const course = COURSES.find(item => item.id === parts[1]);
    app.innerHTML = course ? login(course) : home();
  } else if (parts[0] === "sessions" || parts[0] === "class" || parts[0] === "work") {
    if (!isAuthorized()) {
      location.replace("#/login/experience");
      return;
    }
    if (parts[0] === "sessions") app.innerHTML = sessions();
    else if (parts[0] === "class" && ["bdg", "f1"].includes(parts[1])) app.innerHTML = classPage(parts[1]);
    else if (parts[0] === "work" && WORKS[parts[1]]) app.innerHTML = workPage(parts[1]);
    else app.innerHTML = home();
  } else {
    app.innerHTML = home();
  }
  window.scrollTo(0, 0);
}

app.addEventListener("submit", async event => {
  if (event.target.id !== "login-form") return;
  event.preventDefault();
  const form = event.target;
  const message = form.querySelector("#form-message");
  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;
  message.textContent = "";
  if (form.dataset.course !== "experience") {
    message.textContent = "此班級作品集目前尚未開放。";
    return;
  }
  try {
    if (await digest(`${username}:${password}`) === LOGIN_HASH) {
      sessionStorage.setItem(AUTH_KEY, "yes");
      location.hash = "#/sessions";
    } else {
      message.textContent = "帳號或密碼不正確，請再試一次。";
    }
  } catch {
    message.textContent = "目前無法完成登入，請稍後再試。";
  }
});

window.addEventListener("hashchange", render);
render();
