// global veriable for further use 
let specificCategoryDetail;

function globalMaker(cardDetails) {
    specificCategoryDetail = cardDetails;
}
// console.log(specificCategoryDetail);


// logo clicked to go home again
function homeBack() {
    window.location.href = "index.html";
}
function blogPage() {
    window.location.href = "blog.html";
}

// load data from api 
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data);
    const categories = data.data;
    // console.log(categories);
    displayCategory(categories);
}

// show category buttons 
function displayCategory(categories) {
    const categoryID = document.getElementById('category-btn-container');
    
    categories.forEach(category => {
        // console.log(category.category);
        
        const categoryBtn = document.createElement('div');
        categoryBtn.classList = 'mr-5 md:mr-10 mb-3 md:mb-0'
        categoryBtn.innerHTML = `
        <button id="act-btn" onclick='loadApiID("${category.category_id}")' class="tab focus:bg-red-400 focus:text-white bg-slate-200 rounded text-lg font-semibold text-slate-500 mx-auto ">${category.category}</button>
        `
        categoryID.appendChild(categoryBtn);
        
    });
}


// show details of every card 
async function loadApiID(id = 1000) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cardDetails = data.data;
    // console.log(cardDetails);

    // make the id data global for further uses
    globalMaker(cardDetails);

    displayCards(cardDetails);
}

// separete display all cards function
function displayCards(cardDetails) {

    // console.log(cardDetails.length);
    const cardContainer = document.getElementById('card-container');
    const emptyContainer = document.getElementById('empty-data-container');
    cardContainer.textContent = '';
    emptyContainer.textContent = '';


    // conditions for data empty or not 
    if (cardDetails.length > 0) {

        cardDetails.forEach(card => {

        // convert time to min and seconds 
        let [hr,min] = vdoDuration(card);
        const cardDetail = document.createElement('div');
        cardDetail.classList = "card card-compact w-11/12 bg-base-100 mx-auto space-y-3 mb-10";
        cardDetail.innerHTML = `
        <div class="relative">
        <figure><img src="${card.thumbnail}" class="w-11/12 h-44 rounded-lg" />
        </div>
        <div class="bg-[#171717] text-white rounded-lg px-2 text-center absolute right-5 top-32 lg:top-34">
           ${card?.others?.posted_date ? `${hr} hr ${min} min ago` : ""}
        </div>
        </figure>

        <div class="card-body">
    
        <div class="flex gap-5">
                <div>
                    <img src="${card?.authors[0]?.profile_picture}" alt="" class="w-12 h-12 rounded-full">
                </div>
                <div>
                    <h3 class="card-title text-lg font-bold">${card.title}</h3>
                    <p>${card?.authors[0]?.profile_name} <span>${card.authors[0].verified ? '<i class="fa-solid fa-circle-check text-blue-500 ml-3"></i>' : ""}</span> </p>
                    <p> ${card?.others?.views} </p>
                </div>
            </div>
        </div>
        `
            cardContainer.appendChild(cardDetail); 
        }


        )
    }
    else {
        const cardDetail = document.createElement('div');
        cardDetail.innerHTML = `<div class="text-center my-28 space-y-5">
        <img src="images/Icon.png" alt="" class="mx-auto">
        <h3 class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h3>
        </div>
        `
        emptyContainer.appendChild(cardDetail);
    }

}

// video duration
function vdoDuration(card) {
    const totalSeconds = card?.others?.posted_date;
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return [hours,minutes];
}


// button of sorting (onclick button)
function btnSort() {
    let sorted = specificCategoryDetail.sort((a, b) => parseFloat(b?.others?.views) - parseFloat(a?.others?.views));
    displayCards(sorted);
}


// by default calling 
loadApiID();
loadCategory();

