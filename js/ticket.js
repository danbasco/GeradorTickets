


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
    document.getElementById('githubUsername').textContent = "@" + ticketData.githubUsername;

});