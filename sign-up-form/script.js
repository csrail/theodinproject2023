const passwordInput = document.querySelector('#password');
const passwordConfirmInput = document.querySelector('#password-confirm');
const passwordHint = document.querySelector('.error');

function checkPasswordSame(pass1, pass2) {
    if (pass1 === pass2) return true
}

function addOrRemoveHiddenClass() {
    setTimeout(() => {
        if (checkPasswordSame(passwordInput.value, passwordConfirmInput.value)) {
            passwordHint.classList.add('hidden');
        } else {
            passwordHint.classList.remove('hidden');
        }
    }, 300);
}

passwordInput.addEventListener('input', addOrRemoveHiddenClass);

passwordConfirmInput.addEventListener('input', (addOrRemoveHiddenClass));
