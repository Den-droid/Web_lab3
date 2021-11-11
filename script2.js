load_photos();

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function load_photos() {
  let slider = document.getElementsByClassName("slideshow-container")[0];

  readTextFile("data.json", function (text) {
    if (text.length === 0) {
      let errorMessage = document.createElement("h3");
      errorMessage.id = "error";
      errorMessage.textContent = "Choose at least one photo!!!";
      errorMessage.style.color = "darkred";
      slider.appendChild(errorMessage);
    } else {
      let data = JSON.parse(text);
      data.sort(function (a, b) {
        let keyA = parseInt(a["order"]);
        let keyB = parseInt(b["order"]);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      for (let i = 0; i < data.length; i++) {
        let slide = document.createElement("div");
        slide.classList.add("mySlides");
        slide.classList.add("fade");

        let numbertext = document.createElement("div");
        numbertext.classList.add("numbertext");

        let image = document.createElement("img");
        image.style.width = "100%";

        let caption = document.createElement("div");
        caption.classList.add("text");

        let dot = document.createElement("span");
        dot.classList.add("dot");

        numbertext.textContent = `${i + 1} / ${data.length}`;
        image.src = data[i]["filepath"];
        caption.textContent = data[i]["caption"];
        dot.setAttribute("onclick", `currentSlide(${i + 1})`);
        dotdiv.appendChild(dot);
        slide.appendChild(numbertext);
        slide.appendChild(image);
        slide.appendChild(caption);
        slider.appendChild(slide);
      }

      let a1 = document.createElement("a");
      a1.classList.add("prev");
      a1.innerHTML = "&#10094;";
      a1.setAttribute("onclick", "plusSlides(-1)");

      let a2 = document.createElement("a");
      a2.classList.add("next");
      a2.innerHTML = "&#10095;";
      a2.setAttribute("onclick", "plusSlides(1)");

      slider.appendChild(a1);
      slider.appendChild(a2);

      showSlides(1);
    }
  });
}

let slideIndex = 1;
// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
