/* ========================================
   PYTHON LESSON - JAVASCRIPT
   Topic: Nested Conditionals (Кірістірілген шарттар)
   Grade: 7
   ======================================== */

// ===== CONFIGURATION =====
// Мұғалім осы бөлімді өзгерте алады!

const LESSON_CONFIG = {
  title: "Кірістірілген шарттар",
  subject: "Python бағдарламалау",
  grade: "7-сынып",
  teacher: "Раухат Ағай",
  totalPoints: 10,

  // Тапсырмалардың дұрыс жауаптары
  // Жаңа тақырып үшін осы бөлімді өзгертіңіз
  tasks: {
    task1: {
      points: 2,
      answers: {
        blank1: "if",
        blank2: "elif",
        blank3: "else",
      },
    },
    task2: {
      points: 2,
      correctAnswers: ["B", "b", '"B"', "'B'", "B "],
    },
    task3: {
      points: 2,
      requiredFixes: {
        colon: ":", // Қос нүкте болуы керек
        indent: "    print", // Шегініс болуы керек
      },
    },
    task4: {
      points: 2,
      answers: {
        1: "false", // Шегініс маңызды!
        2: "true", // elif бірнеше рет қолдануға болады
        3: "false", // else міндетті емес
        4: "true", // and операторында екеуі де True болуы керек
      },
    },
    task5: {
      points: 2,
      requirements: {
        variables: ["age", "ball"],
        outerIf: "if",
        nestedIf: true,
        print: "print",
      },
    },
  },

  // Бағалау хабарламалары
  messages: {
    excellent: "Керемет! Кірістірілген шарттарды тамаша меңгердіңіз! 🌟",
    good: "Жақсы! Біраз жаттығу керек. 👍",
    average: "Орташа нәтиже. Теорияны қайта оқыңыз. 📚",
    needsWork: "Көбірек жаттығу керек. Мысалдарды қайта қараңыз! 💪",
  },
};

// ===== GLOBAL STATE =====
let scores = {
  task1: null,
  task2: null,
  task3: null,
  task4: null,
  task5: null,
};

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initDemoTabs();
  initTrueFalseButtons();
  initConfigPanel();
  initSmoothScroll();
  updateTotalScore();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuBtn.textContent = nav.classList.contains("show") ? "✕" : "☰";
    });

    // Close menu on link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuBtn.textContent = "☰";
      });
    });
  }
}

// ===== DEMO TABS =====
function initDemoTabs() {
  const tabs = document.querySelectorAll(".demo-tab");
  const panels = document.querySelectorAll(".demo-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      // Update tabs
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update panels
      panels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add("active");
        }
      });
    });
  });
}

