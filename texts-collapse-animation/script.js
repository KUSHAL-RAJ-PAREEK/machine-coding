const logo = document.querySelector(".textsImg");

const imgs = document.querySelectorAll(".page2 img");
const pos = [-1.5,-1.1,-1,-0.7,-0.6,-0.1,0.2,0.7,1]
  imgs.forEach((img,i )=>{
console.log(img)
  })
window.addEventListener("scroll",()=>{
    const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollPercent = scrollTop / maxScroll;
  const moveUp = scrollPercent * -400; 

  logo.style.transform = `translate(-50%, calc(-50% + ${moveUp*1.05}px)) scale(${scrollPercent*1.4})`;
  imgs.forEach((img,i )=>{
img.style.transform = `translate(calc(-50% + ${moveUp*pos[i]}px), calc(-50% + ${-moveUp}px)) scale(${1.1 - scrollPercent}) rotate(${-1450-scrollPercent*300}deg)`;  
})
})