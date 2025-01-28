document.addEventListener("DOMContentLoaded", () => {
  let my = new XMLHttpRequest();
  my.open("GET", "https://fakestoreapi.com/products", true);
  my.onreadystatechange = () => {
    let myReq = JSON.parse(my.responseText);
    changeDropdown(myReq);
  };
  my.send();
});

//for random index...........................................
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

function changeDropdown(myReq) {
  let categoryList = document.getElementById("category-list");
  let drowpdown = document.getElementById("dropdown-menu");
  let categorySet = new Set();
  for (let j = 0; j < myReq.length; j++) {
    categorySet.add(myReq[j].category);
  }
  ///// cateory list
  let categoryArray = Array.from(categorySet);
  drowpdown.innerHTML = categoryArray
    .map((cat) => `<li><a href="shop.html" class="my-page">${cat}</a></li>`)
    .join("");

  let catset = new Set();
  for (let j = 0; j < myReq.length; j++) {
    catset.add(myReq[j].category);
  }
  let val = "";
  let catArray = Array.from(catset);
  for (let i = 0; i < catArray.length; i++) {
    val += ` <li class="pb-3">
              <a
                class="collapsed d-flex justify-content-between h3 text-decoration-none "
                href="#"
              >
                ${catArray[i]}
                <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
              </a>
            </li>`;
  }
  categoryList.innerHTML = val;

  ///category body editing

  let catbody1 = document.getElementById("cat-body1");
  let catbody = randomIndex(myReq.length, myReq.length);

  // shop-single page working.......................
  let myPages = document.querySelectorAll(".my-page");
  myPages.forEach((myPage) => {
    myPage.addEventListener("click", (e) => {
      catbody1 = document.getElementById("cat-body1");
      catbody1.innerHTML = "";
      e.preventDefault();
      let vue = "";
      let mut = [];
      for (let i = 0; i < myReq.length; i++) {
        if (myReq[i].category == myPage.innerHTML) {
          vue += `<div class="col-md-4">
              <div class="card mb-4 product-wap rounded-0">
                <div class="card rounded-0">
                  <img
                    class="card-img rounded-0 img-fluid" id="body-img"
                    src="${myReq[i].image}"
                  />
                  <div
                    class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                  >
                    <ul class="list-unstyled">
                      <li>
                        <a
                          class="btn btn-success text-white"
                          href="shop-single.html"
                          ><i class="far fa-heart"></i
                        ></a>
                      </li>
                      <li>
                        <a
                          class="btn btn-success text-white mt-2"
                          href="shop-single.html"
                          ><i class="far fa-eye"></i
                        ></a>
                      </li>
                      <li>
                        <a
                          class="btn btn-success text-white mt-2"
                          href="shop-single.html"
                          ><i class="fas fa-cart-plus"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-body" id="prod-title">
                  <a href="shop-single.html" class="h3 text-decoration-none"
                    >${myReq[i].title}</a
                  >
                  <ul
                    class="w-100 list-unstyled d-flex justify-content-between mb-0"
                  >
                    <li id="prod-desc">${myReq[i].description}</li>
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
                       Math.floor(myReq[i].rating.rate)
                     )}
                     ${`<i class="text-muted fa fa-star"></i>`.repeat(
                       5 - Math.floor(myReq[i].rating.rate)
                     )}
                    </li>
                  </ul>
                  <p class="text-center mb-0">$${myReq[i].price}</p>
                </div></div>
              </div>`;
        }
        catbody1.innerHTML = vue;
      }
    });
  });

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
