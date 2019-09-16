
//function to make the grid appear onclick
function changeGridToVisible() {
  document.querySelector('#overlay').setAttribute("style", "Visibility:visible");
}


//function to make the grid disppear onclick
function changeGridToHidden() {
  document.querySelector('#overlay').setAttribute("style", "Visibility:hidden");
}


//function to resize the div to crop image
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .handle')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  var resizeClass = document.querySelector(".resizers")
  var wid = resizeClass.offsetWidth;
  var width1 = wid / 2;
  var hie = resizeClass.offsetHeight;
  var height1 = hie / 2;
  var posTop = document.querySelector("#handle5");
  posTop.style.left = (width1 - 5) + 'px';

  var posleft = document.querySelector("#handle6");
  posleft.style.top = (height1 - 5) + 'px';

  var posBottom = document.querySelector("#handle7");
  posBottom.style.left = (width1 - 5) + 'px';

  var posRight = document.querySelector("#handle8");
  posRight.style.top = (height1 - 5) + 'px';

//loop to access each div of same class name
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function (e) {
      original_width = element.offsetWidth;
      original_height = element.offsetHeight;
      original_x = element.offsetLeft;
      original_y = element.offsetTop;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
      //bottom-right draggable div
      if (currentResizer.classList.contains('handle1')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      //bottom-left draggable div
      else if (currentResizer.classList.contains('handle2')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      //top-right draggable div
      else if (currentResizer.classList.contains('handle4')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      //top-left draggable div
      else if (currentResizer.classList.contains('handle3')) {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      //top draggable div
      else if (currentResizer.classList.contains('handle5')) {
        const height = original_height - (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      //left draggable div
      else if (currentResizer.classList.contains('handle6')) {
        const width = original_width - (e.pageX - original_mouse_x)

        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      //bottom draggable div
      else if (currentResizer.classList.contains('handle7')) {
        const height = original_height + (e.pageY - original_mouse_y)

        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      //right draggable div
      else if (currentResizer.classList.contains('handle8')) {
        const width = original_width + (e.pageX - original_mouse_x)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
      }
      repositionSideResizer();
    }

    //to reposition the draggable divs on sides
    function repositionSideResizer() {
      posTop.style.left = ((element.offsetWidth / 2) - 5) + 'px';

      posleft.style.top = ((element.offsetHeight / 2) - 5) + 'px';

      posBottom.style.left = ((element.offsetWidth / 2) - 5) + 'px';

      posRight.style.top = ((element.offsetHeight / 2) - 5) + 'px';
    }

    //removing the mouse event listeners
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}


//function to draw the cropped Image on canvas
function drawCroppedImage() {
  var imgdiv = document.getElementById('dogImg');
  var divClass = document.querySelector('.resizers');
  var canvasDiv = document.getElementById('canvas');
  canvasDiv.width = canvasDiv.scrollWidth;
  canvasDiv.height = canvasDiv.scrollHeight;
  var getValues = divClass.getBoundingClientRect();
  var ctx = canvasDiv.getContext('2d');
  var image = new Image();
  image.src = "./img1.jpg";
  //providing offsets from where the image should be taken
  image.onload = function () {
    ctx.drawImage(image, getValues.x - imgdiv.offsetLeft, getValues.y - imgdiv.offsetTop,
      divClass.offsetWidth, divClass.offsetHeight, 20, 20, divClass.offsetWidth, divClass.offsetHeight);
  }
}

//function to change the text of image after first click
function changeNameOnEvenClick() {
  var btnCrop = document.getElementById('imageCropBtn');
  btnCrop.innerHTML = "Resize and Click to see the cropped Image";
  btnCrop.style.marginLeft = "570px";
  btnCrop.style.boxShadow ="3px 3px #888888";
}

//function to change the text of image after first click
function changeNameOnOddClick() {
  var btnCropOdd = document.getElementById('imageCropBtn');
  btnCropOdd.innerHTML = "Crop";
  btnCropOdd.style.marginLeft = "665px";
  btnCropOdd.style.boxShadow = null;
}

//function which will be executed first onclick
var count = 0;
console.log("initial count" + count);
function checkClickCount() {
  var btn = document.getElementById('imageCropBtn');
  if (count === 0) {
    //debugger;
    console.log("entered even click part");
    btn.addEventListener("click", changeGridToVisible());
    btn.addEventListener("click", makeResizableDiv('.resizers'));
    btn.addEventListener("click", changeNameOnEvenClick());
    btn.addEventListener("click", dragElement(document.querySelector(".resizers")));
    count++;
  }
  else {
    console.log("entered odd click part");
    btn.addEventListener("click", drawCroppedImage());
    btn.addEventListener("click", changeNameOnOddClick());
    btn.addEventListener("click", changeGridToHidden());
    count = 0;
  }
}

//function to drag the div
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(".dragGrid")) {
    document.querySelector(".dragGrid").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // to calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // to set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // to stop the movement when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//removing event listeners
window.onunload = function () {
  debugger;
  btn.removeEventListener("click", changeGridToVisible(), true);
  btn.removeEventListener("click", makeResizableDiv('.resizers'), true);
  btn.removeEventListener("click", changeNameOnEvenClick(), true);
  btn.removeEventListener("click", dragElement(document.querySelector(".resizers"), true));
  btn.removeEventListener("click", drawCroppedImage(), true);
  btn.removeEventListener("click", changeNameOnOddClick(), true);
  btn.removeEventListener("click", changeGridToHidden(), true);
  window.removeEventListener('mousemove', resize, true);
  window.removeEventListener('mouseup', stopResize, true);
  currentResizer.removeEventListener('mousedown', (e), true);

}