// ===== TRUE/FALSE BUTTONS =====
function initTrueFalseButtons() {
  const tfButtons = document.querySelectorAll(".tf-btn");

  tfButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.parentElement;
      container
        .querySelectorAll(".tf-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
}

// ===== CONFIG PANEL =====
function initConfigPanel() {
  const toggle = document.getElementById("configToggle");
  const content = document.getElementById("configContent");

  if (toggle && content) {
    toggle.addEventListener("click", () => {
      content.classList.toggle("show");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".config-panel")) {
        content.classList.remove("show");
      }
    });
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== TASK 1: Fill in the blanks =====
function checkTask1() {
  const config = LESSON_CONFIG.tasks.task1;
  const blanks = ["blank1", "blank2", "blank3"];
  let correct = 0;

  blanks.forEach((blankId) => {
    const input = document.getElementById(blankId);
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = config.answers[blankId].toLowerCase();

    // Reset styling
    input.classList.remove("correct", "incorrect");

    if (userAnswer === correctAnswer) {
      correct++;
      input.classList.add("correct");
    } else if (userAnswer !== "") {
      input.classList.add("incorrect");
    }
  });

  // Calculate score based on descriptor
  let score = 0;
  if (correct === 3)
    score = 2; // All correct + bonus
  else if (correct === 2) score = 1;
  else if (correct === 1) score = 0.5;

  scores.task1 = score;
  showTaskFeedback(
    1,
    score,
    config.points,
    `${correct}/3 операторды дұрыс жаздыңыз`,
  );
  updateTaskStatus(1, score, config.points);
  updateTotalScore();
}

// ===== TASK 2: Find the output =====
function checkTask2() {
  const config = LESSON_CONFIG.tasks.task2;
  const input = document.getElementById("answer2");
  const userAnswer = input.value.trim();

  let score = 0;
  let message = "";

  // Check for correct answer
  const isCorrect = config.correctAnswers.some(
    (answer) => userAnswer.toUpperCase() === answer.toUpperCase().trim(),
  );

  if (isCorrect) {
    score = 2;
    message = "Толық дұрыс! Кірістірілген шарттарды жақсы талдадыңыз.";
    input.style.borderColor = "var(--color-success)";
  } else {
    score = 0;
    message =
      "Қате! Дұрыс жауап: B. x > y (10 > 5) = True, бірақ x > 15 (10 > 15) = False, сондықтан else жолы орындалады.";
    input.style.borderColor = "var(--color-error)";
  }

  scores.task2 = score;
  showTaskFeedback(2, score, config.points, message);
  updateTaskStatus(2, score, config.points);
  updateTotalScore();
}

// ===== TASK 3: Fix the code =====
function checkTask3() {
  const config = LESSON_CONFIG.tasks.task3;
  const textarea = document.getElementById("code3");
  const code = textarea.value;

  let score = 0;
  let message = "";
  let fixes = [];

  // Check for colon after if ball >= 90
  const hasColon =
    code.includes("if ball >= 90:") || code.includes("if ball>=90:");
  if (hasColon) {
    score += 1;
    fixes.push("Қос нүкте қосылды");
  }

  // Check for proper indentation (4 spaces or tab before print)
  const lines = code.split("\n");
  let hasIndent = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('print("4")') || lines[i].includes("print('4')")) {
      // Check if previous line is elif and this line starts with spaces/tab
      if (lines[i].startsWith("    ") || lines[i].startsWith("\t")) {
        hasIndent = true;
      }
    }
  }

  if (hasIndent) {
    score += 1;
    fixes.push("Шегініс дұрыс қойылды");
  }

  if (score === 2) {
    message = "Керемет! Барлық қателерді таптыңыз: " + fixes.join(", ");
    textarea.style.borderColor = "var(--color-success)";
  } else if (score === 1) {
    message = "Жартылай дұрыс: " + fixes.join(", ") + ". Тағы бір қате бар!";
    textarea.style.borderColor = "var(--color-warning)";
  } else {
    message =
      'Қателер: 1) if ball >= 90 соңына : қойыңыз, 2) print("4") алдында шегініс қойыңыз';
    textarea.style.borderColor = "var(--color-error)";
  }

  scores.task3 = score;
  showTaskFeedback(3, score, config.points, message);
  updateTaskStatus(3, score, config.points);
  updateTotalScore();
}

// ===== TASK 4: True/False =====
function checkTask4() {
  const config = LESSON_CONFIG.tasks.task4;
  const tfGroups = document.querySelectorAll(".tf-buttons");
  let correct = 0;

  tfGroups.forEach((group) => {
    const questionNum = group.dataset.question;
    const correctAnswer = config.answers[questionNum];
    const selectedBtn = group.querySelector(".tf-btn.selected");

    // Reset button styles
    group.querySelectorAll(".tf-btn").forEach((btn) => {
      btn.classList.remove("correct", "incorrect");
    });

    if (selectedBtn) {
      const userAnswer = selectedBtn.dataset.value;

      if (userAnswer === correctAnswer) {
        correct++;
        selectedBtn.classList.add("correct");
      } else {
        selectedBtn.classList.add("incorrect");
        // Highlight correct answer
        group
          .querySelector(`[data-value="${correctAnswer}"]`)
          .classList.add("correct");
      }
    }
  });

  // Calculate score based on descriptor
  let score = correct * 0.5;

  scores.task4 = score;
  showTaskFeedback(4, score, config.points, `${correct}/4 дұрыс жауап`);
  updateTaskStatus(4, score, config.points);
  updateTotalScore();
}

