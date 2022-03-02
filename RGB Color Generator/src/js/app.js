// aos activation
// below listed default settings

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

//globals
let div = null;

//onload handle 
window.onload = () =>{
    main();
}

//event handler 
function main(){
    const container = document.querySelector("#container");
    const btn = document.querySelector(".btn");
    const color = document.querySelector("#color");
    const copyBtn = document.querySelector("#copy-btn");

    btn.addEventListener("click", function(){
        let bgColor = generateRGBColor();
        container.style.backgroundColor = bgColor;
        color.value = bgColor;
    })
    copyBtn.addEventListener('click', function(){
        navigator.clipboard.writeText(color.value);
        if(div!== null){
            div.remove();
            div = null;
        }
        generateToastMessage(`${color.value} copied`);
    })
    
}

//necessary element creation 
function generateRGBColor(){
    const red = Math.floor(Math.random()*255);
    const green = Math.floor(Math.random()*255);
    const blue = Math.floor(Math.random()*255);

    return `rgb(${red},${green},${blue})`;
}

//generate toast message
function generateToastMessage(msg){
    div = document.createElement("div");
    div.innerText = msg;
    div.className = "toast-message toast-message-slide-in";

    //handle the animation in and out
    div.addEventListener("click",function(){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");

        div.addEventListener("animationend",function(){
            div.remove();
            div = null;
        })
    })

    document.body.appendChild(div);
}


