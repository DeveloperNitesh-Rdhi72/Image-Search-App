const input = document.querySelector(".keyword")
const search = document.querySelector(".search")
const imageSection = document.querySelector(".images")
const more = document.querySelector(".more")
let page = 1;
async function imageSearch(page) {
    if (input.value === "") {
        imageSection.innerHTML = "Write something to search"
        imageSection.classList.add("align")
    }
    else {
        imageSection.classList.remove("align")
        if (page == 1) {
            imageSection.innerHTML = ""
        }
        let keyword = input.value
        let apikey = "YVANynFzHzTFhpUkr5DwPCDReMp-LQ9Sx2Q21AeSLKA"
        let api = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apikey}&per_page=12`

        let response = await fetch(api)
        if (!response.ok) {
            imageSection.innerHTML = "Network Error";
            return;
        }

        let data = await response.json();
        let results = data.results;
        if (results.length === 0) {
            imageSection.innerHTML = `<p class="empty">No images found 😕</p>`;
            more.style.display = "none";
            imageSection.classList.add("align")
            return;
        }
        imageSection.classList.remove("align")
        createImage(results);
        more.style.display = "block";
    }
}

search.addEventListener("click", () => {
    page = 1
    imageSearch(page)
})

function createImage(results) {
    results.map((result) => {
        let img = document.createElement("img")
        img.src = result.urls.small
        let imglink = document.createElement("a")
        imglink.href = result.links.html
        imglink.target = "_blank"
        imglink.appendChild(img)
        imageSection.appendChild(imglink)
    })
}

more.addEventListener("click", () => {
    page++;
    imageSearch(page)
})

