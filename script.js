const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section")];
const backTop = document.getElementById("backTop");

const savedTheme = localStorage.getItem("arbab-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("arbab-theme", dark ? "dark" : "light");
});

menuToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

/* ---------- Interactive skills ---------- */
const skillData = {
  manual: {
    title: "Manual Testing",
    description: "Systematically validate web application behavior against requirements, including positive, negative, functional and regression scenarios.",
    tags: ["Manual Testing", "Functional Testing", "Regression Testing", "Test Case Design", "Positive Testing", "Negative Testing", "Defect Reporting", "Defect Lifecycle", "SDLC", "STLC"],
    use: ["Analyze requirements and user flows", "Design and execute test cases", "Validate UI behavior and input rules", "Retest fixes and run regression scenarios"]
  },
  api: {
    title: "API Testing",
    description: "Validate services independently from the UI by checking requests, responses, status codes, data and basic request/response behavior in Postman.",
    tags: ["Postman", "API Testing", "Request/Response Validation", "JSON", "CSV"],
    use: ["Send and inspect API requests", "Validate response data and behavior", "Check request/response structure", "Use test data for repeatable validation"]
  },
  database: {
    title: "Database Testing",
    description: "Verify that application actions produce the expected database results and that stored data remains consistent and accurate.",
    tags: ["SQL", "MySQL", "SQLite", "Excel", "Database Validation", "Data Validation"],
    use: ["Write SQL queries for validation", "Verify database records", "Check data consistency", "Filter and sort data to inspect results"]
  },
  automation: {
    title: "Automation Testing",
    description: "Building a foundation for automation with basic Selenium WebDriver knowledge and Python, while keeping manual testing fundamentals at the center.",
    tags: ["Selenium WebDriver — Basic", "Automation Testing", "Python — Basic"],
    use: ["Understand WebDriver concepts", "Identify repeatable automation candidates", "Build Python fundamentals for automation", "Move gradually from manual checks to automation"]
  },
  tools: {
    title: "Testing Tools",
    description: "Use practical tools to organize test work, validate APIs, manage defects and maintain code or project assets.",
    tags: ["Jira", "Postman", "Git", "GitHub", "Excel"],
    use: ["Track defects and status in JIRA", "Validate APIs in Postman", "Maintain work with Git/GitHub", "Document test cases and results in Excel"]
  }
};

const skillTitle = document.getElementById("skillTitle");
const skillDescription = document.getElementById("skillDescription");
const skillTags = document.getElementById("skillTags");
const skillUse = document.getElementById("skillUse");

function renderSkill(key) {
  const data = skillData[key];
  if (!data || !skillTitle || !skillDescription || !skillTags || !skillUse) return;

  skillTitle.textContent = data.title;
  skillDescription.textContent = data.description;
  skillTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
  skillUse.innerHTML = data.use.map(item => `<div>${item}</div>`).join("");

  document.querySelectorAll(".skill-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.skill === key);
    tab.setAttribute("aria-selected", String(tab.dataset.skill === key));
  });
}

document.querySelectorAll(".skill-tab").forEach(tab => {
  tab.addEventListener("click", () => renderSkill(tab.dataset.skill));
});
renderSkill("manual");

