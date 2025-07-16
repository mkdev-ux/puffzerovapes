// age-check.js
document.addEventListener('DOMContentLoaded', () => {
  const alreadyVerified = localStorage.getItem('age_verified');
  if (alreadyVerified === 'true') return;

  const ageModal = document.createElement('div');
  ageModal.className = 'age-modal';
  ageModal.innerHTML = `
    <div class="age-modal-content">
      <h2>Are you 21 or older?</h2>
      <p>You must be at least 21 years old to enter this site.</p>
      <button id="age-yes">Yes, I am 21+</button>
      <button id="age-no">No, I'm under 21</button>
    </div>
  `;
  document.body.appendChild(ageModal);

  document.getElementById('age-yes').onclick = () => {
    localStorage.setItem('age_verified', 'true');
    ageModal.remove();
  };

  document.getElementById('age-no').onclick = () => {
    alert('Sorry, you must be 21 or older to access this site.');
    window.location.href = 'https://www.google.com/';
  };
});
