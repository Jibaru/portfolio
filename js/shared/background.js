const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export function createChar() {
  const char = document.createElement("div");
  char.classList.add("hacker-char");
  char.textContent = chars[Math.floor(Math.random() * chars.length)];

  char.style.left = Math.random() * window.innerWidth + "px";
  char.style.top = Math.random() * window.innerHeight + "px";

  char.style.animationDuration = Math.random() * 2 + 1 + "s";

  document.body.appendChild(char);

  setTimeout(() => char.remove(), 3000);
}

export function paintBackground() {
  setInterval(createChar, 900);
}
