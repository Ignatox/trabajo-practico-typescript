

type Person = {

    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: [],
    vehicles: string[],
    starships: string[],
    created: Date,
    edited: Date,
    url: string
}
type ServerResponse = {
  count: number;
  results: Person[];
};

// Global variables
let displayedPeople: Person[] = [];
let sortBy: any = {};




//Utils
function drawTable(people: Person[]){
   // Prepare table HTML
   let tableHTML: string = '<thead><tr><th>name</th><th><button type="button" class="btn btn-link" onclick=sortPeople("birth_year")>BOD</button> </th><th>Gender</th><th>Price</th></tr></thead><tbody>';
   //Loop thru all products to generate rows of the table
   people.forEach((p: Person) => {
     tableHTML += `<tr><td>${p.name}</td><td>${p.birth_year}</td><td>${p.gender}</td><td>${p.url}</td></tr>`;
   }); //Le paso las personas y pr cada persona dibuja una row e incrustalo en la tabla
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement')!.innerHTML = tableHTML;
}

//Handlers

function paginatePeople(page: number){
  fetch(`https://swapi.dev/api/people/=page=%{page}`)
    // const paginatedProducts: Product[] = allProducts.slice(page * itemsPerPage, (page+1)*5 ); //Del 0 al 5, del 5 al 10, del 10 al 20...
    .then(res=> res.json())
    .then((data:ServerResponse) =>{
      displayedPeople = data.results; 
      drawTable(data.results);
    });

}
function filterPeople(value: string){
  const filteredPeople = displayedPeople.filter((p: Person) => p.name.toLowerCase().includes(value.toLowerCase()) ||
  p.birth_year.toLowerCase().includes(value.toLowerCase()) ||
  p.url.toLowerCase().includes(value.toLowerCase()) ||
  p.gender.toLowerCase().includes(value.toLowerCase())
  );

drawTable(filteredPeople);
}
function sortPeople(prop: string){
  if (sortBy[prop]) {
      if(sortBy[prop] === 'asc'){
        sortBy[prop] = 'desc';
      } else if(sortBy[prop] === 'desc'){
        sortBy[prop] = null;
      }
  } else {
    sortBy = {[prop]:  'asc' }

    const sortedPeople = displayedPeople.toSorted((a:Person, b: Person)=> 
     if (sortBy[prop] === 'asc'){
      return a[prop] > b[prop] ? 1 :a[prop] < b[prop] ? -1 : 0 ;

    } else if (sortBy[prop] === 'desc'){
      return a[prop] < b[prop] ? 1 :a[prop] > b[prop] ? -1 : 0 ;

    } else {
      return displayedPeople;
    }
    );
  
}
}


fetch('https://swapi.dev/api/people')
  .then(res => res.json())
  .then((data:ServerResponse) => {

    displayedPeople = data.results;
   
   //We invoke the draw table
   drawTable(data.results);
    const pages = Math.ceil(data.count / 10); //redondeo la antidad de paginas con el contador
    const paginationElement = document.querySelector('#paginationElement');
    let pagesHTML = '';

    for (let index = 1; index <= pages; index++) {
    
      pagesHTML += `<li class="page-item"><a class="page-link" href="#"${index} onclick="paginatePeople"${index}</a></li>`
      
    }

    // Hide spinner
    const spinnerElement: HTMLElement = document.querySelector('#spinnerContainer')!;
    spinnerElement.style.display = 'none';
  });