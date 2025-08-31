


document.addEventListener('DOMContentLoaded', () => {

    const diaFormatado = (dateObj) => {
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const ticketDataJSON = localStorage.getItem('ticketData');
    const ticketData = ticketDataJSON ? JSON.parse(ticketDataJSON) : [];

    let fullName = ticketData.fullName;

    document.getElementById('ticketName').textContent = fullName;
    document.getElementById('ticketAvatar').src = ticketData.avatarSrc;
    document.getElementById('ticket-fullName').textContent = fullName;
    document.getElementById('ticketDetails').textContent = diaFormatado(new Date()) + " / Salvador, BA";
    const username = ticketData.githubUsername || '';
    document.getElementById('githubUsername').textContent = "@" + username;
    const ghLink = document.getElementById('githubLink');
    if (ghLink && username) {
        ghLink.href = `https://github.com/${username}`;
    }
    document.getElementById('emailName').textContent = ticketData.email;

});