const passwords = {
    card1: 'passwordbsd1',
    card2: 'passworsbsdd2',
    card3: 'apple',
    card4: 'passwordbsdb 1',
    card5: 'passworbsd2',
    card6: 'apple',
    card7: 'passwordsb1',
    card8: 'passwobsdbrd2',
    card9: 'apple',
    card10: 'password1bd',
    card11: 'passwordbsd2',
    card12: 'apple',
    card13: 'passwsdbsdbord1',
    card14: 'passsdsdbword2',
    card15: 'applsve',
    card16: 'passsvdsword1',
    card17: 'dbsbpassword2',
    card18: 'appbsdle',
    card19: 'vdvd',
    card20: 'pasvdvdsword2',
    card21: 'appbxvle'
};

function showPassword(cardId) {
    const card = document.getElementById(cardId);
    const passwordElement = card.querySelector('.password');
    passwordElement.textContent = passwords[cardId];
}
