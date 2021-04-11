//  https://hexschool-tutorial.herokuapp.com/api/signup
// https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json



const list = document.querySelector(".ticketCard-area");

const name = document.querySelector("#ticketName");
const imgUrl = document.querySelector("#ticketImgUrl");
const area = document.querySelector("#ticketRegion");
const price = document.querySelector("#ticketPrice");
const group = document.querySelector("#ticketNum");
const rate = document.querySelector("#ticketRate");
const description = document.querySelector("#ticketDescription");

const addBtn = document.querySelector(".addTicket-btn");

const form = document.querySelector(".addTicket-form");

const regionSearch = document.querySelector(".regionSearch");

const searchResult = document.querySelector("#searchResult-text");

let data = [];

//初始化
function init() {
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
        .then(function (response) {
        console.log(response);
        data = response.data;
        addStr();
        console.log(data);
    })
        .catch(function (error) {
        console.log(error);
    })
}

//用 Axios 將資料撈出來後顯示出來
function addStr(){
    let str = "";
    data.forEach(function(item){
        str += `<li class="ticketCard">
        <div class="ticketCard-img">
            <a href="#">
                <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
            <div>
                <h3>
                    <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                ${item.description}
                </p>
            </div>
            <div class="ticketCard-info">
                <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">${item.price}</span>
                </p>
            </div>
        </div>
    </li>`;
    })
    list.innerHTML = str;
}

//將資料傳到 Data 裡面，增加卡片
addBtn.addEventListener("click", addData);
function addData(){
    data.push({
        "id": Date.now(),
        "name": name.value,
        "imgUrl": imgUrl.value,
        "area": area.value,
        "description": description.value,
        "group": Number(group.value),
        "price": Number(price.value),
        "rate": Number(rate.value),
    })
    console.log(data);
    addStr();
}

//地區改變的時候，觸發 Render 涵式
regionSearch.addEventListener("change", function(){
    // console.log(regionSearch.value);
    render(regionSearch.value);
})


//過濾 Data ，並顯示畫面
function render(location) {
    let str = "";
    let newData = data.filter(function(item){
        if(location === item.area){
            return item
        }
        if(!location){
            return item
        }
    })
    console.log(newData);
    

    let searchResultNum = `本次搜尋共有${newData.length}筆資料`;
    console.log(newData.length);


    newData.forEach(function(item){
        str += `<li class="ticketCard">
                    <div class="ticketCard-img">
                        <a href="#">
                            <img src="${item.imgUrl}" alt="">
                        </a>
                        <div class="ticketCard-region">${item.area}</div>
                        <div class="ticketCard-rank">${item.rate}</div>
                    </div>
                    <div class="ticketCard-content">
                        <div>
                            <h3>
                                <a href="#" class="ticketCard-name">${item.name}</a>
                            </h3>
                            <p class="ticketCard-description">
                            ${item.description}
                            </p>
                        </div>
                        <div class="ticketCard-info">
                            <p class="ticketCard-num">
                                <span><i class="fas fa-exclamation-circle"></i></span>
                                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                                </p>
                                <p class="ticketCard-price">
                                TWD <span id="ticketCard-price">${item.price}</span>
                            </p>
                        </div>
                    </div>
            </li>`;
    });

    searchResult.innerHTML = searchResultNum;
    list.innerHTML = str;

}

//初始化
init();


// c3.js start
function renderList() {
    let str = "";
    data.forEach(function(item){
        console.log(item)
    })
}

renderList();