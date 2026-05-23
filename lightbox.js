const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(src, alt, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = caption || alt;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-lightbox]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    openLightbox(
      btn.dataset.lightboxSrc || img.src,
      img.alt,
      btn.dataset.lightboxCaption || img.alt
    );
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
