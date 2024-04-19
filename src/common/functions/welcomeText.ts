function createWelcomeText() {
  const h2 = document.createElement("h2");
  h2.innerText = "Hello, and welcome.";
  const p = document.createElement("p");
  p.innerText = "Fell free to navigate and explore my page.";

  return { h2, p };
}

export function replaceMainContent() {
  const main = document.querySelector("main") as HTMLElement;
  main.classList.add("welcome");
  const mainContent = main.innerHTML;

  const { h2, p } = createWelcomeText();

  main.replaceChildren(h2, p);

  const animation = main.animate(
    {
      opacity: [0, 1, 1, 0],
      offset: [0, 0.3, 0.7],
    },
    {
      duration: 6000,
      fill: "forwards",
    }
  );

  animation.onfinish = () => {
    main.classList.remove("welcome");
    main.innerHTML = mainContent;
    main.animate(
      {
        opacity: [0, 1],
      },
      {
        duration: 1000,
        fill: "forwards",
      }
    );
  };
}