/* ---------- Blog knowledge base ---------- */
const blogData = {
  "manual-testing": {
    category: "MANUAL QA",
    title: "Manual Testing: A Beginner's Guide",
    answer: `<p><strong>Manual testing</strong> is the process of checking software manually to find defects and verify that the application behaves as expected.</p>
      <h4>What does a QA tester do?</h4>
      <ul><li>Understand requirements and user workflows.</li><li>Design test scenarios and test cases.</li><li>Execute positive and negative tests.</li><li>Report defects with clear evidence.</li><li>Retest fixes and perform regression testing.</li></ul>
      <h4>Simple example</h4><p>For a login page, test valid credentials, invalid credentials, empty fields, password masking and error messages.</p>`,
    tags: ["Manual Testing", "STLC", "Test Cases"]
  },
  "functional-regression": {
    category: "TESTING",
    title: "Functional Testing vs Regression Testing",
    answer: `<p><strong>Functional testing</strong> checks whether a feature works according to its requirement. <strong>Regression testing</strong> checks whether existing functionality still works after a change or fix.</p>
      <h4>Example</h4><p>If a developer changes the checkout calculation, functional testing validates the new calculation. Regression testing then checks related login, cart, product and checkout flows to make sure the change did not break existing behavior.</p>
      <h4>Key difference</h4><p>Functional testing focuses on the feature being validated; regression testing focuses on protecting previously working functionality.</p>`,
    tags: ["Functional", "Regression", "Retesting"]
  },
  "api-postman": {
    category: "API",
    title: "API Testing with Postman",
    answer: `<p>API testing validates application services directly instead of relying only on the user interface. Postman can be used to send requests and inspect responses.</p>
      <h4>What should a tester check?</h4><ul><li>HTTP method and endpoint.</li><li>Status code such as 200, 201, 400 or 404.</li><li>Response body and expected JSON fields.</li><li>Headers and request data.</li><li>Behavior for valid and invalid inputs.</li></ul>
      <h4>Why it matters</h4><p>An API can be tested earlier and independently, helping identify service-level issues even when the UI is not ready.</p>`,
    tags: ["Postman", "JSON", "Request/Response"]
  },
  "sql-qa": {
    category: "SQL",
    title: "SQL Queries Every QA Tester Should Know",
    answer: `<p>SQL helps a QA tester verify whether the data stored in a database matches the expected application result.</p>
      <h4>Useful query concepts</h4><ul><li><strong>SELECT</strong> — retrieve records.</li><li><strong>WHERE</strong> — filter records.</li><li><strong>ORDER BY</strong> — sort results.</li><li><strong>GROUP BY</strong> — group records for analysis.</li><li><strong>JOIN</strong> — combine related tables.</li><li><strong>COUNT / AVG / SUM</strong> — validate aggregate results.</li></ul>
      <h4>QA example</h4><p>After creating a customer through the application, query the database to verify that the expected customer record exists with the correct values.</p>`,
    tags: ["SQL", "MySQL", "Database Testing"]
  },
  "bug-life-cycle": {
    category: "DEFECTS",
    title: "Understanding Bug Life Cycle",
    answer: `<p>The bug life cycle describes how a defect moves from discovery to final resolution.</p>
      <h4>Typical flow</h4><p>New → Assigned → In Progress → Fixed → Retest → Closed. If the issue still exists after the fix, it can be <strong>reopened</strong>.</p>
      <h4>Good defect reporting</h4><ul><li>Clear title and description.</li><li>Steps to reproduce.</li><li>Expected vs actual result.</li><li>Relevant test data and evidence.</li><li>Severity/priority when applicable.</li></ul>`,
    tags: ["JIRA", "Defect Lifecycle", "Retesting"]
  },
  "positive-negative": {
    category: "TEST DESIGN",
    title: "Positive vs Negative Testing",
    answer: `<p><strong>Positive testing</strong> verifies expected behavior using valid inputs. <strong>Negative testing</strong> checks how the application handles invalid, unexpected or missing inputs.</p>
      <h4>Login example</h4><ul><li>Positive: valid email + valid password.</li><li>Negative: wrong password.</li><li>Negative: empty email.</li><li>Negative: empty password.</li><li>Negative: invalid email format.</li></ul>
      <p>Using both approaches gives broader confidence in validation and error handling.</p>`,
    tags: ["Positive", "Negative", "Validation"]
  },
  "test-cases": {
    category: "TEST DESIGN",
    title: "How to Write Effective Test Cases",
    answer: `<p>An effective test case should be clear enough that another tester can execute it without guessing.</p>
      <h4>Useful fields</h4><ul><li>Test Case ID</li><li>Scenario / title</li><li>Preconditions</li><li>Test steps</li><li>Test data</li><li>Expected result</li><li>Actual result</li><li>Status</li></ul>
      <h4>Good practice</h4><p>Keep one clear objective per test case, use meaningful test data, and write expected results that can be verified objectively.</p>`,
    tags: ["Test Case Design", "Excel", "Execution"]
  },
  "selenium": {
    category: "AUTOMATION",
    title: "Introduction to Selenium Automation Testing",
    answer: `<p><strong>Selenium WebDriver</strong> is used to automate browser interactions. It can help automate repeatable web UI checks.</p>
      <h4>Basic flow</h4><p>Start a browser → open a page → locate an element → perform an action → validate the result → close the browser.</p>
      <h4>Why learn automation?</h4><p>Automation can reduce repetitive manual effort and support regression checks. Manual testing remains important for exploratory thinking, usability checks and scenarios that are difficult to automate.</p>
      <p>Arbab's current focus is building basic Selenium WebDriver and Python knowledge as the next step toward automation testing.</p>`,
    tags: ["Selenium", "Python", "Automation"]
  }
};

const modal = document.getElementById("blogModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalAnswer = document.getElementById("modalAnswer");
const modalTags = document.getElementById("modalTags");

function openBlog(key) {
  const data = blogData[key];
  if (!data || !modal) return;
  modalCategory.textContent = data.category;
  modalTitle.textContent = data.title;
  modalAnswer.innerHTML = data.answer;
  modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeBlog() {
  modal?.classList.remove("open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", () => openBlog(button.dataset.blog));
});

document.getElementById("modalClose")?.addEventListener("click", closeBlog);
modal?.addEventListener("click", event => {
  if (event.target === modal) closeBlog();
});

/* Blog category filter */
document.querySelectorAll(".blog-filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".blog-filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });
    document.querySelectorAll(".blog-card").forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBlog();
});

/* Contact form — opens a prepared email and gives feedback without pretending to send from the site. */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please complete all fields before sending.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  formNote.textContent = "Opening your email client…";
  window.location.href = `mailto:arbabali361@gmail.com?subject=${subject}&body=${bodyText}`;
});
