window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products", true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let info = JSON.parse(xhr.responseText);
      displayCategory(info);
    }
  };
  xhr.send();
};

function randomIndex(count, len) {
  var randomArray = [];
  while (randomArray.length < count) {
    let random = Math.floor(Math.random() * len);
    if (!randomArray.includes(random)) {
      randomArray.push(random);
    }
  }
  return randomArray;
}

function displayCategory(info) {
  // for category class only and only
  let category = document.getElementById("categories-feature");
  let categorySet = new Set();
  let result = "";
  for (let i = 0; i < info.length; i++) {
    categorySet.add(info[i].category);
  }
  let imageArrray = [
    "./assets/img/mensclothing.jpg",
    "./assets/img/jwelery.jpg",
    "./assets/img/electronics.jpg",
    "./assets/img/womensclothing.jpg",
  ];
  let categoryArray = Array.from(categorySet);
  var randomIn = randomIndex(3, categoryArray.length);
  for (let i = 0; i < randomIn.length; i++) {
    result += `<div class="col-12 col-md-4 p-5 mt-3">
                     <a href="shop.html?index=${i}">

                       <img
                         src="${imageArrray[randomIn[i]]}"
                         class="rounded-circle img-fluid border"
                     /></a>
                     <h2 class="h5 text-center mt-3 mb-3 text-capitalize">${
                       categoryArray[randomIn[i]]
                     }</h2>
                     <p class="text-center"><a href="shop.html?index=${i}" class="btn btn-success">Go Shop</a></p>
                   </div>`;
  }
  category.innerHTML = result;

  // for feature class
  let featureProduct = document.getElementById("feature-product");
  let r = randomIndex(3, info.length);
  let value = "";
  for (let i = 0; i < r.length; i++) {
    value += `<div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <a href="shop-single.html?product=${info[r[i]].id}">

                <img
                  src="${info[r[i]].image}" class="feature-image"
                  alt="..."
                />
              </a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li>
                    ${' <i class="text-warning fa fa-star"></i>'.repeat(
                      Math.floor(info[r[i]].rating.rate)
                    )}
                   ${`<i class="text-muted fa fa-star"></i>`.repeat(
                     5 - Math.floor(info[r[i]].rating.rate)
                   )}
                  </li>
                  <li class="text-muted text-right">$${info[r[i]].price}</li>
                </ul>
                <a
                  href="shop-single.html?product=${info[r[i]].id}"
                  class="h2 text-decoration-none text-dark" id="product-title"
                  >${info[r[i]].title}</a
                >
                <p class="card-text" id="descript">
                  ${info[r[i]].description}
                </p>
                <p class="text-muted">Reviews (${info[r[i]].rating.count})</p>
              </div>
            </div>
          </div>`;
  }

  //for drowpdown
  featureProduct.innerHTML = value;
  let drowpdown = document.getElementById("dropdown-menu");
  drowpdown.innerHTML = categoryArray
    .map(
      (cat, index) =>
        `<li class="text-capitalize"><a href="shop.html?index=${index}">${cat}</a></li>`
    )
    .join("");

  // for banner item only
  let bannerItem = document.getElementById("banner-item");
  let rest = "";
  let rx = randomIndex(3, info.length);
  for (let i = 0; i < 3; i++) {
    var activeClass = i === 0 ? "active" : "";
    rest += `<div class="carousel-item ${activeClass}">
              <div class="container">
              <div class="row p-5"> 
              <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img
                  class="img-fluid" id="banner-image"
                  src="${info[rx[i]].image}"
                  alt=""
                />
              </div>
              <div class="col-lg-6 mb-0 d-flex align-items-center">
                <div class="text-align-left align-self-center">
                  <h1 class="h1 text-success"><b>Mynt</b> eCommerce</h1>
                <a href="shop-single.html?product=${
                  info[rx[i]].id
                }" class="h2 text-decoration-none text-dark text-capitalize">  <h3 class="h2">${
      info[rx[i]].title
    }</h3> </a>
                  <p>
                    ${info[rx[i]].description}
                  </p>
                  </div>
                </div>
                </div>
                </div>
              </div>`;
  }
  // console.log(rx);
  bannerItem.innerHTML = rest;
  let myPages = document.querySelectorAll(".my-page");
  let inputModalSearch = document.getElementById("inputModalSearch");
  let inputButton = inputModalSearch.nextElementSibling;
  inputButton.addEventListener("click", function (event) {
    event.preventDefault();
    let a = [];
    for (let i = 0; i < info.length; i++) {
      if (
        info[i].title
          .toLowerCase()
          .search(inputModalSearch.value.toLowerCase()) != -1 ||
        info[i].description
          .toLowerCase()
          .search(inputModalSearch.value.toLowerCase()) != -1 ||
        info[i].category
          .toLowerCase()
          .search(inputModalSearch.value.toLowerCase()) != -1
      ) {
        a.push(info[i].id);
      }
    }
    window.location.href = `shop-search.html?indexes=${a.toString()}`;
  });
}