// ===== TASK 5: Write code =====
function checkTask5() {
  const config = LESSON_CONFIG.tasks.task5;
  const textarea = document.getElementById("code5");
  const code = textarea.value.toLowerCase();

  let score = 0;
  let achievements = [];

  // Check for variables (age, ball)
  const hasAge = code.includes("age") && code.includes("=");
  const hasBall = code.includes("ball") && code.includes("=");
  if (hasAge && hasBall) {
    score += 0.5;
    achievements.push("Айнымалылар құрылды");
  }

  // Check for outer if (age < 18 or age >= 18)
  const hasOuterIf =
    code.includes("if") && (code.includes("age") || code.includes("18"));
  if (hasOuterIf) {
    score += 0.5;
    achievements.push("Сыртқы if шарты бар");
  }

  // Check for nested if (checking ball inside age condition)
  const ifCount = (code.match(/\bif\b/g) || []).length;
  const hasNestedIf = ifCount >= 2 && code.includes("ball");
  if (hasNestedIf) {
    score += 0.5;
    achievements.push("Кірістірілген if қолданылды");
  }

  // Check for print statements
  const hasPrint = code.includes("print(");
  if (hasPrint) {
    score += 0.5;
    achievements.push("print() функциясы бар");
  }

  let message = "";
  if (score === 2) {
    message = "Керемет! Барлық талаптар орындалды: " + achievements.join(", ");
    textarea.style.borderColor = "var(--color-success)";
  } else if (score >= 1) {
    message =
      "Жақсы! " +
      achievements.join(", ") +
      ". Толық балл үшін барлық талаптарды орындаңыз.";
    textarea.style.borderColor = "var(--color-warning)";
  } else {
    message =
      "Кодты жазыңыз: age және ball айнымалыларын құрып, кірістірілген if операторын қолданыңыз.";
    textarea.style.borderColor = "var(--color-error)";
  }

  scores.task5 = score;
  showTaskFeedback(5, score, config.points, message);
  updateTaskStatus(5, score, config.points);
  updateTotalScore();
}

// ===== HELPER FUNCTIONS =====

function showTaskFeedback(taskNum, score, maxPoints, message) {
  const feedback = document.getElementById(`feedback${taskNum}`);
  feedback.textContent = `${message} (${score}/${maxPoints} балл)`;
  feedback.classList.remove("success", "partial", "error");
  feedback.classList.add("show");

  if (score === maxPoints) {
    feedback.classList.add("success");
  } else if (score > 0) {
    feedback.classList.add("partial");
  } else {
    feedback.classList.add("error");
  }
}

function updateTaskStatus(taskNum, score, maxPoints) {
  const status = document.getElementById(`status${taskNum}`);
  const card = document.getElementById(`task${taskNum}`);

  card.classList.remove("correct", "incorrect");

  if (score === maxPoints) {
    status.textContent = "✅";
    card.classList.add("correct");
  } else if (score > 0) {
    status.textContent = "⚠️";
  } else {
    status.textContent = "❌";
    card.classList.add("incorrect");
  }
}

function updateTotalScore() {
  let total = 0;

  for (const [taskName, score] of Object.entries(scores)) {
    if (score !== null) {
      total += score;
      const taskNum = taskName.replace("task", "");
      document.getElementById(`score${taskNum}`).textContent = `${score} балл`;
      document.getElementById(`result${taskNum}`).textContent = `${score} балл`;
    }
  }

  // Update score displays
  document.getElementById("totalScore").textContent = total;
  document.getElementById("finalScore").textContent = total;

  // Update progress circle
  updateProgressCircle(total);

  // Update result message
  updateResultMessage(total);
}

function updateProgressCircle(score) {
  const circle = document.getElementById("progressCircle");
  const maxPoints = LESSON_CONFIG.totalPoints;
  const percentage = score / maxPoints;

  // Circle circumference = 2 * PI * r (r = 85)
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - percentage * circumference;

  circle.style.strokeDashoffset = offset;

  // Change color based on score
  if (percentage >= 0.8) {
    circle.style.stroke = "var(--color-success)";
  } else if (percentage >= 0.5) {
    circle.style.stroke = "var(--color-warning)";
  } else if (percentage > 0) {
    circle.style.stroke = "var(--color-error)";
  } else {
    circle.style.stroke = "var(--color-primary)";
  }
}

function updateResultMessage(score) {
  const messageEl = document.getElementById("resultMessage");
  const messages = LESSON_CONFIG.messages;

  if (score >= 8) {
    messageEl.textContent = messages.excellent;
  } else if (score >= 6) {
    messageEl.textContent = messages.good;
  } else if (score >= 4) {
    messageEl.textContent = messages.average;
  } else if (score > 0) {
    messageEl.textContent = messages.needsWork;
  } else {
    messageEl.textContent = "Тапсырмаларды орындаңыз!";
  }
}

// ===== RESET FUNCTIONALITY =====
document.getElementById("resetBtn")?.addEventListener("click", resetAllTasks);

