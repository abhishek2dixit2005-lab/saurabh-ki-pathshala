// Basic page protection
if (!document.referrer.includes("index.html")) {
  alert("Please login first");
  window.location.href = "index.html";
}

fetch("/videos").then(r=>r.json()).then(data=>{
data.forEach(v=>{
videos.innerHTML += `<li><a href="${v.url}" target="_blank">${v.title}</a></li>`;
});
});

fetch("/notes").then(r=>r.json()).then(data=>{
data.forEach(n=>{
notes.innerHTML += `<li><a href="/uploads/notes/${n.file}" download>${n.title}</a></li>`;
});
});
function logout() {
  window.location.href = "index.html";
}