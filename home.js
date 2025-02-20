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