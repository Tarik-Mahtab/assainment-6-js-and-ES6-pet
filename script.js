// loadCategories
const loadCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");

    const data = await res.json();

    displayCatagory(data.categories
    );

};
// Display Catagory 
const displayCatagory = (categories) => {


    const categoriesContainer = document.getElementById('Categories-Container');

    categories.forEach(categoryy => {
        const div = document.createElement('div');
        div.innerHTML = `
    <button id="btn-${categoryy.category}"  onclick="loadCategoryPets('${categoryy.category}')" class="btn  flex justify-evenly rounded-full items-center  text-black text-lg px-6 my-8 active-btn">
        <span>
            <img class=" w-6 h-6 object-contain" src=${categoryy.category_icon}>
        </span>
        <span>${categoryy.category}</span>
    </button>
        `
        categoriesContainer.appendChild(div);
    });
};

// Pet Details 
const petDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();

    const modalContainer = document.getElementById("modal-container")

    const { image, pet_name, breed, date_of_birth, gender, price, vaccinated_status, pet_details } = data.petData;


    modalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box  ">

                    <div class="flex justify-center items-center">
                        <img  class=" rounded-lg"  src="${image}" alt="">
                    </div>

                        


                    <div class="w-10/12 mx-auto grid grid-cols-2 gap-4">

                        <div class=" col-span-2" >
                            <h1 class="font-bold text-2xl text-black pt-6 ">${pet_name}<h1/>
                         </div>

                        <div class="flex items-center ">
    
                            <img class="w-5 h-5 object-cover "  src="https://img.icons8.com/?size=25&id=3HZ7XnHYHYnW&format=png" alt=""> 

                            <p>Breed : ${(!breed ? "Normal Breed" : breed)}</p>
    
                        </div>

                        <div class="flex items-center">
    
                        <img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt=""> 

                        <p>Birth : ${(!date_of_birth ? "Not Mentioned" : date_of_birth)}</p>
    
                       </div>

                        <div class="flex items-center">
    
                            <img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=30&id=hsngb3LL35uI&format=png" alt=""> 

                            <p>Gender : ${(!gender ? "Not Available" : gender)}</p>
    
                        </div>

                        <div class="flex items-center">
    
                            <img class="w-5 h-5 object-cover"  src="https://img.icons8.com/?size=26&id=58437&format=png" alt=""> 

                            <p>Price : ${(!price ? "Sold Out" : price)} $</p>
    
                        </div>

                        <div class="flex items-center col-span-2 ">
    
                            <img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=50&id=962&format=png" alt=""> 

                            <p>vaccinated Status : ${(!vaccinated_status ? "No" : vaccinated_status)}</p>
    
                        </div>

                    </div>

                    
                    <div>
                        <p class="pt-7 text-xl font-bold text-black">Details Information</P>
                        <p class="pt-3">${pet_details}</P>
                    </div>


                    <div class="w-full my-3 ">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn text-lg font-bold text-teal-600 w-full">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `;
    my_modal_5.showModal()
};

// Loading Spinnr 
const spinnerr = () =>{
    document.getElementById("spinner").style.display="none";
};
// Load PET By Categories 
const loadCategoryPets = async (petName) => {

    document.getElementById("spinner").style.display="block";

    setTimeout(function(){
        spinnerr(); 
    }, 1000);

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`);

    const data = await res.json();

    const activeButton = document.getElementById(`btn-${petName}`);


    btnColor();

    activeButton.classList.add("btnColor")

    displayPets(data.data);   
    

};

const btnColor = () => {
    const activeBtn = document.getElementsByClassName('active-btn')
    for (const act of activeBtn) {
        act.classList.remove("btnColor")
    }
};

// Load Pet All 
const loadAllPets = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");

    const data = await res.json();

    displayPets(data.pets);
};
// Display All Pets 
const displayPets = (pets) => {
    const petsAll = document.getElementById('pet-all');

    petsAll.innerHTML = ""

    if (pets.length === 0) {
        petsAll.classList.remove("grid")
        petsAll.innerHTML = `
                    <div class=" w-4/5 my-8 flex flex-col justify-center items-center gap-7">
                        <img src="images/error.webp" alt="">
                        <h1 class="text-2xl font-bold text-black text-center">No Information Available</h1>
                        <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                            its layout. The point of using Lorem Ipsum is that it has a.</p>
                    </div>
        `
    } else {
        petsAll.classList.add('grid');
    };


    pets.forEach(pet => {

        const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet;

        const petCard = document.createElement("div");

        petCard.classList = "card card-compact bg-base-100  shadow-xl"

        petCard.innerHTML = `
  <figure>
    <img
      src=${image}
      alt="pets" 
       class="rounded-xl" />
  </figure>

  <div class="px-0 py-5 text-slate-500">

        <div>
            <h1 class="font-bold text-xl text-black py-2 ">${pet_name}<h1/>
        </div>

    <div class="flex items-center ">
    
        <img class="w-5 h-5 object-cover "  src="https://img.icons8.com/?size=25&id=3HZ7XnHYHYnW&format=png" alt=""> 

        <p>Breed : ${(!breed ? "Normal Breed" : breed)}</p>
    
    </div>

        <div class="flex items-center">
    
        <img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt=""> 

        <p>Birth : ${(!date_of_birth ? "Not Mentioned" : date_of_birth)}</p>
    
    </div>

        <div class="flex items-center">
    
        <img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=30&id=hsngb3LL35uI&format=png" alt=""> 

        <p>Gender : ${(!gender ? "Not Available" : gender)}</p>
    
    </div>

    <div class="flex items-center">
    
        <img class="w-5 h-5 object-cover"  src="https://img.icons8.com/?size=26&id=58437&format=png" alt=""> 

        <p>Price : ${(!price ? "Sold Out" : price)} $</p>
    
    </div>

  </div>


  <div class="flex items-center justify-evenly py-3  ">

    <button  onclick=" petPicShow('${petId}')" class="btn  text-emerald-600 py-0 text-xl font-bold ">
  <img src="https://img.icons8.com/?size=24&id=82788&format=png" alt="">
  </button>

  <button class="btn  text-emerald-600 py-0 text-xl font-bold ">Adopt</button>
  
  <button onclick=" petDetails('${petId}')" class="btn  text-emerald-600 py-0 text-xl font-bold ">Details</button>
  </div>

  
        `;

        petsAll.appendChild(petCard)


    });

};

// Showing Pic Left Side
const petPicShow = async (pic) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pic}`);
    const data = await res.json();

    const picContainer = document.getElementById("pic-all")
    picContainer.classList = "md:w-1/5 md:h-24 py-2 grid grid-cols-2 gap-2"

    const picDiv = document.createElement("div");
    picDiv.innerHTML = `
    <img class="w-full h-24 object-cover rounded-lg" src=${data.petData.image} alt="">
    `;

    picContainer.appendChild(picDiv);

};



// Default Loading
loadAllPets();
loadCategories();