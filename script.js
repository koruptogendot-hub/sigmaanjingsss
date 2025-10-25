const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const emailForm = document.getElementById("emailForm");
const progressBar = document.getElementById("progressBar");
const result = document.getElementById("result");
let successCount = 0, failCount = 0;

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  main.classList.remove("hidden");
});

emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const number = document.getElementById("number").value.trim();
  progressBar.style.width = "30%";
  result.textContent = "Sending...";

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number })
    });
    const data = await res.json();

    if (res.ok) {
      successCount++;
      progressBar.style.width = "100%";
      result.innerHTML = `
        <div class="success-box">
          SUCCESS SEND TO TARGET EMAIL<br>
          TIME SEND: ${new Date().toLocaleTimeString()}<br>
          MESSAGE ID: ${data.messageId || "AUTO9999"}
        </div>`;
    } else {
      failCount++;
      result.innerHTML = `<div class="fail-box">FAILED SEND (${data.error || "Unknown error"})</div>`;
    }
  } catch {
    failCount++;
    result.innerHTML = `<div class="fail-box">FAILED SEND (Connection Error)</div>`;
  }

  document.getElementById("successCount").textContent = `(${successCount})`;
  document.getElementById("failCount").textContent = `(${failCount})`;
});
