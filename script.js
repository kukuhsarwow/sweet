let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Untuk Mouse (PC)
    document.addEventListener("mousemove", (e) => this.move(e, paper));
    paper.addEventListener("mousedown", (e) => this.start(e, paper));
    window.addEventListener("mouseup", () => this.end());

    // Untuk Touch (HP)
    document.addEventListener("touchmove", (e) => this.move(e, paper), { passive: false });
    paper.addEventListener("touchstart", (e) => this.start(e, paper));
    window.addEventListener("touchend", () => this.end());
  }

  start(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;

    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    this.mouseTouchX = clientX;
    this.mouseTouchY = clientY;
    this.prevMouseX = clientX;
    this.prevMouseY = clientY;
  }

  move(e, paper) {
    if (!this.holdingPaper) return;

    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Mencegah scroll saat drag di HP
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    this.mouseX = clientX;
    this.mouseY = clientY;
    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  }

  end() {
    this.holdingPaper = false;
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
  
    // Buat tombol Play/Pause
    const button = document.createElement("button");
    button.innerText = "🔊 Play Music";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.background = "red";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "10px";
    button.style.cursor = "pointer";
    
    document.body.appendChild(button);
  
    button.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        button.innerText = "🔇 Pause Music";
      } else {
        audio.pause();
        button.innerText = "🔊 Play Music";
      }
    });
  });
  