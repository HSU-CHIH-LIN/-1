const questions = [
  {
    text: "清晨醒來，你最先想做的事是？",
    options: [
      { text: "靜坐冥想，整理思緒", type: "A" },
      { text: "出門走走，感受陽光", type: "B" },
      { text: "查看訊息，處理待辦", type: "C" },
      { text: "再睡一下，慢慢醒來", type: "D" }
    ]
  },
  {
    text: "面對不確定的未來，你的態度是？",
    options: [
      { text: "相信冥冥中有指引", type: "A" },
      { text: "積極規劃，主動出擊", type: "B" },
      { text: "順其自然，船到橋頭", type: "C" },
      { text: "先顧好眼前每一步", type: "D" }
    ]
  },
  {
    text: "若神明賜你一道護符，你希望是？",
    options: [
      { text: "平安健康", type: "A" },
      { text: "貴人相助", type: "B" },
      { text: "心靈平靜", type: "C" },
      { text: "突破困境", type: "D" }
    ]
  },
  {
    text: "在人群中，你通常扮演？",
    options: [
      { text: "傾聽者與安慰者", type: "A" },
      { text: "帶動氣氛的焦點", type: "B" },
      { text: "默默觀察的智者", type: "C" },
      { text: "實事求是的執行者", type: "D" }
    ]
  },
  {
    text: "你最嚮往的旅行方式是？",
    options: [
      { text: "朝聖古廟，感受信仰", type: "A" },
      { text: "老街美食，熱鬧探險", type: "B" },
      { text: "河畔獨行，看夕陽沉落", type: "C" },
      { text: "登山健行，挑戰體力", type: "D" }
    ]
  }
];

const results = {
  A: {
    icon: "🕯️",
    title: "靜心守護型・池府慈光",
    desc: "你內斂細膩，重視心靈的平穩。助順將軍提醒你：凡事不必躁進，靜心則明。近期宜多給自己獨處時間，可到廟裡上香祈福，或至金色水岸散步，讓河風吹散煩憂。"
  },
  B: {
    icon: "🔥",
    title: "積極開創型・助順開路",
    desc: "你行動力強、敢於嘗試。將軍爺鼓勵你：勇往直前之餘，記得謙卑與感恩。近期貴人運佳，適合拜訪廟宇後走一趟淡水老街，在人聲中尋找靈感與機緣。"
  },
  C: {
    icon: "🌊",
    title: "隨緣自在型・河港清風",
    desc: "你懂得順應時勢，不強求、不執著。神明說：上善若水，柔能克剛。近期宜放慢腳步，到漁人碼頭看夕陽，或沿河畔漫步，答案往往在水光與微風裡浮現。"
  },
  D: {
    icon: "⚔️",
    title: "堅毅突破型・王爺護航",
    desc: "你面對困難不輕言放棄，有將軍之風。助順將軍賜你力量：突破前先調息，欲速則不達。近期可在廟中祈求事業順遂，再登紅毛城遠眺，提醒自己格局要更大。"
  }
};

let currentQ = 0;
const scores = { A: 0, B: 0, C: 0, D: 0 };

const quizStart = document.getElementById("quizStart");
const quizActive = document.getElementById("quizActive");
const quizResult = document.getElementById("quizResult");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressBar = document.getElementById("progressBar");

document.getElementById("btnStartQuiz").addEventListener("click", startQuiz);
document.getElementById("btnRetry").addEventListener("click", resetQuiz);

function startQuiz() {
  currentQ = 0;
  scores.A = scores.B = scores.C = scores.D = 0;
  quizStart.classList.add("hidden");
  quizResult.classList.remove("show");
  quizActive.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQ];
  questionText.textContent = `第 ${currentQ + 1} 題：${q.text}`;
  progressBar.style.width = `${(currentQ / questions.length) * 100}%`;
  optionsContainer.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectAnswer(opt.type));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(type) {
  scores[type]++;
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";
  quizActive.classList.add("hidden");
  let max = "A";
  for (const k of ["B", "C", "D"]) {
    if (scores[k] > scores[max]) max = k;
  }
  const r = results[max];
  document.getElementById("resultIcon").textContent = r.icon;
  document.getElementById("resultTitle").textContent = r.title;
  document.getElementById("resultDesc").textContent = r.desc;
  quizResult.classList.add("show");
}

function resetQuiz() {
  quizResult.classList.remove("show");
  quizStart.classList.remove("hidden");
  progressBar.style.width = "0%";
}
