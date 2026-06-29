(function () {
  "use strict";

  const BLOCKS = window.QUIZ_BLOCKS || [];
  const QUESTIONS = window.QUIZ_QUESTIONS || [];

  const state = {
    mode: null, // "block" | "full" | "retry"
    activeBlockId: null,
    activeQuestions: [],
    currentIndex: 0,
    answers: [],
    selectedLocked: false,
    historyByBlock: {},
    lastWrongQuestions: []
  };

  const el = {
    viewMenu: byId("view-menu"),
    viewQuiz: byId("view-quiz"),
    viewResults: byId("view-results"),

    globalProgressLabel: byId("global-progress-label"),
    blocksGrid: byId("blocks-grid"),
    btnFullExam: byId("btn-full-exam"),

    btnBack: byId("btn-back"),
    quizModeLabel: byId("quiz-mode-label"),
    quizCounter: byId("quiz-counter"),
    progressBar: byId("progress-bar"),
    questionText: byId("question-text"),
    optionsList: byId("options-list"),
    feedbackBox: byId("feedback-box"),
    feedbackText: byId("feedback-text"),
    btnNext: byId("btn-next"),

    resultsTitle: byId("results-title"),
    scoreCircle: byId("score-circle"),
    scorePercent: byId("score-percent"),
    scoreSummary: byId("score-summary"),
    blockBreakdown: byId("block-breakdown"),
    breakdownList: byId("breakdown-list"),
    wrongAnswers: byId("wrong-answers"),
    wrongList: byId("wrong-list"),
    btnRetry: byId("btn-retry"),
    btnHome: byId("btn-home")
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function init() {
    if (!Array.isArray(BLOCKS) || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
      alert("No se pudieron cargar los datos del quiz.");
      return;
    }

    wireEvents();
    renderBlockButtons();
    refreshGlobalProgress();
    showView("menu");
  }

  function wireEvents() {
    el.btnFullExam.addEventListener("click", startFullExam);
    el.btnBack.addEventListener("click", handleBackToMenu);
    el.btnNext.addEventListener("click", handleNextQuestion);
    el.btnRetry.addEventListener("click", startRetryWrong);
    el.btnHome.addEventListener("click", () => {
      showView("menu");
      renderBlockButtons();
      refreshGlobalProgress();
    });
  }

  function renderBlockButtons() {
    el.blocksGrid.innerHTML = "";

    for (const block of BLOCKS) {
      const questionsInBlock = QUESTIONS.filter(q => q.block === block.id);
      const history = state.historyByBlock[block.id];

      const btn = document.createElement("button");
      btn.className = "block-btn";
      btn.type = "button";
      btn.innerHTML = `
        <span class="block-num">${block.id}</span>
        <span class="block-info">
          <strong>${escapeHtml(block.title)}</strong>
          <small>${escapeHtml(block.subtitle)} · ${questionsInBlock.length} preguntas</small>
        </span>
        ${history
          ? `<span class="block-score-badge done">${history.correct}/${history.total}</span>`
          : `<span class="block-score-badge pending">Pendiente</span>`
        }
      `;

      btn.addEventListener("click", () => startBlockQuiz(block.id));
      el.blocksGrid.appendChild(btn);
    }
  }

  function refreshGlobalProgress() {
    const answeredUnique = new Set();
    Object.values(state.historyByBlock).forEach(h => {
      if (h && Array.isArray(h.questionIds)) {
        h.questionIds.forEach(id => answeredUnique.add(id));
      }
    });

    el.globalProgressLabel.textContent = `${answeredUnique.size} / ${QUESTIONS.length} respondidas`;
  }

  function startBlockQuiz(blockId) {
    const block = BLOCKS.find(b => b.id === blockId);
    const blockQuestions = QUESTIONS.filter(q => q.block === blockId);

    resetRunState();
    state.mode = "block";
    state.activeBlockId = blockId;
    state.activeQuestions = shuffle([...blockQuestions]);

    el.quizModeLabel.textContent = `Bloque ${blockId}: ${block ? block.title : ""}`;

    showView("quiz");
    renderCurrentQuestion();
  }

  function startFullExam() {
    resetRunState();
    state.mode = "full";
    state.activeBlockId = null;
    state.activeQuestions = shuffle([...QUESTIONS]);

    el.quizModeLabel.textContent = "Examen Completo";

    showView("quiz");
    renderCurrentQuestion();
  }

  function startRetryWrong() {
    if (!state.lastWrongQuestions.length) {
      return;
    }

    resetRunState();
    state.mode = "retry";
    state.activeQuestions = shuffle([...state.lastWrongQuestions]);

    el.quizModeLabel.textContent = "Repaso de Falladas";

    showView("quiz");
    renderCurrentQuestion();
  }

  function resetRunState() {
    state.currentIndex = 0;
    state.answers = [];
    state.selectedLocked = false;
    hideFeedback();
    el.btnNext.classList.add("hidden");
  }

  function renderCurrentQuestion() {
    const q = state.activeQuestions[state.currentIndex];
    if (!q) {
      finishQuiz();
      return;
    }

    state.selectedLocked = false;
    hideFeedback();
    el.btnNext.classList.add("hidden");

    el.quizCounter.textContent = `Pregunta ${state.currentIndex + 1} de ${state.activeQuestions.length}`;
    el.questionText.textContent = q.question;

    const progress = ((state.currentIndex) / state.activeQuestions.length) * 100;
    el.progressBar.style.width = `${progress}%`;

    el.optionsList.innerHTML = "";

    q.options.forEach((opt, i) => {
      const optionBtn = document.createElement("button");
      optionBtn.type = "button";
      optionBtn.className = "option-btn";
      optionBtn.innerHTML = `
        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
        <span>${escapeHtml(opt)}</span>
      `;

      optionBtn.addEventListener("click", () => selectOption(i));
      el.optionsList.appendChild(optionBtn);
    });
  }

  function selectOption(index) {
    if (state.selectedLocked) {
      return;
    }

    state.selectedLocked = true;

    const q = state.activeQuestions[state.currentIndex];
    const isCorrect = index === q.correctIndex;

    state.answers.push({
      questionId: q.id,
      block: q.block,
      selectedIndex: index,
      correctIndex: q.correctIndex,
      isCorrect,
      question: q.question,
      options: q.options,
      explanation: q.explanation
    });

    const optionButtons = Array.from(el.optionsList.querySelectorAll(".option-btn"));
    optionButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correctIndex) {
        btn.classList.add("correct");
      }
      if (i === index && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    showFeedback(isCorrect, q.explanation, q.options[q.correctIndex]);

    const isLast = state.currentIndex === state.activeQuestions.length - 1;
    el.btnNext.textContent = isLast ? "Ver resultados" : "Siguiente ->";
    el.btnNext.classList.remove("hidden");

    const progress = ((state.currentIndex + 1) / state.activeQuestions.length) * 100;
    el.progressBar.style.width = `${progress}%`;
  }

  function showFeedback(isCorrect, explanation, correctOptionText) {
    el.feedbackBox.classList.remove("hidden", "correct-fb", "wrong-fb");

    if (isCorrect) {
      el.feedbackBox.classList.add("correct-fb");
      el.feedbackText.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(explanation)}`;
    } else {
      el.feedbackBox.classList.add("wrong-fb");
      el.feedbackText.innerHTML = `<strong>Incorrecto.</strong> Respuesta correcta: <code>${escapeHtml(correctOptionText)}</code><br>${escapeHtml(explanation)}`;
    }
  }

  function hideFeedback() {
    el.feedbackBox.classList.add("hidden");
    el.feedbackBox.classList.remove("correct-fb", "wrong-fb");
    el.feedbackText.textContent = "";
  }

  function handleNextQuestion() {
    if (!state.selectedLocked) {
      return;
    }

    state.currentIndex += 1;
    if (state.currentIndex >= state.activeQuestions.length) {
      finishQuiz();
      return;
    }

    renderCurrentQuestion();
  }

  function finishQuiz() {
    const total = state.answers.length;
    const correct = state.answers.filter(a => a.isCorrect).length;
    const percent = total ? Math.round((correct / total) * 100) : 0;

    state.lastWrongQuestions = state.answers
      .filter(a => !a.isCorrect)
      .map(a => QUESTIONS.find(q => q.id === a.questionId))
      .filter(Boolean);

    if (state.mode === "block" && state.activeBlockId != null) {
      state.historyByBlock[state.activeBlockId] = {
        correct,
        total,
        questionIds: state.answers.map(a => a.questionId)
      };
    }

    if (state.mode === "full") {
      // Al finalizar examen completo, actualizar history por bloque
      for (const block of BLOCKS) {
        const blockAnswers = state.answers.filter(a => a.block === block.id);
        state.historyByBlock[block.id] = {
          correct: blockAnswers.filter(a => a.isCorrect).length,
          total: blockAnswers.length,
          questionIds: blockAnswers.map(a => a.questionId)
        };
      }
    }

    renderResults({ total, correct, percent });
    refreshGlobalProgress();
    renderBlockButtons();
    showView("results");
  }

  function renderResults({ total, correct, percent }) {
    const modeTitle =
      state.mode === "full"
        ? "Resultados — Examen Completo"
        : state.mode === "retry"
        ? "Resultados — Repaso"
        : `Resultados — Bloque ${state.activeBlockId}`;

    el.resultsTitle.textContent = modeTitle;
    el.scorePercent.textContent = `${percent}%`;
    el.scoreSummary.textContent = `${correct} correctas de ${total}`;

    el.scoreCircle.classList.remove("mid", "low");
    if (percent < 60) {
      el.scoreCircle.classList.add("low");
    } else if (percent < 80) {
      el.scoreCircle.classList.add("mid");
    }

    if (state.mode === "full") {
      renderBreakdown();
      el.blockBreakdown.classList.remove("hidden");
    } else {
      el.blockBreakdown.classList.add("hidden");
      el.breakdownList.innerHTML = "";
    }

    renderWrongAnswers();

    if (state.lastWrongQuestions.length > 0) {
      el.btnRetry.classList.remove("hidden");
    } else {
      el.btnRetry.classList.add("hidden");
    }
  }

  function renderBreakdown() {
    el.breakdownList.innerHTML = "";

    for (const block of BLOCKS) {
      const answers = state.answers.filter(a => a.block === block.id);
      if (!answers.length) {
        continue;
      }

      const correct = answers.filter(a => a.isCorrect).length;
      const total = answers.length;
      const pct = Math.round((correct / total) * 100);

      const row = document.createElement("div");
      row.className = "breakdown-item";

      const levelClass = pct < 60 ? "low" : pct < 80 ? "mid" : "";

      row.innerHTML = `
        <span class="breakdown-name">Bloque ${block.id}: ${escapeHtml(block.title)}</span>
        <span class="breakdown-bar-wrap">
          <span class="breakdown-bar ${levelClass}" style="width:${pct}%"></span>
        </span>
        <span class="breakdown-score">${correct}/${total}</span>
      `;

      el.breakdownList.appendChild(row);
    }
  }

  function renderWrongAnswers() {
    const wrong = state.answers.filter(a => !a.isCorrect);

    if (!wrong.length) {
      el.wrongAnswers.classList.add("hidden");
      el.wrongList.innerHTML = "";
      return;
    }

    el.wrongAnswers.classList.remove("hidden");
    el.wrongList.innerHTML = "";

    wrong.forEach((w, idx) => {
      const card = document.createElement("div");
      card.className = "wrong-item";

      card.innerHTML = `
        <p class="wrong-question">${idx + 1}. ${escapeHtml(w.question)}</p>
        <p class="wrong-your">Tu respuesta: ${escapeHtml(w.options[w.selectedIndex])}</p>
        <p class="wrong-correct">Correcta: ${escapeHtml(w.options[w.correctIndex])}</p>
        <p class="wrong-explanation">${escapeHtml(w.explanation)}</p>
      `;

      el.wrongList.appendChild(card);
    });
  }

  function handleBackToMenu() {
    const shouldLeave = confirm("Si vuelves al menu perderas el progreso del quiz actual. Continuar?");
    if (!shouldLeave) {
      return;
    }

    showView("menu");
    refreshGlobalProgress();
    renderBlockButtons();
  }

  function showView(name) {
    el.viewMenu.classList.remove("active");
    el.viewQuiz.classList.remove("active");
    el.viewResults.classList.remove("active");

    if (name === "menu") {
      el.viewMenu.classList.add("active");
    } else if (name === "quiz") {
      el.viewQuiz.classList.add("active");
    } else if (name === "results") {
      el.viewResults.classList.add("active");
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  init();
})();
