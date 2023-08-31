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
        <button onclick='showCategoryDetails("${category.category_id}")' class="tab bg-slate-200 rounded text-lg font-semibold text-slate-500">${category.category}</button>
        `
        categoryID.appendChild(categoryBtn);

    });
}


// show details of every card 
async function showCategoryDetails(id = 1000) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cardDetails = data.data;
    // console.log(cardDetails.length);
    if(cardDetails.length > 0){
        
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    cardDetails.forEach(card => {
        let cardDetail = document.createElement('div');
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
        console.log(card.authors.profile_picture);
    })


}







showCategoryDetails();


loadCategory();
