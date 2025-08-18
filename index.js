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