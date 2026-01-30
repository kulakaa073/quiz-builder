/**
 * Returns the API documentation HTML page for testing endpoints.
 */
export function getDocsHtml(): string {
  const exampleQuizBody = JSON.stringify(
    {
      title: "Example Quiz",
      questions: [
        {
          type: "BOOLEAN",
          text: "The sky is blue.",
          order: 0,
          correctBoolean: true,
        },
        {
          type: "INPUT",
          text: "Capital of France?",
          order: 1,
          correctText: "Paris",
        },
        {
          type: "CHECKBOX",
          text: "Select prime numbers.",
          order: 2,
          options: [
            { text: "2", isCorrect: true, order: 0 },
            { text: "3", isCorrect: true, order: 1 },
            { text: "4", isCorrect: false, order: 2 },
          ],
        },
      ],
    },
    null,
    2
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz API – Documentation</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 1.5rem; color: #1e293b; background: #f8fafc; }
    h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
    section { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1rem; }
    section h2 { font-size: 1rem; margin: 0 0 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
    .method { font-size: 0.7rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600; }
    .method.get { background: #dcfce7; color: #166534; }
    .method.post { background: #dbeafe; color: #1e40af; }
    .method.delete { background: #fee2e2; color: #991b1b; }
    .path { font-family: ui-monospace, monospace; color: #475569; }
    p { margin: 0 0 0.5rem; font-size: 0.875rem; color: #475569; }
    label { display: block; font-size: 0.75rem; font-weight: 500; color: #64748b; margin-bottom: 0.25rem; }
    input, textarea { width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; font-family: inherit; font-size: 0.875rem; }
    textarea { min-height: 140px; font-family: ui-monospace, monospace; }
    button { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #334155; color: #fff; border: none; border-radius: 6px; font-size: 0.875rem; cursor: pointer; }
    button:hover { background: #475569; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .response { margin-top: 0.75rem; padding: 0.75rem; background: #f1f5f9; border-radius: 6px; font-size: 0.8rem; font-family: ui-monospace, monospace; white-space: pre-wrap; word-break: break-all; max-height: 240px; overflow: auto; }
    .response.error { background: #fef2f2; color: #991b1b; }
    .response.empty { color: #94a3b8; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Quiz API</h1>
  <p class="subtitle">Base URL: <span id="baseUrl"></span> · <a href="/health">Health check</a></p>

  <section>
    <h2><span class="method post">POST</span> <span class="path">/quizzes</span></h2>
    <p>Create a new quiz. Body: JSON with <code>title</code> and <code>questions</code> array (BOOLEAN, INPUT, CHECKBOX).</p>
    <label for="postBody">Request body (JSON)</label>
    <textarea id="postBody">${exampleQuizBody}</textarea>
    <button type="button" id="postBtn">Send request</button>
    <div id="postResponse" class="response empty">Response will appear here.</div>
  </section>

  <section>
    <h2><span class="method get">GET</span> <span class="path">/quizzes</span></h2>
    <p>Return a list of all quizzes (id, title, questionCount).</p>
    <button type="button" id="getListBtn">Send request</button>
    <div id="getListResponse" class="response empty">Response will appear here.</div>
  </section>

  <section>
    <h2><span class="method get">GET</span> <span class="path">/quizzes/:id</span></h2>
    <p>Return full details of a quiz including all questions and options.</p>
    <label for="getId">Quiz ID</label>
    <input type="text" id="getId" placeholder="e.g. clxxx...">
    <button type="button" id="getOneBtn">Send request</button>
    <div id="getOneResponse" class="response empty">Response will appear here.</div>
  </section>

  <section>
    <h2><span class="method delete">DELETE</span> <span class="path">/quizzes/:id</span></h2>
    <p>Delete a quiz by ID. Returns 204 on success.</p>
    <label for="deleteId">Quiz ID</label>
    <input type="text" id="deleteId" placeholder="e.g. clxxx...">
    <button type="button" id="deleteBtn">Send request</button>
    <div id="deleteResponse" class="response empty">Response will appear here.</div>
  </section>

  <script>
    document.getElementById("baseUrl").textContent = location.origin;

    function show(el, text, isError) {
      el.textContent = text;
      el.className = "response " + (text ? (isError ? "error" : "") : "empty");
    }

    document.getElementById("postBtn").addEventListener("click", async function () {
      const btn = this;
      const resEl = document.getElementById("postResponse");
      let body;
      try {
        body = JSON.parse(document.getElementById("postBody").value);
      } catch (e) {
        show(resEl, "Invalid JSON: " + e.message, true);
        return;
      }
      btn.disabled = true;
      try {
        const r = await fetch("/quizzes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const data = await r.json().catch(() => ({}));
        const text = r.ok ? JSON.stringify(data, null, 2) : (data.error || r.status + " " + r.statusText);
        show(resEl, text, !r.ok);
      } catch (e) {
        show(resEl, "Request failed: " + e.message, true);
      }
      btn.disabled = false;
    });

    document.getElementById("getListBtn").addEventListener("click", async function () {
      const btn = this;
      const resEl = document.getElementById("getListResponse");
      btn.disabled = true;
      try {
        const r = await fetch("/quizzes");
        const data = await r.json().catch(() => ({}));
        const text = r.ok ? JSON.stringify(data, null, 2) : (data.error || r.status + " " + r.statusText);
        show(resEl, text, !r.ok);
      } catch (e) {
        show(resEl, "Request failed: " + e.message, true);
      }
      btn.disabled = false;
    });

    document.getElementById("getOneBtn").addEventListener("click", async function () {
      const id = document.getElementById("getId").value.trim();
      const btn = this;
      const resEl = document.getElementById("getOneResponse");
      if (!id) { show(resEl, "Enter a quiz ID.", true); return; }
      btn.disabled = true;
      try {
        const r = await fetch("/quizzes/" + encodeURIComponent(id));
        const data = await r.json().catch(() => ({}));
        const text = r.ok ? JSON.stringify(data, null, 2) : (data.error || r.status + " " + r.statusText);
        show(resEl, text, !r.ok);
      } catch (e) {
        show(resEl, "Request failed: " + e.message, true);
      }
      btn.disabled = false;
    });

    document.getElementById("deleteBtn").addEventListener("click", async function () {
      const id = document.getElementById("deleteId").value.trim();
      const btn = this;
      const resEl = document.getElementById("deleteResponse");
      if (!id) { show(resEl, "Enter a quiz ID.", true); return; }
      btn.disabled = true;
      try {
        const r = await fetch("/quizzes/" + encodeURIComponent(id), { method: "DELETE" });
        const text = r.status === 204 ? "204 No Content (deleted)" : (await r.json().catch(() => ({}))).error || r.status + " " + r.statusText;
        show(resEl, text, !r.ok);
      } catch (e) {
        show(resEl, "Request failed: " + e.message, true);
      }
      btn.disabled = false;
    });
  </script>
</body>
</html>`;
}
