// Operating Systems / Python Intro Quiz (from your quiz questions)
// Correct answers verified against the curriculum (الدرس الأول في المقرر)

document.addEventListener("DOMContentLoaded", () => {
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("nextBtn");

  // حماية: لو عناصر الصفحة غير موجودة، لا نكمل (عشان ما ينهار السكربت)
  if (!questionEl || !answersEl || !resultEl || !nextBtn) return;

  // رمز محاولة (بدون اسم) — يساعدك تعرف المختبَر بالرمز فقط
  const attemptKey = "quiz_attempt_id_v1";
  let attemptId = localStorage.getItem(attemptKey);
  if (!attemptId) {
    attemptId = "A-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem(attemptKey, attemptId);
  }

  // أسئلة الكويز (نفس الأسئلة) + تصحيح حسب المنهج
  const questions = [
    {
      q: "س1) أي من المكونات التالية يعتبر \"قلب\" تنفيذ أوامر البرامج ويقوم بالحسابات واتخاذ القرارات؟",
      options: ["الذاكرة الرئيسية (RAM)", "وحدة المعالجة المركزية (CPU)", "الذاكرة الثانوية", "أجهزة المدخلات"],
      correct: 1,
      explain: "المعالج (CPU) هو المسؤول عن تنفيذ التعليمات والحسابات واتخاذ القرارات."
    },
    {
      q: "س2) ما هو الرمز المستخدم لكتابة تعليقات (Comments) في لغة بايثون؟",
      options: ["//", "/*", "#", "@"],
      correct: 2,
      explain: "التعليقات في بايثون تبدأ بالرمز # 2"
    },
    {
      q: "س3) ما الفرق الأساسي بين \"المفسر\" (Interpreter) و\"المترجم\" (Compiler) كما ورد في المنهج؟",
      options: [
        "المفسر يترجم البرنامج كاملاً دفعة واحدة، بينما المترجم يقرأ تعليمة واحدة فقط.",
        "المفسر يقرأ تعليمة واحدة ويترجمها وينفذها فوراً، بينما المترجم يترجم البرنامج كاملاً قبل التنفيذ.",
        "المفسر مخصص للغات منخفضة المستوى، والمترجم للغات عالية المستوى.",
        "لا يوجد فرق بينهما في لغة بايثون."
      ],
      correct: 1,
      explain: "المنهج يوضح: المفسر ينفذ سطرًا بسطر، والمترجم يترجم البرنامج كاملًا ثم يُنفّذه 3"
    },
    {
      q: "س4) إذا أردت كتابة أكثر من أمر برمجي على نفس السطر في بايثون، ما الرمز الذي يجب وضعه بين الأمرين؟",
      options: [":", ";", ",", "!"],
      correct: 1,
      explain: "لفصل أكثر من أمر في نفس السطر نستخدم الفاصلة المنقوطة ; 4"
    },
    {
      q: "س5) أي من التالي يعتبر مثالاً على \"خطأ داللي\" (Semantic Error)؟",
      options: [
        "كتابة primt بدلاً من print.",
        "استخدام متغير لم يتم تعريفه من قبل.",
        "البرنامج يعمل بشكل صحيح ولكن النتيجة المستخرجة ليست هي المقصودة.",
        "نسيان إغلاق القوس في دالة الطباعة."
      ],
      correct: 2,
      explain: "الخطأ الدلالي: الكود يعمل لكن النتيجة ليست المقصودة 5"
    },
    {
      q: "س6) بالنظر إلى حساسية بايثون لحالة الأحرف، أي الجمل التالية صحيحة؟",
      options: [
        "المتغير Note هو نفسه المتغير note في بايثون.",
        "بايثون لا تميز بين الأحرف الكبيرة والصغيرة في أسماء الدوال.",
        "المتغيرات Note و note تعتبر أسماء مختلفة تماماً في بايثون.",
        "بايثون تشبه لغة HTML في عدم اهتمامها بحالة الأحرف."
      ],
      correct: 2,
      explain: "بايثون تميز بين الأحرف الكبيرة والصغيرة 6"
    },
    {
      q: "س7) ما هي وظيفة الدالة input() في بايثون وما هو نوع البيانات الذي تعيده افتراضياً؟",
      options: [
        "طباعة نص على الشاشة وتعيد رقم صحيح (Integer).",
        "قراءة إدخال المستخدم من لوحة المفاتيح وتعيده كسلسلة نصية (String).",
        "تخزين البيانات في الذاكرة الثانوية وتعيد قيمة منطقية (Boolean).",
        "مسح الشاشة ولا تعيد أي قيمة."
      ],
      correct: 1,
      explain: "input() تقرأ من المستخدم وتُعيد نصًا (String) 7"
    },
    {
      q: "س8) ما الوحدة المسؤولة عن تنفيذ التعليمات في الحاسب؟",
      options: ["الذاكرة الرئيسية", "وحدة المعالجة المركزية CPU", "الشاشة", "لوحة المفاتيح"],
      correct: 1,
      explain: "تنفيذ التعليمات يتم بواسطة CPU."
    },
    {
      q: "س9) أي مما يلي يعد من أجهزة الإدخال؟",
      options: ["الطابعة", "الشاشة", "لوحة المفاتيح", "السماعات"],
      correct: 2,
      explain: "لوحة المفاتيح من أجهزة الإدخال."
    },
    {
      q: "س10) ما وظيفة الدالة print() في بايثون؟",
      options: ["قراءة إدخال مستخدم", "تنفيذ عمليات حسابية", "طباعة المخرجات على الشاشة", "تخزين البيانات"],
      correct: 2,
      explain: "print() تُظهر المخرجات على الشاشة."
    },
    {
      q: "س11) ما الدالة المستخدمة لقراءة إدخال المستخدم في بايثون؟",
      options: ["print()", "read()", "input()", "write()"],
      correct: 2,
      explain: "الدالة الصحيحة هي input() 8"
    },
    {
      q: "س12) لغة الآلة تتكون من؟",
      options: ["حروف انجليزية", "رموز رياضية", "0 و 1", "كلمات عربية"],
      correct: 2,
      explain: "لغة الآلة تتألف من 0 و1 9"
    },
    {
      q: "س13) ما الفرق بين الذاكرة الرئيسية والثانوية؟",
      options: ["الرئيسية دائمة والثانوية مؤقتة.", "الرئيسية مؤقتة والثانوية دائمة", "كلتاهما دائمة", "كلتاهما مؤقتة"],
      correct: 1,
      explain: "RAM مؤقتة، والتخزين الثانوي دائم."
    },
    {
      q: "س14) ما المقصود بالخوارزمية؟",
      options: ["جهاز إدخال", "لغة برمجة", "سلسلة خطوات لحل مشكلة", "نوع من الذاكرة"],
      correct: 2,
      explain: "الخوارزميات: سلسلة خطوات لإيجاد الحل 10"
    },
    {
      q: "س15) أي مما يلي يعد من لغات البرمجة عالية المستوى؟",
      options: ["لغة الآلة", "لغة التجميع", "بايثون", "الرمز الثنائي"],
      correct: 2,
      explain: "بايثون من اللغات عالية المستوى."
    },
    {
      q: "س16) المفسر (Interpreter) يقوم بـ:",
      options: ["ترجمة البرنامج كاملاً ثم تنفيذه", "تنفيذ التعليمات مباشرة سطراً بسطر", "تخزين البرنامج في الذاكرة", "حذف الأخطاء تلقائياً"],
      correct: 1,
      explain: "المفسر يقرأ وينفذ تعليمة/سطرًا مباشرة 11"
    },
    {
      q: "س17) أي من التالي يعد من أنماط بناء البرامج الأساسية؟",
      options: ["التسلسل", "الشرط", "التكرار", "جميع ما سبق"],
      correct: 3,
      explain: "الأنماط الأساسية: تسلسل + شرط + تكرار."
    },
    {
      q: "س18) أي من الأخطاء التالية يحدث عند كتابة كلمة print بهذه الطريقة: Print",
      options: ["NameError", "SyntaxError", "Logical Error", "TypeError"],
      correct: 0,
      explain: "بايثون تميز بين الأحرف؛ Print ليست print، فيُعاملها كاسم غير معرّف (NameError) 12"
    },
    {
      q: "س19) ماذا يحدث عند كتابة Primt بدلاً من Print؟",
      options: ["يعمل البرنامج بشكل طبيعي", "يظهر SyntaxError", "يظهر NameError", "لا يحدث شيء"],
      correct: 1,
      explain: "المنهج أعطى مثالًا صريحًا: primt بدل print = SyntaxError 13"
    },
    {
      q: "س20) لغة بايثون:",
      options: ["لا تفرق بين الأحرف الكبيرة والصغيرة", "تفرق بين الأحرف الكبيرة والصغيرة", "تعمل فقط على ويندوز", "لغة منخفضة المستوى"],
      correct: 1,
      explain: "بايثون تميز بين الأحرف الكبيرة والصغيرة 14"
    },
    {
      q: "س21) أي من التالي مثال على البرمجة الإجرائية؟",
      options: ["تنظيم الشفرة حول الكائنات", "استخدام الورثة", "تنفيذ خطوات متسلسلة لحل المشكلات", "استخدام التغليف"],
      correct: 2,
      explain: "الإجرائية: حل المشكلة بخطوات متسلسلة."
    },
    {
      q: "س22) عند استخدام متغير قبل تعريفه في بايثون يظهر:",
      options: ["NameError", "SyntaxError", "Logical Error", "TypeError"],
      correct: 0,
      explain: "NameError: استخدام اسم/متغير غير معرّف 15"
    },
    {
      q: "س23) أي العبارات التالية صحيحة بخصوص المترجم (Compiler)؟",
      options: ["يترجم سطر وينفذه فوراً", "لا يحول البرنامج إلى لغة الآلة", "يترجم البرنامج كاملاً ثم يتم تنفيذه", "يعمل فقط مع بايثون"],
      correct: 2,
      explain: "المترجم يترجم البرنامج كاملاً ثم يُنفّذه 16"
    },
    {
      q: "س24) في الكود التالي: x=1 ; y=2 ; z=3 ما السبب في استخدام الفاصلة المنقوطة؟",
      options: ["لتعريف متغير", "للفصل بين عدة أوامر في نفس السطر", "لإنهاء البرنامج", "لطباعة القيم"],
      correct: 1,
      explain: "للفصل بين أوامر متعددة بنفس السطر 17"
    },
    {
      q: "س25) أي مما يلي يعد من أنماط بناء البرنامج الأساسية:",
      options: ["التكرار", "الطباعة فقط", "التخزين فقط", "الشبكات فقط"],
      correct: 0,
      explain: "من الأنماط الأساسية: التكرار."
    },
    {
      q: "س26) أي مما يلي يعد من المخرجات (Output):",
      options: ["الميكروفون", "الفأرة", "الشاشة", "لوحة المفاتيح"],
      correct: 2,
      explain: "الشاشة من أجهزة الإخراج."
    },
    {
      q: "س27) ما الهدف من استخدام التعليقات في بايثون؟",
      options: ["تنفيذ الكود بسرعة أكبر", "شرح الكود للمبرمج", "إصلاح الأخطاء تلقائياً", "تخزين البيانات"],
      correct: 1,
      explain: "التعليقات لشرح الكود ولن تُنفّذ 18"
    },
    {
      q: "س28) أي رمز يستخدم لكتابة تعليق في بايثون؟",
      options: ["//", "/**/", "#", "--"],
      correct: 2,
      explain: "رمز التعليق هو # 19"
    },
    {
      q: "س29) أي مما يلي يعد من لغات البرمجة منخفضة المستوى؟",
      options: ["Python", "Java", "لغة التجميع", "JavaScript"],
      correct: 2,
      explain: "لغة التجميع قريبة من لغة الآلة (منخفضة المستوى)."
    },
    {
      q: "س30) ماذا يقصد بأن بايثون لغة عالية المستوى؟",
      options: ["قريبة من لغة الآلة", "صعبة التعلم", "قريبة من لغة الإنسان وسهلة القراءة", "تعمل فقط على الحواسيب الكبيرة"],
      correct: 2,
      explain: "عالية المستوى: قريبة من لغة الإنسان وسهلة القراءة."
    },
    {
      q: "س31) في المثال input = name(\"ما اسمك\") ما نوع القيمة المخزنة في المتغير name؟",
      options: ["عدد صحيح", "عدد عشري", "نص (String)", "قيمة منطقية"],
      correct: 2,
      explain: "القيمة من input تكون نصًا (String) 20"
    },
    {
      q: "س32) أي مما يلي مثال على الذاكرة الثانوية؟",
      options: ["RAM", "القرص الصلب", "المسجلات", "المعالج"],
      correct: 1,
      explain: "القرص الصلب من التخزين الثانوي."
    },
    {
      q: "س33) أي مما يلي يمثل مثالاً على التكرار؟",
      options: ["تنفيذ أمر واحد", "تنفيذ أوامر عند تحقق شرط", "إعادة تنفيذ أوامر عدة مرات", "تعريف متغير"],
      correct: 2,
      explain: "التكرار: إعادة تنفيذ الأوامر عدة مرات."
    },
    {
      q: "س34) عند قراءة رسالة خطأ في بايثون، السهم ^ يشير غالباً إلى:",
      options: ["بداية البرنامج", "نهاية الملف", "موقع الخطأ في السطر", "اسم المتغير"],
      correct: 2,
      explain: "السهم غالبًا يشير لموضع المشكلة 21"
    },
    {
      q: "س35) الشبكة تعتبر؟",
      options: ["نوع من أنواع الذاكرة الرئيسية", "امتداد للتخزين وتبادل المعلومات", "جزء من المعالج", "جهاز إدخال"],
      correct: 1,
      explain: "الشبكات تُستخدم لتبادل المعلومات والموارد."
    },
    {
      q: "س36) عند تشغيل برنامج بايثون في ملف (script)، يجب حفظه بامتداد:",
      options: ["txt", "doc", "py", "exe"],
      correct: 2,
      explain: "امتداد ملفات بايثون هو .py"
    },
    {
      q: "س40) ما الهدف من الخوارزميات في البرمجة؟",
      options: ["تخزين البيانات", "كتابة التعليمات بلغة الآلة", "تنظيم خطوات حل المشكلة", "تسريع المعالج"],
      correct: 2,
      explain: "الخوارزمية تنظم خطوات حل المشكلة 22"
    },
    {
      q: "س41) عند انقطاع الكهرباء ماذا يحدث لمحتوى الذاكرة الرئيسية RAM؟",
      options: ["يبقى محفوظاً", "يحذف", "ينتقل إلى القرص الصلب", "يتحول إلى لغة الآلة"],
      correct: 1,
      explain: "RAM ذاكرة متطايرة؛ تفقد محتواها عند انقطاع الكهرباء."
    },
    {
      q: "س42) أي من التالي ليس من أنماط بناء البرامج الأساسية؟",
      options: ["التسلسل", "الشرط", "التكرار", "التجميع"],
      correct: 3,
      explain: "الأنماط الأساسية: تسلسل/شرط/تكرار. \"التجميع\" ليس نمط بناء أساسي."
    }
  ];

  // حالة الاختبار
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  // زر التالي
  nextBtn.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showFinal();
    }
  });

  function renderQuestion() {
    answered = false;
    nextBtn.disabled = true;
    answersEl.innerHTML = "";
    resultEl.innerHTML = "";

    // شريط علوي: رقم السؤال + رمز المحاولة + الدرجة الحالية
    const header = `
      <div style="margin-bottom:10px; font-size:14px; opacity:.9;">
        <div>رمز المحاولة: <b>${attemptId}</b></div>
        <div>السؤال ${currentIndex + 1} من ${questions.length} — الدرجة الحالية: <b>${score}</b></div>
      </div>
    `;

    questionEl.innerHTML = header + `<div style="font-size:18px; line-height:1.7;">${questions[currentIndex].q}</div>`;

    questions[currentIndex].options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;

      // ستايل بسيط (بدون اعتماد قوي على CSS)
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.padding = "12px";
      btn.style.margin = "10px 0";
      btn.style.borderRadius = "10px";
      btn.style.border = "1px solid rgba(255,255,255,.15)";
      btn.style.background = "rgba(255,255,255,.06)";
      btn.style.color = "#fff";
      btn.style.cursor = "pointer";
      btn.style.textAlign = "right";

      btn.addEventListener("click", () => handleAnswer(idx, btn));
      answersEl.appendChild(btn);
    });

    nextBtn.textContent = (currentIndex === questions.length - 1) ? "إنهاء وإظهار الدرجة" : "السؤال التالي";
  }

  function handleAnswer(selectedIndex, selectedBtn) {
    if (answered) return;
    answered = true;

    const qObj = questions[currentIndex];
    const correctIndex = qObj.correct;

    // تلوين كل الخيارات: الصحيح أخضر + الخطأ أحمر عند اختيار المستخدم
    const buttons = answersEl.querySelectorAll("button");
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctIndex) {
        b.style.background = "rgba(0, 200, 83, .25)";
        b.style.borderColor = "rgba(0, 200, 83, .6)";
      }
    });

    if (selectedIndex === correctIndex) {
      score++;
      selectedBtn.style.background = "rgba(0, 200, 83, .35)";
      selectedBtn.style.borderColor = "rgba(0, 200, 83, .8)";
      resultEl.innerHTML = `
        <div style="padding:12px; border-radius:10px; background: rgba(0,200,83,.18); border:1px solid rgba(0,200,83,.45);">
          <b>صحيح ✅</b><br>
          <div style="margin-top:8px;">${qObj.explain || ""}</div>
        </div>
      `;
    } else {
      selectedBtn.style.background = "rgba(255, 82, 82, .25)";
      selectedBtn.style.borderColor = "rgba(255, 82, 82, .7)";
      resultEl.innerHTML = `
        <div style="padding:12px; border-radius:10px; background: rgba(255,82,82,.15); border:1px solid rgba(255,82,82,.45);">
          <b>خطأ ❌</b><br>
          <div style="margin-top:8px;"><b>الشرح:</b> ${qObj.explain || ""}</div>
        </div>
      `;
    }

    nextBtn.disabled = false;
  }

  function showFinal() {
    // إظهار الدرجة النهائية أولاً كما طلبت
    questionEl.innerHTML = `
      <div style="font-size:20px; line-height:1.8;">
        <b>النتيجة النهائية:</b> ${score} / ${questions.length}<br>
        <b>رمز المحاولة:</b> ${attemptId}
      </div>
    `;
    answersEl.innerHTML = "";
    resultEl.innerHTML = `
      <div style="margin-top:12px; padding:12px; border-radius:10px; background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);">
        إذا أردت معرفة المختبَر بدون اسم: اطلب منه إرسال <b>رمز المحاولة</b> أو لقطة شاشة للنتيجة.
      </div>
      <button id="restartBtn" style="margin-top:12px; width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.08); color:#fff; cursor:pointer;">
        إعادة المحاولة (بنفس الرمز)
      </button>
      <button id="newAttemptBtn" style="margin-top:10px; width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.08); color:#fff; cursor:pointer;">
        بدء محاولة جديدة (رمز جديد)
      </button>
    `;

    nextBtn.disabled = true;

    // أزرار النهاية
    const restartBtn = document.getElementById("restartBtn");
    const newAttemptBtn = document.getElementById("newAttemptBtn");

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        nextBtn.disabled = false;
        renderQuestion();
      });
    }

    if (newAttemptBtn) {
      newAttemptBtn.addEventListener("click", () => {
        localStorage.removeItem(attemptKey);
        location.reload();
      });
    }
  }

  // ابدأ
  renderQuestion();
});
