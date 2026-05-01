const chars = {
uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
lowercase: "abcdefghijklmnopqrstuvwxyz",
numbers: "0123456789",
symbols: "!@#$%^&*()_+[]+'=-`~{}\\|\";:,.<>/?"
};

function generatePassword() {
const length = parseInt(document.getElementById('length').value);

let characterPool = '';
characterPool += chars.uppercase;
characterPool += chars.lowercase;
characterPool += chars.numbers;
characterPool += chars.symbols;

if (characterPool === '') {
alert("Please select at least one character type");
return;
}

let password = '';
for (let i = 0; i < length; i++) {
password += characterPool[Math.floor(Math.random() * characterPool.length)];
}

document.getElementById('password').textContent = password;
updateStrength(password);
}

function updateLength(value) {
document.getElementById('lengthValue').textContent = value;
}

async function copyPassword() {
    const passwordText = document.getElementById('password').textContent.trim();
    
    if (!passwordText || passwordText === "Click Generate") {
        alert("Generate a password first!");
        return;
    }
    
    try {
        // Modern Clipboard API (preferred when it works)
        await navigator.clipboard.writeText(passwordText);
        showCopiedFeedback();
    } catch (err) {
        // Fallback for iOS / HTTP / standalone mode
        fallbackCopyText(passwordText);
    }
}
    
function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-999999px";
    textarea.style.top = "-999999px";
    document.body.appendChild(textarea);
    
    textarea.focus();
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopiedFeedback();
        } else {
            alert("Copy failed. Please long-press the password and copy manually.");
        }
    } catch (err) {
        alert("Copy not supported in this browser. Long-press the password text to copy.");
    }
    document.body.removeChild(textarea);
}

function showCopiedFeedback() {
const btn = document.querySelector('.copy-btn');
const originalText = btn.textContent;
btn.textContent = "Copied!";
btn.style.background = "#10b981"; // green for success

setTimeout(() => {
btn.textContent = originalText;
btn.style.background = "#3b82f6"; // reset to blue
}, 1800);
}
function updateStrength(password) {
const strengthDiv = document.getElementById('strength');

let score = 0;
if (password.length >= 12) score++;
if (/[A-Z]/.test(password)) score++;
if (/[a-z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;

if (score <= 2) {
strengthDiv.textContent = "Weak";
strengthDiv.className = "strength weak";
} else if (score <= 4) {
strengthDiv.textContent = "Medium";
strengthDiv.className = "strength medium";
} else {
strengthDiv.textContent = "Strong";
strengthDiv.className = "strength strong";
}
}
