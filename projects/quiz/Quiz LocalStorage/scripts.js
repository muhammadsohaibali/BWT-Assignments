const j = (i, k) => document.getElementById(i).style.display = k;
const scq = () => { j('cq', 'flex'), j('quiz-answers', 'none'), j('quiz-list', 'none'), j('quiz-result', 'none'); };
const slq = () => {
  j('cq', 'none'), j('quiz-list', 'flex'), j('quiz-answers', 'none'), j('quiz-result', 'none');
  document.getElementById('list_ref').parentElement.innerHTML = `
              <div onclick="lq()" id="list_ref" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer">
                <span style="margin: 0 auto;" class="question-span">Refresh List</span>
              </div>
              `;
  lq();
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
const cq = () => {
  const [l, quiz] = [localStorage, document.getElementById('cq')];
  let [qbg, qbx] = [quiz.children, quiz.children[2].children];
  let inp = qbg[1].children[0].children[0];
  const q = [...Array(qbx.length - 1)].map((_, i) => ({ question: qbx[i].children[0].value, answer: [...qbx[i].children].slice(2, -1).map(t => t.value), correct: ([...qbx[i].children].slice(2, -1).filter(x => x.value === qbx[i].children[1].value && (correct = x.value)), correct) }));
  !inp.value ? (Object.assign(inp, { placeholder: "Please Name The Quiz", value: "" }), inp.focus()) :
    !Object.keys(l).includes(inp.value) ? (l.setItem(inp.value, JSON.stringify(q)), inp.value = '', [...qbx].slice(0, -1).forEach((a) => [...a.children].slice(0, -1).forEach((b) => b.value = '')), slq()) :
      (Object.assign(inp, { placeholder: "Name Already Exists", value: "" }), inp.focus());
}
const lq = () => {
  let [l, n] = [localStorage, document.getElementById('quiz-list').children];
  [...n][1].innerHTML = '<div id="list_ref" onclick="lq()" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer"><span style="margin: 0 auto;" class="question-span">Click To Refresh List</span></div>';
  !(Object.keys(l).length === 0) ? (Object.keys(l).map((_, i) => {
    let p = document.createElement('div');
    p.className = 'quiz-list-box';
    p.onclick = () => loq(l.key(i));
    p.innerHTML = `
          <span style='padding-left:20px' class="question-span">${i + 1}) ${l.key(i)}</span>
          <span class="delete-btn" onclick="dlt(event, this)">Delete</span>
          `;
    [...n][1].append(p)
  })) : ([...n][1].innerHTML = '<div id="list_ref" onclick="lq()" class="quiz-list-box" style="background-color: rgb(255, 218, 218);border: 2px white solid;cursor: auto"><span style="margin: 0 auto;" class="question-span">No Quiz Saved <a style="text-decoration: underline; color: blue;cursor:pointer" onclick="scq()">Create One</a></span></div>')
}
const dlt = (e, t) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  t.parentElement.remove();
  localStorage.removeItem(t.parentElement.children[0].textContent.slice(3).trim())
}
const loq = (qu) => {
  j('cq', 'none'), j('quiz-list', 'none'), j('quiz-answers', 'flex'), j('quiz-result', 'none');
  let [qbx, cu, cl] = [document.getElementById('quiz-answers').children[1], JSON.parse(localStorage.getItem(qu)), document.createElement];
  qbx.innerHTML = '';
  cu.forEach(m => {
    let d = document.createElement('div');
    d.className = 'question-box';
    d.innerHTML = `
            <span class="question" style='font-weight:bold'>${cu.indexOf(m) + 1})  ${m.question}:</span>
            <div class="answers" style="display: flex;gap:10px; flex-direction: column"></div>
        `;
    qbx.append(d);
    m.answer.forEach(n => {
      let f = document.createElement('label');
      f.innerHTML = `<input type="radio" value="${n}" name="${m.question}"/> ${n}`;
      d.children[1].append(f);
    });
  });
  sessionStorage.setItem('cur', qu);
}
const saq = (w) => {
  const [s, l] = [sessionStorage.getItem('cur'), localStorage];
  sessionStorage.removeItem('cur');
  let [co, lo] = [0, 0];
  const cl = (v) => { ++co, lo = v }
  [...document.querySelectorAll('input[type="radio"]:checked')]
    .map(e => ({ question: e.name, answer: e.value }))
    .map((v, k) => v.answer === JSON.parse(l.getItem(s))[k].correct && cl(JSON.parse(l.getItem(s)).length));
  ru(co, lo !== 0 ? lo : JSON.parse(localStorage.getItem(s)).length, s);
}
const ru = (c, t, s) => {
  j('cq', 'none'), j('quiz-answers', 'none'), j('quiz-list', 'none'), j('quiz-result', 'flex');
  let [p, e] = [Math.round((c / t) * 100), document.getElementById('quiz-result')];
  let [r, g] = [p >= 50 ? `Passed` : `Failed`, e.style];
  [g.display, g.justifyContent, g.alignItems] = ['flex', 'center', 'center'];
  e.innerHTML = `
    <div style="text-align:center; width: 400px; height: 250px ;padding:20px; border: 2px solid #ccc; border-radius: 10px; background: rgba(255, 255, 255, 0.8);">
      <h2 style="color: #333;">Quiz Result</h2>
      <p>You have scored <strong>${c} / ${t}</strong></p>
      <p>Your Percentage: <strong>${p ? p : '0'}%</strong></p>
      <h3 style="color:${r === 'Passed' ? 'green' : 'red'}">${r === 'Passed' ? 'Passed' : 'Failed'}</h3>
      <button onclick="${r === 'Passed' ? 'slq()' : `loq('${s}')`}" style="padding: 10px 20px; border: none; background: #007BFF; color: white; border-radius: 5px; cursor: pointer;">${r === 'Passed' ? 'Quiz List' : 'Try Again'}</button>
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  ev(".answer", () => ma("cq"));
  ev(".question", () => ma("cq"));
});
