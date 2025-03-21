const slq = () => {
  document.getElementById('list_ref').parentElement.innerHTML = `
              <div onclick="lq()" id="list_ref" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer">
                <span style="margin: 0 auto;" class="question-span">Refresh List</span>
              </div>
              `;
  lq();
}

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

const lq = async () => {
  let [l, n] = [localStorage, document.getElementById('quiz-list').children];
  [...n][1].innerHTML = '<div id="list_ref" onclick="lq()" class="quiz-list-box" style="background-color: rgb(250, 250, 250);border: 2px white solid;cursor: pointer"><span style="margin: 0 auto;" class="question-span">Click To Refresh List</span></div>';

  (await (await fetch("http://localhost:3000/quiz")).json()).forEach((x, i) => {
    if (x) {
      let p = document.createElement('div');
      p.className = 'quiz-list-box';
      p.onclick = () => loq(x.title);
      p.innerHTML = `
          <span style='padding-left:20px' class="question-span">${i + 1}) ${x.title}</span>
          <span class="delete-btn" onclick="dlt(event, this)">Delete</span>
          `;
      [...n][1].append(p)
    }
  })
}

const dlt = (e, t) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  t.parentElement.remove();
  fetch("http://localhost:3000/quiz")
    .then(res => res.json())
    .then(data =>
      fetch(`http://localhost:3000/quiz/${data.find(x => x.title === t.parentElement.children[0].textContent.slice(3).trim()).id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
    )
}

const loq = async (qu) => {
  localStorage.setItem('quiz', qu);
  let [qbx, cl] = [document.getElementById('quiz-answers').children[1], document.createElement];
  qbx.innerHTML = '';

  (await (await fetch("http://localhost:3000/quiz")).json()).forEach((x, i) => {
    if (x.title === qu) {
      x.data.forEach(m => {
        let d = document.createElement('div');
        d.className = 'question-box';
        d.innerHTML = `<span class="question" style='font-weight:bold'>${x.data.indexOf(m) + 1})  ${m.question}:</span>
                      <div class="answers" style="display: flex;gap:10px; flex-direction: column"></div>`;
        qbx.append(d);
        m.answer.forEach(n => {
          let f = document.createElement('label');
          f.innerHTML = `<input type="radio" value="${n}" name="${m.question}"/> ${n}`;
          d.children[1].append(f);
        });
      });
      sessionStorage.setItem('cur', x.title);
    }
  })
}

async function redirRes (user_email, obj) {
  if (!user_email || !obj) return;
  console.log(user_email)
  console.log(JSON.stringify(obj))

  // fetch(`http://localhost:3000/users/${user_email}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/text"
  //   },
  //   body: JSON.stringify(obj)
  // })

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: (await (await fetch("http://localhost:3000/users")).json()).length + 1,
      user: user_email,
      solved: obj
    })
  });

  // window.location.href = '../result';
}

const saq = async (w) => {
  let s = sessionStorage.getItem('cur');
  let [co, len, dat] = [0, (await (await fetch("http://localhost:3000/quiz")).json())
    .find(x => x.title === s) ? (await (await fetch("http://localhost:3000/quiz")).json()).find(x => x.title === s).data : '[]'
      .map(x => ({ question: x.question, answer: x.correct })), [...document.querySelectorAll('input[type="radio"]:checked')]
        .map(e => ({ question: e.name, answer: e.value }))];
  if (dat.length !== len.length) return;
  sessionStorage.removeItem('cur');
  const cm = (d, u) => {
    d.forEach((obj, index) => {
      if (u[index] && obj.question === u[index].question && obj.answer === u[index].correct)
        co++;
    });
    ru(co, d.length, s);
  };
  cm(dat, len);
}

const ru = (c, t, s) => {
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

const a = async (t, q) => {
  await fetch("http://localhost:3000/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: (await (await fetch("http://localhost:3000/quiz")).json()).length + 1,
      title: t,
      data: q
    })
  });
};