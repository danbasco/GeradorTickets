/**  Salvando os Elementos da página HTML **/

// Index.html

const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const removeAvatar = document.getElementById('removeAvatar');
const changeAvatar = document.getElementById('changeAvatar');

	// Botão
const sendButton = document.getElementById('getTicket');

	// Campos dos dados
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const githubUsername = document.getElementById('githubUsername');


// Ticket.html
const avatarTicket = document.getElementById('avatarTicket');



// Mudar Avatar
changeAvatar.addEventListener('click', () => avatarInput.click());

// Mudar Avatar
changeAvatar.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', function() {
	const file = this.files[0];
	if (file && (file.type === 'image/png' || file.type === 'image/jpeg') && file.size <= 5 * 1024 * 1024) {
		const reader = new FileReader();
		reader.onload = function(e) {
			avatarPreview.src = e.target.result;
			if (typeof avatarTicket !== 'undefined' && avatarTicket) {
				avatarTicket.src = e.target.result;
			}
		};
		reader.readAsDataURL(file);
	} else {
		alert('Please select a JPG or PNG image up to 5MB.');
	}
});

removeAvatar.addEventListener('click', function() {
	avatarPreview.src = 'assets/images/image-avatar.jpg';
	avatarInput.value = '';
});


// Enviar ticket e gerar

sendButton.addEventListener('click', function() {
	window.location.href = '../pages/ticket.html';
});