function resetAllTasks() {
  // Reset scores
  scores = {
    task1: null,
    task2: null,
    task3: null,
    task4: null,
    task5: null,
  };

  // Reset Task 1 - Code fill inputs
  document.querySelectorAll(".code-input").forEach((input) => {
    input.value = "";
    input.classList.remove("correct", "incorrect");
  });

  // Reset Task 2 - Input
  const input2 = document.getElementById("answer2");
  if (input2) {
    input2.value = "";
    input2.style.borderColor = "";
  }

  // Reset Task 3 - Textarea
  const textarea3 = document.getElementById("code3");
  if (textarea3) {
    textarea3.value = "";
    textarea3.style.borderColor = "";
  }

  // Reset Task 4 - True/False buttons
  document.querySelectorAll(".tf-btn").forEach((btn) => {
    btn.classList.remove("selected", "correct", "incorrect");
  });

  // Reset Task 5 - Textarea
  const textarea5 = document.getElementById("code5");
  if (textarea5) {
    textarea5.value = "";
    textarea5.style.borderColor = "";
  }

  // Reset all task cards
  document.querySelectorAll(".task-card").forEach((card) => {
    card.classList.remove("correct", "incorrect");
  });

  // Reset all status indicators and scores
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`status${i}`).textContent = "";
    document.getElementById(`score${i}`).textContent = "-";
    document.getElementById(`result${i}`).textContent = "-";
    const feedback = document.getElementById(`feedback${i}`);
    feedback.classList.remove("show", "success", "partial", "error");
  }

  // Reset total score
  updateTotalScore();

  // Scroll to top of tasks
  document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (e) => {
  // Ctrl + Enter to check current focused task
  if (e.ctrlKey && e.key === "Enter") {
    const activeElement = document.activeElement;

    if (activeElement.closest("#task1")) checkTask1();
    else if (activeElement.closest("#task2")) checkTask2();
    else if (activeElement.closest("#task3")) checkTask3();
    else if (activeElement.closest("#task4")) checkTask4();
    else if (activeElement.closest("#task5")) checkTask5();
  }
});

// ===== UTILITY: Auto-save to localStorage =====
function saveProgress() {
  const progress = {
    scores: scores,
    task1Answers: {
      blank1: document.getElementById("blank1")?.value || "",
      blank2: document.getElementById("blank2")?.value || "",
      blank3: document.getElementById("blank3")?.value || "",
    },
    task2Answer: document.getElementById("answer2")?.value || "",
    task3Code: document.getElementById("code3")?.value || "",
    task5Code: document.getElementById("code5")?.value || "",
  };
  localStorage.setItem("pythonLessonProgress_nested", JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem("pythonLessonProgress_nested");
  if (saved) {
    try {
      const progress = JSON.parse(saved);

      // Restore task 1
      if (progress.task1Answers) {
        for (const [id, value] of Object.entries(progress.task1Answers)) {
          const input = document.getElementById(id);
          if (input && value) {
            input.value = value;
          }
        }
      }

      // Restore task 2
      const input2 = document.getElementById("answer2");
      if (input2 && progress.task2Answer) {
        input2.value = progress.task2Answer;
      }

      // Restore task 3
      const textarea3 = document.getElementById("code3");
      if (textarea3 && progress.task3Code) {
        textarea3.value = progress.task3Code;
      }

      // Restore task 5
      const textarea5 = document.getElementById("code5");
      if (textarea5 && progress.task5Code) {
        textarea5.value = progress.task5Code;
      }
    } catch (e) {
      console.log("Could not load saved progress");
    }
  }
}

// Auto-save on input changes
document.querySelectorAll("input, textarea").forEach((el) => {
  el.addEventListener("change", saveProgress);
  el.addEventListener("input", saveProgress);
});

// Load progress on page load
document.addEventListener("DOMContentLoaded", loadProgress);

/* ========================================
   TEACHER INSTRUCTIONS / МҰҒАЛІМГЕ НҰСҚАУ
   ========================================
   
   Жаңа тақырып үшін тапсырмаларды өзгерту:
   
   1. LESSON_CONFIG объектісін өзгертіңіз:
      - title: Тақырып атауы
      - grade: Сынып
      - tasks: Әр тапсырманың дұрыс жауаптары
   
   2. HTML файлында:
      - Тапсырма мәтінін өзгертіңіз
      - data-correct атрибуттарын жаңартыңыз
   
   3. Жаңа тапсырма түрлері үшін:
      - checkTask[N]() функциясын жазыңыз
      - scores объектісіне қосыңыз
   
   Мысал - дұрыс жауаптарды өзгерту:
   
   LESSON_CONFIG.tasks.task2.correctAnswers = ["жаңа жауап"];
   
   ======================================== */
