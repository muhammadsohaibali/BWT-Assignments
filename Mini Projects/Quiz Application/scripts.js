// ========================================================================================================

const j = (i, k) => document.getElementById(i).style.display = k;
const scq = () => { j('cq', 'flex'), j('quiz-list', 'none') };
const slq = () => {
  j('cq', 'none'),
    j('quiz-list', 'flex'),
  document.getElementById('list_ref').parentElement.innerHTML = `
              <div onclick="lq()" id="list_ref" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer">
                <span style="margin: 0 auto;" class="question-span">Refresh List</span>
              </div>
              `;
};

const ev = (a, b) => document.querySelectorAll(a).forEach(e => e.oninput = b);

const ma = (v) => {
  [...document.getElementById(v).children[2].children]
    .splice(0, document.getElementById(v).children[2].children.length - 1)
    .forEach(a => {
      let uj = a.children[1].value;[...a.children].slice(2, -1)
        .forEach(b => {
          b && uj && ([b.style.background, b.style.border] = b.value === uj
            ? ["rgba(255, 0, 0, 0.1)", "1px solid rgba(150, 200, 0, 0.8)"]
            : ["rgba(255, 255, 255, 0.3)", "1px solid #ccc"])
        })
    });

}

// ========================================================================================================

const aq = (e) => {
  let d = document.createElement(`div`);
  d.className = "question-box";

  d.innerHTML = `
  <input type="text" placeholder="Enter your question" class="question" />
  <input type="text" style="border: 1px solid rgb(177, 0, 0);" placeholder="Enter Correct Option Here Also" class="question"/>
  <input class="answer" type="text" placeholder="Answer 1" />
  <input class="answer" type="text" placeholder="Answer 2" />
  <span onclick="ao(this)" class="add-option">+</span>
  `;

  e.parentElement.parentElement.insertBefore(
    d,
    e.parentElement.parentElement.lastElementChild
  );

  ev(".answer", () => ma("cq"));
  ev(".question", () => ma("cq"));
};

const ao = (e) => {
  let c = document.createElement(`input`);
  c.className = "answer";
  c.type = 'text';
  c.placeholder = `Answer ${+e.parentElement.children[
    e.parentElement.children.length - 2
  ].placeholder.slice(7) + 1
    }`;
  e.parentElement.insertBefore(c, e.parentElement.lastElementChild);

  ev(".answer", () => ma("cq"));
  ev(".question", () => ma("cq"));
};

// ========================================================================================================

const cq = () => {
  const [l, quiz] = [localStorage, document.getElementById('cq')];
  let [qbg, qbx] = [quiz.children, quiz.children[2].children];
  let inp = qbg[1].children[0].children[0];

  const q = [...Array(qbx.length - 1)].map((_, i) => ({ question: qbx[i].children[0].value, answer: [...qbx[i].children].slice(2, -1).map(t => t.value), correct: ([...qbx[i].children].slice(2, -1).filter(x => x.value === qbx[i].children[1].value && (correct = x.value)), correct) }));
  !inp.value ? (Object.assign(inp, { placeholder: "Please Name The Quiz", value: "" }), inp.focus()) :
    !Object.keys(l).includes(inp.value) ? (l.setItem(inp.value, JSON.stringify(q)), inp.value = '', [...qbx].slice(0, -1).forEach((a) => [...a.children].slice(0, -1).forEach((b) => b.value = ''))) :
      (Object.assign(inp, { placeholder: "Name Already Exists", value: "" }), inp.focus());
}

const lq = () => {
  let [l, n] = [localStorage, document.getElementById('quiz-list').children];
  [...n][1].innerHTML = '<div id="list_ref" onclick="lq()" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer"><span style="margin: 0 auto;" class="question-span">Refresh List</span></div>';
  !(Object.keys(l).length === 0) ? (Object.keys(l).map((_, i) => {
    let p = document.createElement('div');
    p.className = 'quiz-list-box';
    p.innerHTML = `
          <span class="question-span">${l.key(i)}</span>
          <span onclick="{this.parentElement.remove(), localStorage.removeItem(this.parentElement.children[0].textContent)}" class="delete-btn">Delete</span>
          `;
    [...n][1].append(p)
  })) : ([...n][1].innerHTML = '<div id="list_ref" onclick="lq()" class="quiz-list-box" style="background-color: rgb(255, 218, 218);border: 2px white solid;cursor: auto"><span style="margin: 0 auto;" class="question-span">No Quiz Saved <a style="text-decoration: underline; color: blue;cursor:pointer" onclick="scq()">Create One</a></span></div>')

}



// ========================================================================================================

document.addEventListener("DOMContentLoaded", () => {
  ev(".answer", () => ma("cq"));
  ev(".question", () => ma("cq"));
});

// ========================================================================================================
