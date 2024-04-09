export function navLinkButtonListener() {
  const buttons = document.querySelectorAll(".nav-link button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.contains("active");

      if (isActive) {
        button.classList.remove("active");
      } else {
        buttons.forEach((inactiveButton) => {
          inactiveButton.classList.remove("active");
        });
        button.classList.add("active");
      }
    });
  });
}
