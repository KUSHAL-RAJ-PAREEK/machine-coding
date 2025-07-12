let cards = null;
const plane1 = document.querySelector(".phase-1");
const plane2 = document.querySelector(".phase-2");
const plane3 = document.querySelector(".phase-3");
const Add_button = document.querySelector("nav button");
const Add_card = document.querySelector(".add_card")
const Todo_add_btn = document.querySelector(".add_card button")
let card = null;
const cardArr1 = [];
const cardArr2 = [];
const cardArr3 = [];


let isDragging = false;
let offsetX, offsetY;

Add_button.addEventListener("click", () =>{
Add_card.style.display = "flex"
})

document.addEventListener("click", (e) => {
  if (!Add_card.contains(e.target) && !Add_button.contains(e.target)) {
    Add_card.style.display = "none";
  }
});

Todo_add_btn.addEventListener("click", ()=>{
const uniId = generateUUID();
const inp1 = document.querySelector(".add_card .tit");
const inp2 = document.querySelector(".add_card .des");
const t = inp1.value;
const d = inp2.value;
inp1.value = "";
inp2.value = "";

cardArr1.push({id:uniId,title:t,desc:d,progress:"To-Do"});
    Add_card.style.display = "none";
    loadCard("phase-1")

})

function loadCard(bestplane) {
    const div1 = document.createElement("div");
       const div2 = document.createElement("div");
     const div3 = document.createElement("div");
    div1.classList.toggle("card");
    div2.classList.toggle("card");
    div3.classList.toggle("card");
 
    if(bestplane == "phase-1"){
    cardArr1.forEach(({ id, title, desc, progress }) => {
        div1.id = id;
        div1.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `
    })
    }else if(bestplane == "phase-2"){
         cardArr2.forEach(({ id, title, desc, progress }) => {
        div2.id = id;
        div2.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `

    })
    }else if(bestplane == "phase-3"){
 cardArr3.forEach(({ id, title, desc, progress }) => {
        div3.id = id;

        div3.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `
    })
    }else{
        cardArr1.forEach(({ id, title, desc, progress }) => {
        div1.id = id;
        div1.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `
    })
    
          cardArr2.forEach(({ id, title, desc, progress }) => {
        div2.id = id;
        div2.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `

    })

     cardArr3.forEach(({ id, title, desc, progress }) => {
        div3.id = id;

        div3.innerHTML = `
            <p class="progress">${progress}</p>
            <p class="title">${title}</p>
            <p class="desc">${desc}</p>
        `
    })
    }

    if (div1.innerHTML != '') {
        plane1.appendChild(div1);

    }
    if (div2.innerHTML != '') {
        plane2.appendChild(div2);
    }
    if (div3.innerHTML != '') {
        plane3.appendChild(div3);
    }
    cards = document.querySelectorAll(".card");

    mainFun()
}



  
function mainFun(){
    cards.forEach((c) => {
    c.addEventListener("mousedown", (e) => {
        isDragging = true;
        c.style.position = 'absolute';
        card = c;
        offsetX = e.clientX - c.offsetLeft;
        offsetY = e.clientY - c.offsetTop;
    })

    c.addEventListener("mouseup", (e) => {
        const cardRect = card.getBoundingClientRect();

        const planRects = [
            { element: plane1, rect: plane1.getBoundingClientRect() },
            { element: plane2, rect: plane2.getBoundingClientRect() },
            { element: plane3, rect: plane3.getBoundingClientRect() }
        ]

        let maxOverlap = 0;
        let bestplane = null;

        planRects.forEach(({ element, rect }) => {
            const overlap = getOvelap(cardRect, rect);
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                bestplane = element;
            }
        })

        if (bestplane) {
            const plane = bestplane.classList.value;
            const progress = card.querySelector(".progress").innerHTML;
            const title = card.querySelector(".title").innerHTML;
            const desc = card.querySelector(".desc").innerHTML;
            const id = card.id;

            if (plane == "phase-1") {

                if (progress == "To-Do") {
                    const ind = cardArr1.findIndex(obj => obj.id === id);
                    cardArr1.splice(ind, 1)
                } else if (progress == "In Progress") {
                    const ind = cardArr2.findIndex(obj => obj.id === id);
                    cardArr2.splice(ind, 1)
                } else {
                    const ind = cardArr3.findIndex(obj => obj.id === id);
                    cardArr3.splice(ind, 1)
                }

                cardArr1.push({ id: id, title: title, desc: desc, progress: "To-Do" })

            } else if (plane == "phase-2") {
                if (progress == "To-Do") {
                    const ind = cardArr1.findIndex(obj => obj.id === id);
                    cardArr1.splice(ind, 1)
                } else if (progress == "In Progress") {
                    const ind = cardArr2.findIndex(obj => obj.id === id);
                    cardArr2.splice(ind, 1)
                } else {
                    const ind = cardArr3.findIndex(obj => obj.id === id);
                    cardArr3.splice(ind, 1)
                }

                cardArr2.push({ id: id, title: title, desc: desc, progress: "In Progress" })

            } else if (plane == "phase-3") {

                if (progress == "To-Do") {
                    const ind = cardArr1.findIndex(obj => obj.id === id);
                    cardArr1.splice(ind, 1)
                } else if (progress == "In Progress") {
                    const ind = cardArr2.findIndex(obj => obj.id === id);
                    cardArr2.splice(ind, 1)
                } else {
                    const ind = cardArr3.findIndex(obj => obj.id === id);
                    cardArr3.splice(ind, 1)
                }
                cardArr3.push({ id: id, title: title, desc: desc, progress: "Completed" })

            }
              loadCard(plane)

        }
      
        card.remove();
        isDragging = false
        card = null
    })
})

}
loadCard()

document.addEventListener("mousemove", (e) => {
    if (isDragging && card) {
        card.style.left = `${e.clientX - offsetX}px`
        card.style.top = `${e.clientY - offsetY}px`
    }
})


function generateUUID() {
    return crypto.randomUUID();
}



function getOvelap(rect1, rect2) {
    const x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    const y_overlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    return x_overlap * y_overlap;
}


