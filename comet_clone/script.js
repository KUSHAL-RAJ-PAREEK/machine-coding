const comet_icon = document.querySelector(".comet_cover svg");
const all_img = document.querySelector(".all_img");
const allImg = document.querySelector('.all_img');
const depth_cover = document.querySelector(".depth_cover")
const main_text  = document.querySelectorAll(".main_text span");
const body = document.querySelector("body");

const text_container = document.querySelectorAll(".main_text span");

let value = 1;
function zoomHandler(e){


    e.preventDefault();

    value += e.deltaY * 0.001;

    value = Math.min(2, Math.max(1, value));

    allImg.style.transform = `scale(${value})`;
}
function scrolled(e) {
 
  if (allImg.offsetHeight + allImg.scrollTop >= allImg.scrollHeight) {
    window.addEventListener("wheel", zoomHandler,{passive :false})
  }

  
}


allImg.addEventListener('scroll', () => {

scrolled()
if(allImg.scrollTop > 280){
    text_container.forEach((e) =>{
        e.style.color = "#fff"
    })
}else{
       text_container.forEach((e) =>{
        e.style.color = "#000"
    })
}

    if (allImg.scrollTop > 30) {
        const paths = comet_icon.querySelectorAll("path");
        depth_cover.style.opacity = 1;
        depth_cover.style.animation = "down-top 0.4s linear";
        const size = paths.length;
        for (let i = size - 1; i > 0; i--) {
            setTimeout(() => {
                paths[i].style.opacity = 0
            }, i * 100);
        }
    } else {
        depth_cover.style.animation = "top-down 0.4s linear";
        depth_cover.style.opacity = 0;
        const paths = comet_icon.querySelectorAll("path");
        paths.forEach((e, i) => {
            if (i != 0) {
                setTimeout(() => {
                    e.style.opacity = 1;
                }, i * 100);
            }
        })
    }
});




let targetX = 0, currentX = 0, velocity = 0;
const SPRING = 0.17;   
const DAMPING = 0.52;   

const SPREAD = 110;

const POWER = 2.8;

window.addEventListener("mousemove", e => targetX = e.clientX);

function animate() {
  let force = (targetX - currentX) * SPRING;
  velocity = (velocity + force) * DAMPING;
  currentX += velocity;

  updateWave(currentX);

  requestAnimationFrame(animate);
}

function updateWave(mouseX) {
  main_text.forEach((span, i) => {
    const rect = span.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);

    const local = Math.max(0, 1 - Math.pow(dist / SPREAD, POWER));
    const weight = 100 + local * 800;
    span.style.fontVariationSettings = `"wght" ${weight.toFixed(2)}`;
    span.style.fontWeight = weight.toFixed(0);

    span.style.transform = `scale(${1 + 0.2 * local})`;
    span.style.opacity = 0.7 + 0.3 * local;
    span.style.textShadow = `0 2px ${2 + local * 16}px rgba(0,0,0,${0.08 + 0.16 * local})`;
  });
}

animate();





