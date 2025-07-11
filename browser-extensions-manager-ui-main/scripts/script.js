const body = document.querySelector("body");
const nav = document.querySelector("nav");
const nav_box =document.querySelector(".nav_box");
const nav_box_img = document.querySelector(".nav_box img");
const extention_title = document.querySelector(".cont-header h2");
const toggle_btns = document.querySelectorAll(".toggle_btns button")
let cards = null;
const card_container = document.querySelector(".extension_cards");
let ActiveToggle = [true,false,false]
 let activeData = [];
 let card_data = [];
let light_mode = false;



(function loadData(){
    fetch("../data.json")
    .then(res => res.json())
    .then(data =>{
        card_data = data;
     card_data.forEach((d,i) =>{
        activeData.push(d.isActive)
          const div = document.createElement("div")
       div.classList.toggle("extension-card")
       div.innerHTML = `
        <div class="upper">
          <img src="${d.logo}" alt="">

          <div class="upper_inner">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        </div>

        <div class="lower">
          <button id = ${i}>Remove</button>
          <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
        </div>
      `
      card_container.appendChild(div)
            cards =  document.querySelectorAll(".extension-card");
             toggle(light_mode)

     })
    })
})()


function deleteLoad(){
 card_data.forEach((d,i) =>{
        activeData.push(d.isActive)
          const div = document.createElement("div")
       div.classList.toggle("extension-card")
       div.innerHTML = `
        <div class="upper">
          <img src="${d.logo}" alt="">

          <div class="upper_inner">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        </div>

        <div class="lower">
          <button id = ${i}>Remove</button>
          <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
        </div>
      `
      card_container.appendChild(div)
            cards =  document.querySelectorAll(".extension-card");
             toggle(light_mode)

     })
}

function isToogled(){
    if(ActiveToggle[0] == true){
        toggle_btns[0].style.backgroundColor = "hsl(3, 86%, 64%)"
    }else{
if(light_mode){
 toggle_btns[0].style.backgroundColor = "#fff"
}else{
 toggle_btns[0].style.backgroundColor = "hsl(225, 23%, 24%)"
}
    }

      if(ActiveToggle[1] == true){
        toggle_btns[1].style.backgroundColor = "hsl(3, 86%, 64%)"
    }else{
if(light_mode){
 toggle_btns[1].style.backgroundColor = "#fff"
}else{
 toggle_btns[1].style.backgroundColor = "hsl(225, 23%, 24%)"
}
    }

      if(ActiveToggle[2] == true){
        toggle_btns[2].style.backgroundColor = "hsl(3, 86%, 64%)"
    }else{
if(light_mode){
 toggle_btns[2].style.backgroundColor = "#fff"
}else{
 toggle_btns[2].style.backgroundColor = "hsl(225, 23%, 24%)"
}
    }
}

toggle_btns[0].addEventListener("click",()=>{
    ActiveToggle.fill(false);
   ActiveToggle[0] = true;
   isToogled()
    card_container.innerHTML = ''
     card_data.forEach(d =>{
        activeData.push(d.isActive)
          const div = document.createElement("div")
       div.classList.toggle("extension-card")
       div.innerHTML = `
        <div class="upper">
          <img src="${d.logo}" alt="">

          <div class="upper_inner">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        </div>

        <div class="lower">
          <button>Remove</button>
          <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
        </div>
      `
      card_container.appendChild(div)
            cards =  document.querySelectorAll(".extension-card");
            ToggleFix()
             toggle(light_mode)

     })
})



toggle_btns[1].addEventListener("click",()=>{
       ActiveToggle.fill(false);
   ActiveToggle[1] = true;
   isToogled()
    card_container.innerHTML = ''
     card_data.forEach(d =>{
        activeData.push(d.isActive)
if(d.isActive == true){
 const div = document.createElement("div")
       div.classList.toggle("extension-card")
       div.innerHTML = `
        <div class="upper">
          <img src="${d.logo}" alt="">

          <div class="upper_inner">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        </div>

        <div class="lower">
          <button>Remove</button>
          <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
        </div>
      `
      card_container.appendChild(div)
}
         
      cards =  document.querySelectorAll(".extension-card");
      ToggleFix()
       toggle(light_mode)
     })
   
})

toggle_btns[2].addEventListener("click",()=>{
       ActiveToggle.fill(false);
   ActiveToggle[2] = true;
   isToogled()
    card_container.innerHTML = ''
   
     card_data.forEach(d =>{
        activeData.push(d.isActive)
if(d.isActive == false){
 const div = document.createElement("div")
       div.classList.toggle("extension-card")
       div.innerHTML = `
        <div class="upper">
          <img src="${d.logo}" alt="">

          <div class="upper_inner">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        </div>

        <div class="lower">
          <button>Remove</button>
          <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
        </div>
      `
      card_container.appendChild(div)
}
         
      cards =  document.querySelectorAll(".extension-card");
      ToggleFix()
       toggle(light_mode)
     })
})

function ToggleFix(){
    body.classList.toggle("body-light",false);
nav.classList.toggle("nav-light",false);
nav_box.classList.toggle("nav-box-light",false);
extention_title.classList.toggle("extensions-cont-p-light",false);

cards.forEach((card,i) =>{
    const card_h3 =  cards[i].querySelector(".upper_inner h3",false);
    const remove_btn = cards[i].querySelector(".lower button",false);
   card_h3.classList.toggle("lightmode",false)
remove_btn.classList.toggle("light-mode",false);
    card.classList.toggle("card-light",false);
})
}

function toggle(flag){
    if(flag){
body.classList.toggle("body-light");
nav.classList.toggle("nav-light");
nav_box.classList.toggle("nav-box-light");
extention_title.classList.toggle("extensions-cont-p-light");

cards.forEach((card,i) =>{
    const card_h3 =  cards[i].querySelector(".upper_inner h3");
    const remove_btn = cards[i].querySelector(".lower button");
   card_h3.classList.toggle("lightmode")
remove_btn.classList.toggle("light-mode");
    card.classList.toggle("card-light");
})


toggle_btns.forEach(btn =>{
    btn.classList.toggle("toggle-btn-light");
})
nav_box_img.src = "../assets/images/icon-moon.svg"

    }else{
body.classList.toggle("body-light",false);
nav.classList.toggle("nav-light",false);
nav_box.classList.toggle("nav-box-light",false);
extention_title.classList.toggle("extensions-cont-p-light",false);

cards.forEach((card,i) =>{
    const card_h3 =  cards[i].querySelector(".upper_inner h3",false);
    const remove_btn = cards[i].querySelector(".lower button",false);
   card_h3.classList.toggle("lightmode",false)
remove_btn.classList.toggle("light-mode",false);
    card.classList.toggle("card-light",false);
})

toggle_btns.forEach(btn =>{
    btn.classList.toggle("toggle-btn-light",false);
})
nav_box_img.src = "../assets/images/icon-sun.svg"
    }
}


card_container.addEventListener("click",(e) =>{
    if(e.target.tagName == 'BUTTON'){
        card_data.splice(e.target.id,1)
         card_container.innerHTML = ''
        deleteLoad()
         ToggleFix()
    }
})

nav_box.addEventListener("click",()=>{
    light_mode = !light_mode;
    toggle(light_mode)
    isToogled()
})