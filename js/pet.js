const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons) {
        btn.classList.remove('active')
    }
}
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch(error => console.log(error))
}

const loadAllPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error))
}

const loadPetDetails = async (petsId) => {
    console.log(petsId)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petsId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData)

}

const displayDetails = (petDetails) => {
    const { image, breed, gender, vaccinated_status, pet_details, pet_name ,date_of_birth ,price} = petDetails;
    const detailsContainer = document.getElementById('modal-container');
    detailsContainer.innerHTML = `
        <div>
            <img class="w-full h-auto rounded-lg" src=${image} alt="" srcset="" />
            <div>
                <div class="pb-4">
                    <h2 class="font-bold card-title">${pet_name}</h2>
                    <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-border-all"></i> Breed: ${breed == null ? " data not found" : breed}</p>
                    <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-calendar-days"></i> Birth: ${date_of_birth == null ? "data not found" : date_of_birth}</p>
                    <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-mercury"></i> Gender: ${gender == null ? "data not found" : gender}</p>
                    <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-dollar-sign"></i> Price : ${price == null ? "Price is not given" : `${price} $`} </p>
                    <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-virus"></i> Vaccinated status : ${vaccinated_status == null ? "Price is not given" : `${vaccinated_status}`} </p>
                    
                </div>
                <hr />
                <div class="mt-3">
                 <h1 class="text-xl font-semibold text-gray-800">Details Information</h1>
                 <p class="text-gray-500">${pet_details}</p>
                </div>
            </div>
        </div>
    
    `
    document.getElementById('customModal').showModal()
}


const loadCategoryPets = (category) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn = document.getElementById(`btn-${category}`);
            activeBtn.classList.add('active')
            console.log(activeBtn)
            displayAllPets(data.data)
        })
        .catch(error => console.log(error))
}

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('all-pets-container');
    petsContainer.innerHTML = "";
    if (pets.length == 0) {
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
            <div class="flex bg-slate-50  gap-5  p-4 rounded-md flex-col justify-center items-center">
             <img src="assets/error.webp" alt="" srcset="" />
             <h1 class="text-4xl font-semibold text-gray-700">No Information Available</h1>
             <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br />
its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>

        
        `;
        return;
    }
    else {
        petsContainer.classList.add('grid');
    }
    pets.forEach((pet) => {
        const { petId, breed, category, image, pet_name, date_of_birth, gender, price } = pet;
        const card = document.createElement('div')
        card.classList = "card bg-zinc-50";
        card.innerHTML = `
            <figure class="p-3">
                            <img src=${image}
                                alt="pet" class="object-cover rounded-lg h-60" />
                        </figure>
                        <div class="px-5 pb-4">
                            <h2 class="font-bold card-title">${pet_name}</h2>
                            <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-border-all"></i> Breed: ${breed == null ? " data not found" : breed}</p>
                            <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-calendar-days"></i> Birth: ${date_of_birth == null ? "data not found" : date_of_birth}</p>
                            <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-mercury"></i> Gender: ${gender == null ? "data not found" : gender}</p>
                            <p class="py-1 text-sm font-semibold text-zinc-500"><i class="fa-solid fa-dollar-sign"></i> Price : ${price == null ? "Price is not given" : `${price} $`} </p>
                            <div class="flex justify-between mt-3 card-actions">
                                <button class="px-4 py-1 text-base font-semibold rounded-md text-cyan-900 bg-slate-200"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button class="px-4 py-1 text-base font-semibold rounded-md text-cyan-900 bg-slate-200">Adopt</button>
                                <button onclick="loadPetDetails(${petId})" class="px-4 py-1 text-base font-semibold rounded-md text-cyan-900 bg-slate-200">Details</button>
                            </div>
                        </div>
        
        `
        petsContainer.append(card)
    })
}

const displayCategory = (categories) => {
    categories.forEach((item) => {
        const { category, category_icon, id } = item;
        const categoriesContainer = document.getElementById('category-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${category}" onclick="loadCategoryPets('${category}')" class="category-btn flex items-center text-xl font-semibold btn" type="button"><img class="w-10 h-10"
                        src=${category_icon} alt="" srcset=""> ${category}</button>
        `
        categoriesContainer.append(div)
    })
}
loadAllPets()
loadCategory()