window.onload = () => {
  let xr = new XMLHttpRequest();
  xr.open("GET", "https://fakestoreapi.com/products", true);
  xr.onreadystatechange = () => {
    if (xr.readyState === 4 && xr.status == 200) {
      let myReq = JSON.parse(xr.responseText);
      displayCategory(myReq);
    }
  };
  xr.send();
};

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("product") - 1;

function displayCategory(myReq) {
  let mainImage = document.getElementById("main-image");
  mainImage.innerHTML = `<img
                class="card-img img-fluid"
                src="${myReq[id].image}"
                alt="Card image cap"
                id="product-detail"
              />`;

  let categoryList = document.getElementById("category-list");
  let drowpdown = document.getElementById("dropdown-menu");
  let categorySet = new Set();
  for (let j = 0; j < myReq.length; j++) {
    categorySet.add(myReq[j].category);
  }
  ///// cateory list
  let categoryArray = Array.from(categorySet);
  drowpdown.innerHTML = categoryArray
    .map(
      (cat, index) =>
        `<li><a href="shop.html?index=${index}" class="my-page">${cat}</a></li>`
    )
    .join("");

  let mainImageDetails = document.getElementsByClassName("main-image-detail");

  for (var j in mainImageDetails) {
    let mainImageDetail = mainImageDetails[j];
    let det = "";
    for (let i = 0; i < 3; i++) {
      det += `<div class="col-4">
                        <a href="#">
                          <img
                            class="card-img img-fluid"
                            src="${myReq[id].image}"
                            alt="Product Image ${i + 1}"
                          />
                        </a>
                      </div>`;
    }
    mainImageDetail.innerHTML = det;
  }

  // detail

  let mainProductdetail = document.getElementById("main-product-detail");
  mainProductdetail.innerHTML = ` <div class="card-body">
                <h1 class="h2">${myReq[id].title}</h1>
                <p class="h3 py-2">$${myReq[id].price}</p>
                <p class="py-2">
                   ${' <i class="text-warning fa fa-star"></i>'.repeat(
                     Math.floor(myReq[id].rating.rate)
                   )}
                     ${`<i class="text-muted fa fa-star"></i>`.repeat(
                       5 - Math.floor(myReq[id].rating.rate)
                     )}
                  <span class="list-inline-item text-dark"
                    >Rating ${myReq[id].rating.rate} | ${
    myReq[id].rating.count
  } Comments</span>
                </p>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <h6>Brand:</h6>
                  </li>
                  <li class="list-inline-item">
                    <p class="text-muted"><strong>Easy Wear</strong></p>
                  </li>
                </ul>

                <h6>Description:</h6>
                <p>
                  ${myReq[id].description}
                </p>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <h6>Avaliable Color :</h6>
                  </li>
                  <li class="list-inline-item">
                    <p class="text-muted"><strong>White / Black</strong></p>
                  </li>
                </ul>
                <form action="" method="GET">
                  <input
                    type="hidden"
                    name="product-title"
                    value="${myReq[id].id}"
                  />
                  <div class="row">
                    <div class="col-auto">
                      <ul class="list-inline pb-3">
                        <li class="list-inline-item">
                          Size :
                          <input
                            type="hidden"
                            name="product-size"
                            id="product-size"
                            value="S"
                          />
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success btn-size">S</span>
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success btn-size">M</span>
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success btn-size">L</span>
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success btn-size">XL</span>
                        </li>
                      </ul>
                    </div>
                    <div class="col-auto">
                      <ul class="list-inline pb-3">
                        <li class="list-inline-item text-right">
                          Quantity
                          <input
                            type="hidden"
                            name="product-quanity"
                            id="product-quanity"
                            value="1"
                          />
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success" id="btn-minus">-</span>
                        </li>
                        <li class="list-inline-item">
                          <span class="badge bg-secondary" id="var-value"
                            >1</span
                          >
                        </li>
                        <li class="list-inline-item">
                          <span class="btn btn-success" id="btn-plus">+</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row pb-3">
                    <div class="col d-grid">
                      <button
                        type="submit"
                        class="btn btn-success btn-lg"
                        name="submit"
                        value="buy"
                      >
                        Buy
                      </button>
                    </div>
                    <div class="col d-grid">
                      <button
                        type="submit"
                        class="btn btn-success btn-lg"
                        name="submit"
                        value="addtocard"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </form>
              </div>`;

  //releted items.....

  let suggestion = document.querySelector(".suggestion");
  let c = [];
  for (i = 0; i < myReq.length; i++) {
    if (myReq[i].category == myReq[id].category && i !== id) {
      c.push(i);
    }
  }
  for (let i = 0; i < c.length; i++) {
    suggestion.innerHTML += `
    <div class="p-2 pb-3">
      <div class="product-wap card rounded-0">
        <div class="card rounded-0">
          <img
            class="card-img rounded-0 img-fluid suggestion-img"
            src="${myReq[c[i]].image}"
          />
          <div
            class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
          >
            <ul class="list-unstyled">
              <li>
                <a
                  class="btn btn-success text-white"
                  href="shop-single.html?product=${myReq[c[i]].id}"
                  ><i class="far fa-heart"></i
                ></a>
              </li>
              <li>
                <a
                  class="btn btn-success text-white mt-2"
                  href="shop-single.html?product=${myReq[c[i]].id}"
                  ><i class="far fa-eye"></i
                ></a>
              </li>
              <li>
                <a
                  class="btn btn-success text-white mt-2"
                  href="shop-single.html?product=${myReq[c[i]].id}"
                  ><i class="fas fa-cart-plus"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-body">
          <a href="shop-single.html?product=${
            myReq[c[i]].id
          }" class="h3 text-decoration-none"
            >${myReq[c[i]].title}</a
          >
          <ul
            class="w-100 list-unstyled d-flex justify-content-between mb-0"
          >
            <li class="pt-2">
              <span
                class="product-color-dot color-dot-red float-left rounded-circle ml-1"
              ></span>
              <span
                class="product-color-dot color-dot-blue float-left rounded-circle ml-1"
              ></span>
              <span
                class="product-color-dot color-dot-black float-left rounded-circle ml-1"
              ></span>
              <span
                class="product-color-dot color-dot-light float-left rounded-circle ml-1"
              ></span>
              <span
                class="product-color-dot color-dot-green float-left rounded-circle ml-1"
              ></span>
            </li>
          </ul>
          <ul class="list-unstyled d-flex justify-content-center mb-1">
            <li>
              ${' <i class="text-warning fa fa-star"></i>'.repeat(
                Math.floor(myReq[c[i]].rating.rate)
              )}
              ${`<i class="text-muted fa fa-star"></i>`.repeat(
                5 - Math.floor(myReq[c[i]].rating.rate)
              )}
            </li>
          </ul>
          <p class="text-center mb-0">$${myReq[c[i]].price}</p>
        </div>
      </div>
    </div>
  `;
  }
  let inputModalSearch = document.getElementById("inputModalSearch");
  let inputButton = inputModalSearch.nextElementSibling;
  inputButton.addEventListener("click", function (event) {
    event.preventDefault();
    let a = [];
    for (let i = 0; i < myReq.length; i++) {
      if (myReq[i].category.search(inputModalSearch.value) != -1) {
        window.location.href = `shop.html?index=${categoryArray.indexOf(
          myReq[i].category
        )}`;
      } else if (
        myReq[i].title.search(inputModalSearch.value) != -1 ||
        myReq[i].description.search(inputModalSearch.value) != -1
      ) {
        a.push(myReq[i]);
        window.location.href = `shop-single.html?product=${myReq[i].id}`;
      }
    }
    // window.location.href = `shop.html?a=${a}`;
  });
}
