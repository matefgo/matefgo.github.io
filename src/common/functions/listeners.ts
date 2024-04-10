type NavLinkButtonListenerAction = "add" | "remove";

export function navLinkButtonListener(action: NavLinkButtonListenerAction) {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".nav-link button");

  buttons.forEach((button) => {
    const listener = () => {
      const isActive = button.classList.contains("active");

      if (isActive) {
        button.classList.remove("active");
      } else {
        buttons.forEach((inactiveButton) => {
          inactiveButton.classList.remove("active");
        });
        button.classList.add("active");
      }
    };

    if (action === "remove") {
      button.removeEventListener("click", listener);
      return;
    }

    button.addEventListener("click", listener);
  });
}
