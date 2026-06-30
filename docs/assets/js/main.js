/**
 * Password Generator Logic
 * Using Crypto API for secure randomness
 * DOM Manipulation via createElement/appendChild or textContent
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const lengthSlider = document.getElementById('length-slider');
    const lengthVal = document.getElementById('length-val');
    const includeUpper = document.getElementById('include-uppercase');
    const includeLower = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-password');
    const toggleBtn = document.getElementById('toggle-visibility');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('strength-text');
    const toast = document.getElementById('toast');

    // Popup Elements
    const popupOverlay = document.getElementById('password-popup');
    const popupPasswordDisplay = document.getElementById('popup-password-display');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const popupCopyBtn = document.getElementById('popup-copy-btn');
    const popupAcceptBtn = document.getElementById('popup-accept-btn');

    // Character Sets
    const CHAR_SETS = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    // --- Core Functions ---

    /**
     * Generates a random secure integer in range [0, max)
     */
    const getSecureRandomInt = (max) => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    };

    /**
     * Generates password based on criteria
     */
    const generatePassword = () => {
        let charset = '';
        const requiredChars = [];

        if (includeUpper.checked) {
            charset += CHAR_SETS.upper;
            requiredChars.push(CHAR_SETS.upper[getSecureRandomInt(CHAR_SETS.upper.length)]);
        }
        if (includeLower.checked) {
            charset += CHAR_SETS.lower;
            requiredChars.push(CHAR_SETS.lower[getSecureRandomInt(CHAR_SETS.lower.length)]);
        }
        if (includeNumbers.checked) {
            charset += CHAR_SETS.numbers;
            requiredChars.push(CHAR_SETS.numbers[getSecureRandomInt(CHAR_SETS.numbers.length)]);
        }
        if (includeSymbols.checked) {
            charset += CHAR_SETS.symbols;
            requiredChars.push(CHAR_SETS.symbols[getSecureRandomInt(CHAR_SETS.symbols.length)]);
        }

        if (charset === '') {
            passwordInput.value = '';
            updateStrengthIndicator(0);
            showToast('¡Selecciona al menos una opción!', 'warning');
            return;
        }

        const length = parseInt(lengthSlider.value);
        let passwordArray = [...requiredChars];

        // Fill remaining spaces
        for (let i = passwordArray.length; i < length; i++) {
            const index = getSecureRandomInt(charset.length);
            passwordArray.push(charset[index]);
        }

        // Fisher-Yates Shuffle using Secure Random
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = getSecureRandomInt(i + 1);
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        const password = passwordArray.join('');
        passwordInput.value = password;
        calculateStrength(password);
    };

    /**
     * Calculates password strength based on length and variety
     */
    const calculateStrength = (password) => {
        let score = 0;
        if (password.length > 8) score += 1;
        if (password.length > 12) score += 1;

        let variety = 0;
        if (/[A-Z]/.test(password)) variety++;
        if (/[a-z]/.test(password)) variety++;
        if (/[0-9]/.test(password)) variety++;
        if (/[^A-Za-z0-9]/.test(password)) variety++;

        if (variety >= 2) score += 1;
        if (variety >= 4) score += 1;

        updateStrengthIndicator(score);
    };

    /**
     * Updates the UI segments and text for strength
     */
    const updateStrengthIndicator = (score) => {
        let text = 'Muy Débil';
        let strengthClass = '';

        if (score >= 4) {
            text = 'Muy Segura';
            strengthClass = 'strength-secure';
        } else if (score >= 3) {
            text = 'Segura';
            strengthClass = 'strength-strong';
        } else if (score >= 2) {
            text = 'Media';
            strengthClass = 'strength-medium';
        } else if (score >= 1) {
            text = 'Débil';
            strengthClass = 'strength-weak';
        }

        if (strengthMeter) {
            strengthMeter.className = `strength-meter ${strengthClass}`;
        }

        strengthText.textContent = `Seguridad: ${text}`;
    };

    // --- Event Listeners ---

    // Show Popup
    const showPopup = (password) => {
        if (!password) return;
        popupPasswordDisplay.textContent = password;
        popupOverlay.classList.add('show');
        popupOverlay.setAttribute('aria-hidden', 'false');
    };

    // Hide Popup
    const hidePopup = () => {
        popupOverlay.classList.remove('show');
        popupOverlay.setAttribute('aria-hidden', 'true');
    };

    // Close popup handlers
    closePopupBtn.addEventListener('click', hidePopup);
    popupAcceptBtn.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('show')) {
            hidePopup();
        }
    });

    // Copy inside popup
    popupCopyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const pwd = popupPasswordDisplay.textContent;
        if (!pwd) return;

        try {
            await navigator.clipboard.writeText(pwd);
            showToast('¡Contraseña copiada!', 'success');

            // Copy tooltip positioning inside popup
            const popupTooltip = document.createElement('div');
            popupTooltip.className = 'copy-tooltip';
            popupTooltip.textContent = '¡Copiado!';

            const rect = popupCopyBtn.getBoundingClientRect();
            popupTooltip.style.left = `${rect.left + rect.width / 2}px`;
            popupTooltip.style.top = `${rect.top - 10}px`;

            document.body.appendChild(popupTooltip);

            setTimeout(() => {
                popupTooltip.classList.add('fade-out');
                setTimeout(() => popupTooltip.remove(), 600);
            }, 1000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    });

    // Generate on click
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateBtn.classList.add('clicked');
        generatePassword();

        // Show popup with the new password
        showPopup(passwordInput.value);

        // Remove class after animation triggers (300ms)
        setTimeout(() => {
            generateBtn.classList.remove('clicked');
        }, 300);
    });

    // Update length text on slide
    lengthSlider.addEventListener('input', () => {
        lengthVal.textContent = lengthSlider.value;
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!passwordInput.value) return;

        try {
            await navigator.clipboard.writeText(passwordInput.value);

            // Contextual Popup (Professional Tooltip)
            const popup = document.createElement('div');
            popup.className = 'copy-tooltip';
            popup.textContent = '¡Copiado!';

            // Position it above the button
            const rect = copyBtn.getBoundingClientRect();
            popup.style.left = `${rect.left + rect.width / 2}px`;
            popup.style.top = `${rect.top - 10}px`;

            document.body.appendChild(popup);

            // Animation & Removal
            setTimeout(() => {
                popup.classList.add('fade-out');
                setTimeout(() => popup.remove(), 600);
            }, 1000);

        } catch (err) {
            console.error('Error al copiar:', err);
        }
    });

    // Toggle Visibility
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const eyeOpen = document.getElementById('eye-open');
        const eyeClosed = document.getElementById('eye-closed');
        const type = passwordInput.getAttribute('type') === 'text' ? 'password' : 'text';

        passwordInput.setAttribute('type', type);

        // Update Icon visibility
        if (type === 'text') {
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        } else {
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        }
    });

    // Helper: Toast
    const showToast = (message = '¡Contraseña copiada!', type = 'success') => {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.classList.remove('show');
            // Reset class after animation
            setTimeout(() => { toast.className = 'toast'; }, 400);
        }, 2500);
    };

    // Initial Generation
    generatePassword();
});
