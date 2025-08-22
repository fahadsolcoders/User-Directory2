let user =  []
let filtered = []
let currentPage = 1
const itemPerPage = 5

const userGrid =  document.getElementById("userGrid")
const searchInput = document.getElementById("searchInput")
const sortSelect = document.getElementById("sortSelect")
const pagination = document.getElementById("pagination")
const loading = document.getElementById("loading")
const noResult = document.getElementById("noResult")
const modal = document.getElementById("userModal")
const closeBtn = document.querySelector(".close")
const themeToggle = document.getElementById("themeToggle")

window.addEventListener("load",fetchUsers)
searchInput.addEventListener("input",handleSearch)
sortSelect.addEventListener("change",handelsort)
closeBtn.addEventListener("click",closeModal)
window.addEventListener("click",(e) => {
    if(e.target === modal)
        closeModal()
})
themeToggle.addEventListener("click",themeToggle)

async function fetchUsers(){
    loading.style.display = "block";
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        filteredUsers = [...users]
        displayUsers()
    }
    catch(error){
        console.error(`Error fetching users:`,error);
    }
    finally{
        loading.style.display = "none"
    }
}

function displayUsers(){
    userGrid.innerHTML = ""
    noResult.style.display = "none"

    if(filteredUsers.length === 0){
        noResult.style.display = "block"
        pagination.innerHTML = "";
        return
    }

    const start = (currentPage - 1) * itemPerPage
    const end = start + itemsPerPage
    const paginatedUsers = filteredUsers.slice(start,end)

    paginatedUsers.forEach(user => {
        const card = document.createElement("div")
        card.classList.add("user-card")
        card.innerHTML=`
        <h3>${user.name}</h3>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Comapany: ${user.company.name}</p>
        `
        card.addEventListener("click", () => openModal(user));
        userGrid.appendChild(card)
    })
    setupPagination()
}

function setupPagination() {
    pagination.innerHTML = ""
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous"
    prevBtn.classList.toggle("disabled",currentPage === 1)
    prevBtn.addEventListener("click",() => {
        if(currentPage > 1){
            currentPage--;
            displayUsers()
        }
    })
    pagination.appendChild(prevBtn)

    const nextBtn = document.createElement("button")
    nextBtn.textContent = "Next"
    nextBtn.classList.toggle("diabled",currentPage === pageCount);
    nextBtn.addEventListener("click", () =>{
        if(currentPage < pageCount){
            currentPage++
            displayUsers()
        }
    })
    pagination.appendChild(nextBtn)
}

function handleSearch(){
    const query = searchInput.ariaValueMax.toLocaleLowerCase()
    filteredUsers = users.filter(user => user.name.toLocaleLowerCase().includes(query) || user.username.toLocaleLowerCase().includes(query))
    currentPage = 1
    handelsort();
}

function handelsort(){
    const sortValue = sortSelect.value
    if(sortValue === "asc"){
        filteredUsers.sort((a,b) => a.name.localeCompare(b.name))
    }
    else if(sortValue === "desc"){
        filteredUsers.sort((a,b) => b.name.localeCompare(a.name))
    }
    currentPage = 1
    displayUsers()
}

function openModal(user){
    document.getElementById("modalName").textContent = user.name;
    document.getElementById("modalUsername").textContent = user.username
    document.getElementById("modalPhone").textContent = user.phone
    document.getElementById("modalAddress").textContent = `${user.address.street},${user.address.city},${user.address,zipcode}`
    document.getElementById("modalCompany").textContent = user.company.name
    modal.style.display = "flex"
}

function closeModal() {
    modal.style.display = "none" 
}

function toggleTheme(){
    document.body.classList.toggle("dark")
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark")
    }
    else{
        localStorage.removeItem("theme")
    }
}

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark")
}