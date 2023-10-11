// type Rating = {
//   count: number;
//   rate: number;
// };
// Global variables
var displayedPeople = [];
//Utils
function drawTable(people) {
    // Prepare table HTML
    var tableHTML = '<thead><tr><th>name</th><th><button type="button" class="btn btn-link" onclick=sortPeople("birth_year")>BOD</button> </th><th>Gender</th><th>Price</th></tr></thead><tbody>';
    //Loop thru all products to generate rows of the table
    people.forEach(function (p) {
        tableHTML += "<tr><td>".concat(p.name, "</td><td>").concat(p.birth_year, "</td><td>").concat(p.gender, "</td><td>").concat(p.url, "</td></tr>");
    }); //Le paso las personas y pr cada persona dibuja una row e incrustalo en la tabla
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement').innerHTML = tableHTML;
}
//Handlers
function paginatePeople(page) {
    fetch("https://swapi.dev/api/people/=page=%{page}")
        // const paginatedProducts: Product[] = allProducts.slice(page * itemsPerPage, (page+1)*5 ); //Del 0 al 5, del 5 al 10, del 10 al 20...
        .then(function (res) { return res.json(); })
        .then(function (data) {
        displayedPeople = data.results;
        drawTable(data.results);
    });
}
function filterPeople(value) {
    var fileteredPeople = displayedPeople.filter(function (p) { return p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.birth_year.toLowerCase().includes(value.toLowerCase()) ||
        p.url.toLowerCase().includes(value.toLowerCase()) ||
        p.gender.toLowerCase().includes(value.toLowerCase()); });
}
fetch('https://swapi.dev/api/people')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    displayedPeople = data.results;
    //We invoke the draw table
    drawTable(data.results);
    var pages = Math.ceil(data.count / 10); //redondeo la antidad de paginas con el contador
    var paginationElement = document.querySelector('#paginationElement');
    var pagesHTML = '';
    for (var index = 1; index <= pages; index++) {
        pagesHTML += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\"".concat(index, " onclick=\"paginatePeople\"").concat(index, "</a></li>");
    }
    // Hide spinner
    var spinnerElement = document.querySelector('#spinnerContainer');
    spinnerElement.style.display = 'none';
});
