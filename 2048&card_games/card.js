var nav={
  func: function(){
    let mood_btn = document.getElementById("nav_set_3");
    let td_btn = document.getElementById("nav_set_2");
    let sound_btn = document.getElementById("nav_set_1");
    let body = document.querySelector("body");
    mood_btn.addEventListener("click",()=>{
      body.classList.toggle("light-mood");
      body.classList.toggle("dark-mood");
    });
    td_btn.addEventListener("click",()=>{
      body.classList.toggle("disable-3d-display");
      body.classList.toggle("able-3d-display");
    });
    sound_btn.addEventListener("click",()=>{
      sound_btn.classList.toggle("sound-disable");
    });
  },
  mood:function(){
    return getComputedStyle(document.body).getPropertyValue("--shadow--color")
  },
  angle:function(){
    return getComputedStyle(document.body).getPropertyValue("--hover--angle")
  }
}
nav.func();

function InitCardGame(index){
  let temp_innerHTML = `<div id="card_body_${index}" class="card-hover-body" onclick="flip(this);"><div id="card_container_${index}" class="card-contain card-ani-out"><div id="card_main_${index}" class="card-main"></div></div></div>`
  let div = document.createElement("div");
  div.innerHTML = temp_innerHTML;
  return div.childNodes[0];
}

let card_game_container = document.getElementById("card_game_container");
for(let i=0;i<10;i++){
  let element = InitCardGame(i);
  card_game_container.appendChild(element);
}

let CHB_arr = document.querySelectorAll("div.card-hover-body");
let card_contain_arr = document.querySelectorAll("div.card-contain");

CHB_arr.forEach((element,index) => {
  element.addEventListener("mousemove",e=>{
    let x_value=0,y_value=0;
    x_value=(e.offsetX/element.clientWidth);
    y_value=(e.offsetY/element.clientHeight);
    if(card_contain_arr[index].classList.contains("card-flip")==false){
      card_contain_arr[index].style = `transform: rotate3d(${0.5-y_value},${x_value-0.5},0,${nav.angle()}); box-shadow: ${nav.mood()} ${(0.5-x_value)*40}px ${(0.5-y_value)*40}px 3px;`;
    }
  })
  element.addEventListener("mouseover",()=>{
    card_contain_arr[index].classList.toggle("card-ani-in");
    card_contain_arr[index].classList.toggle("card-ani-out");
  })
  element.addEventListener("mouseleave",()=>{
    card_contain_arr[index].classList.toggle("card-ani-in");
    card_contain_arr[index].classList.toggle("card-ani-out");
    if(card_contain_arr[index].classList.contains("card-struggle")){
      card_contain_arr[index].classList.remove("card-struggle");
    }
  })
  element.addEventListener("mousedown",()=>{
    card_contain_arr[index].classList.add("card-struggle");
  })
  element.addEventListener("mouseup",()=>{
    card_contain_arr[index].classList.remove("card-struggle");
  })
  element.addEventListener("click",()=>{
    element.classList.toggle("card-flip");
    if(element.classList.contains("card-flip")==true){
      card_contain_arr[index].style = `transform: rotate3d(0,0,0,30deg); box-shadow: black 0px 0px 0px;`;
    }
  })
});