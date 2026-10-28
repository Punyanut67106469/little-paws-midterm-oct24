// สร้าง SVG จาก data-lucide ใน HTML
lucide.createIcons();

// ใช้ความสูงหน้าจอเป็น px เพื่อให้หน้าเปิดเต็มจอบนมือถือ
function updateScreenHeight() {
  document.documentElement.style.setProperty("--screen-height",
    window.innerHeight + "px");
}
updateScreenHeight();
window.addEventListener("resize", updateScreenHeight);
if (document.querySelector("#board-viewport")) {
  /* ภาพชุดที่สอง */
}
/* ภาพชุดที่สอง */
const viewport = document.querySelector("#board-viewport");
const track = document.querySelector(".collage-board");
const group = document.querySelector(".collection-group");
const copy = group.cloneNode(true);
copy.setAttribute("aria-hidden", "true");
copy.querySelectorAll("a").forEach(function (link) {
  link.tabIndex = -1;
});
track.appendChild(copy);

/* ตำแหน่งและสถานะ */
/* ตำแหน่งและสถานะ */
let offset = 0;
let paused = false;
let dragging = false;
let moved = false;
let hovered = false;
let reading = false;
let startX = 0;
let startOffset = 0;
let lastTime = 0;
let speed = 28;

/* แสดงตำแหน่งภาพ */
/* แสดงตำแหน่งภาพ */
function render() {
  const width = group.offsetWidth;
  offset = ((offset % width) + width) % width;
  track.style.transform = "translateX(-" + offset + "px)";
}

/* เลื่อนภาพอัตโนมัติ */
/* เลื่อนภาพอัตโนมัติ */
function animate(time) {
  if (viewport.scrollLeft) {
    offset += viewport.scrollLeft;
    viewport.scrollLeft = 0;
    render();
  }
  const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
  lastTime = time;
  const keyboardReading = viewport.querySelector(":focus-visible");
  const stopped = paused || dragging || document.hidden || keyboardReading;
  const targetSpeed = reading || keyboardReading ? 0 : hovered ? 4 : 28;
  speed += (targetSpeed - speed) * Math.min(elapsed / 180, 1);
  if (!stopped) {
    offset += (elapsed * speed) / 1000;
    render();
  }
  requestAnimationFrame(animate);
}

/* เริ่มการเลื่อน */
/* เริ่มการเลื่อน */
window.addEventListener("resize", render);
render();
requestAnimationFrame(animate);

/* ปุ่ม Pause */
/* ปุ่ม Pause */
const pauseButton = document.querySelector("#board-pause");
pauseButton.addEventListener("click", function () {
  paused = !paused;
  pauseButton.setAttribute("aria-pressed", paused);
  pauseButton.setAttribute(
    "aria-label", paused ? "เริ่มการเลื่อน" : "หยุดการเลื่อน",
  );
  pauseButton.querySelector("span").textContent = paused ? "Play" : "Pause";
  pauseButton.querySelector(".icon").outerHTML =
    '<i class="icon" data-lucide="' + (paused ? "play" : "pause") +
    '" aria-hidden="true"></i>';
  lucide.createIcons();
});

/* ปุ่ม Previous และ Next */
/* ปุ่ม Previous และ Next */
["prev", "next"].forEach(function (direction) {
  document.querySelector("#board-" + direction)
    .addEventListener("click", function () {
      const step = Math.round((viewport.clientWidth * 3) / 5);
      offset += direction === "next" ? step : -step;
      render();
    });
});

/* ป้องกันการลากของเบราว์เซอร์ */
/* ป้องกันการลากของเบราว์เซอร์ */
viewport.addEventListener("dragstart", function (event) {
  event.preventDefault();
});

/* เริ่มกดและปล่อยภาพ */
/* เริ่มกดและปล่อยภาพ */
viewport.addEventListener("pointerdown", function (event) {
  if (event.button > 0) return;
  dragging = true;
  moved = false;
  startX = event.clientX;
  startOffset = offset;
});
function endDrag() {
  dragging = false;
}
viewport.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);

/* ลากแถวและกันการคลิก */
/* ลากแถวและกันการคลิก */
viewport.addEventListener("pointermove", function (event) {
  if (!dragging) return;
  const distance = event.clientX - startX;
  if (Math.abs(distance) > 6) {
    moved = true;
    viewport.setPointerCapture(event.pointerId);
    offset = startOffset - distance;
    render();
  }
});
viewport.addEventListener("click", function (event) {
  if (moved) {
    event.preventDefault();
    moved = false;
  }
}, true);

/* ชี้ภาพให้ช้าลง */
/* ชี้ภาพให้ช้าลง */
const figures = track.querySelectorAll(".collection-item");
figures.forEach(function (figure) {
  figure.addEventListener("pointerenter", function () {
    hovered = true;
  });
  figure.addEventListener("pointerleave", function () {
    hovered = false;
    reading = false;
  });
});

/* ชี้คำอธิบายให้หยุดอ่าน */
/* ชี้คำอธิบายให้หยุดอ่าน */
figures.forEach(function (figure) {
  figure.querySelector("figcaption")
    .addEventListener("pointerenter", function () {
      reading = true;
    });
  figure.querySelector("figcaption")
    .addEventListener("pointerleave", function () {
      reading = false;
    });
});

/* แสดงภาพที่รับโฟกัส */
/* แสดงภาพที่รับโฟกัส */
figures.forEach(function (figure) {
  figure.addEventListener("focusin", function () {
    const rect = figure.getBoundingClientRect();
    if (rect.left < 0 || rect.right > viewport.clientWidth) {
      offset += rect.left - 24;
      render();
    }
  });
});