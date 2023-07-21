import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner();

    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });

    if (response.ok) {
      const { image } = await response.json();

      const result = document.querySelector('#result');
      result.innerHTML = `<img src="${image}" width="512" />`;
    } 
    else {
      const label = document.querySelector('#label');
      const error = (await response.text()).trim();
      if (error.includes("text that is not allowed")) {
        label.innerHTML = `<label id="label" class="error" for="prompt">⚠️ Naughty, naughty! You typed a bad word... try again.</label>`
      } 
      else {
        label.innerHTML = `<label id="label" class="error" for="prompt">⚠️ Error: ${error}</label>`
      }
      console.log(error);  
    }

    hideSpinner();
});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">⚙️</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Generate';
}