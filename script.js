const seedBooks=[
{id:1,title:"সহিহ আল-বুখারী",author:"ইমাম বুখারী",cat:"হাদিস",desc:"সহিহ হাদিসের প্রসিদ্ধ সংকলন।",pdf:""},
{id:2,title:"কুরআন মাজীদ (বাংলা অনুবাদ)",author:"ড. মুজাম্মিল হক",cat:"কুরআন ও তাফসির",desc:"বাংলা অনুবাদসহ কুরআন মাজীদ।",pdf:""},
{id:3,title:"রিয়াদুস সালেহীন",author:"ইমাম নববী",cat:"হাদিস",desc:"আখলাক ও আমল বিষয়ক নির্বাচিত হাদিস।",pdf:""},
{id:4,title:"দোয়া ও আমল",author:"মুফতি জাকির উসমানী",cat:"দোয়া ও আমল",desc:"দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও আমল।",pdf:""},
{id:5,title:"জান্নাতের পথ",author:"মাওলানা আব্দুর রহমান",cat:"আকিদা",desc:"ঈমান ও নেক আমল সম্পর্কে আলোচনা।",pdf:""},
{id:6,title:"নবীজীর জীবনী",author:"সাইফুল্লাহ আবু হানিফ",cat:"সীরাত",desc:"রাসূলুল্লাহ ﷺ-এর জীবন ও শিক্ষা।",pdf:""}
];
function getBooks(){try{return JSON.parse(localStorage.getItem("ikg_books"))||seedBooks}catch(e){return seedBooks}}
function saveBooks(a){localStorage.setItem("ikg_books",JSON.stringify(a))}
function cards(list=getBooks()){
 const el=document.querySelector("#bookGrid"); if(!el)return;
 el.innerHTML=list.map(b=>`<article class="book"><div class="cover">${b.title}</div><h3>${b.title}</h3><p>${b.author}</p><div class="row"><button onclick="location.href='book.html?id=${b.id}'">📖 পড়ুন</button><button onclick="downloadPdf(${b.id})">↓ PDF</button></div></article>`).join("");
}
function searchBooks(){const q=(document.querySelector("#searchInput")?.value||"").toLowerCase();const a=getBooks();cards(q?a.filter(b=>(b.title+b.author+b.cat+b.desc).toLowerCase().includes(q)):a)}
function filterBooks(c){cards(getBooks().filter(b=>b.cat===c));document.querySelector("#books")?.scrollIntoView({behavior:"smooth"})}
function downloadPdf(id){const b=getBooks().find(x=>x.id===id);if(b?.pdf){const a=document.createElement("a");a.href=b.pdf;a.download=(b.title||"kitab")+".pdf";a.click()}else alert("এই কিতাবের PDF এখনো যোগ করা হয়নি।")}
function detail(){const id=new URLSearchParams(location.search).get("id"),b=getBooks().find(x=>x.id==id)||getBooks()[0];if(!b)return;document.querySelector("#detail").innerHTML=`<div class="cover">${b.title}</div><div class="meta"><h2>${b.title}</h2><p><b>লেখক:</b> ${b.author}</p><p><b>ক্যাটাগরি:</b> ${b.cat}</p><p>${b.desc}</p><p>এখানে কিতাবের বিস্তারিত তথ্য রাখা যাবে।</p><button class="btn" onclick="downloadPdf(${b.id})">↓ PDF</button></div>`}
function initPublic(){if(document.querySelector("#bookGrid")){cards();document.querySelector("#searchInput")?.addEventListener("keydown",e=>{if(e.key==="Enter")searchBooks()})}if(document.querySelector("#detail"))detail()}
function adminLogin(){const p=document.querySelector("#adminPass").value;if(p==="1234"){localStorage.setItem("ikg_admin","1");location.href="admin.html"}else document.querySelector("#loginMsg").textContent="পাসওয়ার্ড ভুল হয়েছে। (ডেমো পাসওয়ার্ড: 1234)"}
function requireAdmin(){if(localStorage.getItem("ikg_admin")!=="1"){document.querySelector("#adminApp").style.display="none";document.querySelector("#login").style.display="block"}else{document.querySelector("#login").style.display="none";renderAdmin()}}
function logout(){localStorage.removeItem("ikg_admin");location.reload()}
function renderAdmin(){const a=getBooks();document.querySelector("#countBooks").textContent=a.length;document.querySelector("#bookRows").innerHTML=a.map(b=>`<tr><td>${b.title}</td><td>${b.author}</td><td>${b.cat}</td><td>${b.pdf?"PDF আছে":"PDF নেই"}</td><td><button onclick="editBook(${b.id})">সম্পাদনা</button> <button class="danger" onclick="deleteBook(${b.id})">মুছুন</button></td></tr>`).join("")}
function addBook(){const title=document.querySelector("#title").value.trim(),author=document.querySelector("#author").value.trim(),cat=document.querySelector("#cat").value,desc=document.querySelector("#desc").value.trim(),file=document.querySelector("#pdf").files[0];if(!title||!author)return alert("কিতাবের নাম ও লেখক দিন।");const reader=file?new FileReader():null;const finish=(pdf="")=>{const a=getBooks();a.push({id:Date.now(),title,author,cat,desc,pdf});saveBooks(a);document.querySelector("#bookForm").reset();renderAdmin();alert("কিতাব যোগ হয়েছে।");};if(reader){reader.onload=()=>finish(reader.result);reader.readAsDataURL(file)}else finish("")}
function deleteBook(id){if(confirm("এই কিতাবটি মুছে ফেলবেন?")){saveBooks(getBooks().filter(b=>b.id!==id));renderAdmin()}}
function editBook(id){const b=getBooks().find(x=>x.id===id);if(!b)return;document.querySelector("#title").value=b.title;document.querySelector("#author").value=b.author;document.querySelector("#cat").value=b.cat;document.querySelector("#desc").value=b.desc;document.querySelector("#editingId").value=id;document.querySelector("#saveBtn").textContent="পরিবর্তন সংরক্ষণ করুন";window.scrollTo({top:0,behavior:"smooth"})}
function saveForm(){const id=Number(document.querySelector("#editingId").value);if(!id)return addBook();const a=getBooks(),i=a.findIndex(b=>b.id===id),file=document.querySelector("#pdf").files[0];const update=pdf=>{a[i]={...a[i],title:document.querySelector("#title").value.trim(),author:document.querySelector("#author").value.trim(),cat:document.querySelector("#cat").value,desc:document.querySelector("#desc").value.trim(),pdf:pdf||a[i].pdf};saveBooks(a);document.querySelector("#bookForm").reset();document.querySelector("#editingId").value="";document.querySelector("#saveBtn").textContent="কিতাব যোগ করুন";renderAdmin();alert("পরিবর্তন সংরক্ষিত হয়েছে।")};if(file){const r=new FileReader();r.onload=()=>update(r.result);r.readAsDataURL(file)}else update("")}
initPublic();
if(document.querySelector("#adminApp"))requireAdmin();
