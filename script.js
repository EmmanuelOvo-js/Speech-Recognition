const btn = document.getElementById('btn');

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const record = new SpeechRecognition();

record.lang = 'en-US';
continuous = true;
function Start(e) {
	btn.style.background = 'Green';
	btn.style.innerText = 'Say a Color';
	btn.style.color = 'white';
	record.start();

	setTimeout(() => {
		abort();
	}, 1000);
}

function abort() {
	const abortBtn = document.createElement('button');
	abortBtn.value = 'submit';
	abortBtn.innerText = 'Stop Record';
	abortBtn.classList.add('abortBtn');
	document.querySelector('#divBody').appendChild(abortBtn);
	document.addEventListener('click', () => {
		record.abort();
		abortBtn.remove();
		location.reload();
	});
}

record.onResult = function (e) {
	const loadedColors = [
		'red',
		'blue',
		'green',
		'yellow',
		'pink',
		'brown',
		'purple',
		'orange',
		'black',
		'white',
	];

	for (let i = e.resultIndex; i < e.results.lenght; i++) {
		const script = e.results[i][0].transcript.toLowerCase().trim();

		if (loadedColors.includes(script)) {
			document.body.style.background = script;
		} else {
			alert('Please say a color');
		}
	}
};
btn.addEventListener('click', Start);
