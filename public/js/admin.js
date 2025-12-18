// Basic page protection
if (!document.referrer.includes("index.html")) {
  alert("Please login first");
  window.location.href = "index.html";
}

function addVideo(){
  // existing code
}
function addVideo(){
fetch("/add-video",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
title:videoTitle.value,
url:videoUrl.value
})
}).then(()=>location.reload());
}

noteForm.onsubmit = e => {
e.preventDefault();
fetch("/upload-note",{
method:"POST",
body:new FormData(noteForm)
}).then(()=>location.reload());
};

fetch("/videos").then(r=>r.json()).then(data=>{
data.forEach((v,i)=>{
videoList.innerHTML += `<li>${v.title}
<button onclick="delV(${i})">Delete</button></li>`;
});
});

fetch("/notes").then(r=>r.json()).then(data=>{
data.forEach((n,i)=>{
noteList.innerHTML += `<li>${n.title}
<button onclick="delN(${i})">Delete</button></li>`;
});
});

fetch("/logs").then(r=>r.json()).then(data=>{
data.forEach(l=>{
logs.innerHTML += `<li>${l.name} | ${l.email} | ${l.time}</li>`;
});
});

function delV(i){
fetch("/delete-video",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({index:i})
}).then(()=>location.reload());
}

function delN(i){
fetch("/delete-note",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({index:i})
}).then(()=>location.reload());
}
function logout() {
  window.location.href = "index.html";
}