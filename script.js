// --- MENU TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');
menuToggle.addEventListener('click',()=>menuDropdown.classList.toggle('show'));

// --- SHOW SECTIONS ---
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>{s.classList.add('hidden'); s.classList.remove('active');});
  const active = document.getElementById(id);
  active.classList.remove('hidden');
  active.classList.add('active');
  menuDropdown.classList.remove('show');
}

// --- RELOAD BUTTON ---
const reloadBtn = document.getElementById('reloadBtn');
reloadBtn.addEventListener('click',()=>location.reload());

// --- PILIH GMAIL ---
const gmailButtons = document.querySelectorAll('.gmail-choice');
let selectedGmail = null;
gmailButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    gmailButtons.forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedGmail = btn.dataset.gmail;
  });
});

// --- SEND FORM SIMULASI ---
const form = document.getElementById('sendForm');
const statusDiv = document.getElementById('status');
let successCount = 0, failCount = 0;

form.addEventListener('submit', e=>{
  e.preventDefault();
  const number = document.getElementById('number').value.trim();
  if(!number){ alert("Enter number/email"); return; }
  if(!selectedGmail){ alert("Select Gmail target!"); return; }

  statusDiv.textContent = `Sending via ${selectedGmail}...`;
  statusDiv.className='status';

  // Simulasi delay
  setTimeout(()=>{
    const success = Math.random() > 0.2;
    if(success){
      successCount++;
      statusDiv.textContent = `SUCCESS SEND TO EMAIL TARGET`;
      statusDiv.className='status success';
      // TTS success
      speakText("SUCCESS SEND TO EMAIL TARGET");
    }else{
      failCount++;
      statusDiv.textContent = `FAILED SEND`;
      statusDiv.className='status failed';
      speakText("FAILED SEND");
    }
    document.getElementById('successCount').textContent = successCount;
    document.getElementById('failCount').textContent = failCount;
  },1000);
});

// --- HOME PROGRESS BAR & SUARA LOADING ---
window.addEventListener('load',()=>{
  const progress = document.getElementById('homeProgress');
  progress.style.width='100%';
  speakText("Wait Loading To Website");
});

// --- TEXT TO SPEECH FUNCTION ---
function speakText(text){
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}
