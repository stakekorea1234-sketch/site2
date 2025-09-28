// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  // Update current year in footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
  
  // Smooth scrolling for all anchor links
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add highlight effect
        targetSection.style.backgroundColor = "#fffbf0";
        setTimeout(() => {
          targetSection.style.transition = "background-color 0.5s ease";
          targetSection.style.backgroundColor = "";
        }, 1000);
      }
    });
  });

  // Add active state to navigation links based on scroll position
  const sections = document.querySelectorAll(".content-section");
  const floatingMenuItems = document.querySelectorAll(".menu-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Update floating menu items
    floatingMenuItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Copy promo code functionality
  const promoCode = "AAKK";
  const highlightElements = document.querySelectorAll(".highlight");

  highlightElements.forEach((element) => {
    if (element.textContent === promoCode) {
      element.style.cursor = "pointer";
      element.title = "클릭하여 복사";

      element.addEventListener("click", function () {
        navigator.clipboard.writeText(promoCode).then(() => {
          const originalText = this.textContent;
          this.textContent = "복사됨!";
          this.style.backgroundColor = "#4caf50";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = "#ffeb3b";
          }, 2000);
        });
      });
    }
  });

  // Back to top button
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "↑";
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
    `;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTopButton.addEventListener("mouseenter", () => {
    backToTopButton.style.backgroundColor = "#0052a3";
    backToTopButton.style.transform = "scale(1.1)";
  });

  backToTopButton.addEventListener("mouseleave", () => {
    backToTopButton.style.backgroundColor = "#0066cc";
    backToTopButton.style.transform = "scale(1)";
  });

  document.body.appendChild(backToTopButton);
});
