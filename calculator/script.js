const gridcontainer = document.querySelector(".gridcontainer");
const container = document.querySelector(".calculatorbody");
const input = document.querySelector(".calculatorbody input");
let enterButton = null;
let gridbutton = null;
let numbStr = "";
const keys = ["9","8","7","/","6","5","4","*","3","2","1","-",".","0","↵","+"];
let pressed = [];


(function GridFill(){
    keys.forEach((e) =>{
        const div = document.createElement("button");
        div.classList.toggle("gridbox");
        if(e === "↵"){
div.id = "enter"
        }else{
            div.id = e; 
        }
        div.style.setProperty("--before-content", `"${e}"`);
        gridcontainer.appendChild(div);
    })
    gridbutton = document.querySelectorAll(".gridbox");
    enterButton = document.querySelector("#enter");
})()

function Functionality(){
    if(gridbutton != null){
        let opsclick = false;
        gridbutton.forEach((e) =>{
            e.addEventListener("click",(c)=>{
                const id = c.target.id;
         
   if(id != "enter"){
    
    if(opsclick) {

 numbStr = ""; opsclick =false;
    
       
        };
numbStr+=id;
    if(notOps(id)){
        input.value = numbStr
    }else{
        numbStr = "";
        numbStr += id;
        input.value = numbStr
        opsclick = true;
    }

    if(notOps(pressed[pressed.length-1])){
        pressed.push(id);
    }else{
    if(notOps(id)){
        pressed.push(id);

    }else{
   pressed[pressed.length-1] = id;        
    }
    }
   }
            })
        })
    }
}


function notOps(props){
    if(props == "+" || props == "-" || props =="/" || props =="*"){
        return false;
    }
    return true;
}

enterButton.addEventListener('click',()=>{
let num1 = "";
console.log(pressed)
    pressed.forEach((n) =>{
        num1 += n;
    })
    pressed = [];


   const res = Number(calculate(num1).toFixed(5));
numbStr= "";
if(res.length >= 30){
  input.value = "Too Long"
}
   else if(isNaN(res)){
    input.value = "Invalid Inputs"
   }else{
   input.value = res;
   }
})

function calculate(expr) {
  const tokens = expr.match(/\d+\.?\d*|[+\-*/]/g); 

  let stack = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === '*' || token === '/') {
      const prev = parseFloat(stack.pop());
      const next = parseFloat(tokens[i + 1]);
      const result = token === '*' ? prev * next : prev / next;
      stack.push(result.toString());
      i += 2;
    } else {
      stack.push(token);
      i++;
    }
  }

  let result = parseFloat(stack[0]);
  for (let j = 1; j < stack.length; j += 2) {
    const op = stack[j];
    const num = parseFloat(stack[j + 1]);
    if (op === '+') result += num;
    else if (op === '-') result -= num;
  }

  return result;
}

Functionality()


