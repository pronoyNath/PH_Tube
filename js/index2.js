let specificCategoryDetail;
let clearCardContainer;
function globalMaker(cardDetails, cardContainer) {
    specificCategoryDetail = cardDetails;
    clearCardContainer = cardContainer;
}



// logo clicked to go home again
function homeBack() {
    window.location.href = "index.html";
}
function blogPage() {
    window.location.href = "blog.html";
}


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
        // console.log(category);
        const categoryBtn = document.createElement('div');
        categoryBtn.classList = 'mr-10'
        categoryBtn.innerHTML = `
        <button id="act-btn" onclick='showCategoryDetails("${category.category_id}")' class="tab bg-slate-200 rounded text-lg font-semibold text-slate-500">${category.category}</button>
        `
        categoryID.appendChild(categoryBtn);

    });
}


// show details of every card 
async function showCategoryDetails(id = 1000) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cardDetails = data.data;
    // console.log(cardDetails);
    displayCards(cardDetails);
}

// new function separete
function displayCards(cardDetails){
      
    // console.log(cardDetails.length);
    const cardContainer = document.getElementById('card-container');
    const emptyContainer = document.getElementById('empty-data-container');
    cardContainer.textContent = '';
    emptyContainer.textContent = '';
    
    
    // make the id data global for further uses
    globalMaker(cardDetails, cardContainer);


    // conditions for data empty or not 
    if (cardDetails.length > 0) {

        cardDetails.forEach(card => {
            const cardDetail = document.createElement('div');
            cardDetail.classList = "card card-compact w-11/12 bg-base-100 mx-auto space-y-3 mb-10";
            cardDetail.innerHTML = `
        <figure><img src="${card.thumbnail}" class="w-11/12 h-44 rounded-lg" /></figure>

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

// button sorting 
function btnSort() {
    let sorted = specificCategoryDetail.sort((a, b) => parseFloat(b?.others?.views) - parseFloat(a?.others?.views));
    // console.log(sorted);
    displayCards(sorted);
}


// by default calling 
showCategoryDetails();

loadCategory();
