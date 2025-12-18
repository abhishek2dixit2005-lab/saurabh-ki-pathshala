function login(){
fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:email.value,
password:password.value,
role:role.value
})
})
.then(res=>res.json())
.then(data=>{
if(data.success){
location.href = role.value==="admin" ? "admin.html" : "student.html";
}else{
alert("Invalid Login");
}
});
}
function logout() {
  window.location.href = "index.html";
}
