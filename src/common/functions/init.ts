import SwupParallelPlugin from "@swup/parallel-plugin";
import Swup from "swup";
import { About } from "../../about/about";
import { Main } from "../../main/main";
import { navLinkButtonListener } from "./listeners";
import "../styles/layout.css";
import "../styles/transitions.css";
import { Portfolio } from "../../portfolio/portfolio";
import { Contact } from "../../contact/contact";
import { Story } from "../../story/story";
import { replaceMainContent } from "./welcomeText";

const swup = new Swup({
  plugins: [new SwupParallelPlugin()],
});

const classByRoutes = {
  "/": Main,
  "/about/": About,
  "/portfolio/": Portfolio,
  "/story/": Story,
  "/contact/": Contact,
};

type Routes = keyof typeof classByRoutes;

let currentInstance: InstanceType<(typeof classByRoutes)[Routes]>;
let oldInstance: InstanceType<(typeof classByRoutes)[Routes]>;

document.addEventListener("DOMContentLoaded", () => {
  navLinkButtonListener("add");

  replaceMainContent();

  const route = location.pathname as Routes;

  currentInstance = new classByRoutes[route]();
});

swup.hooks.on("content:remove", () => {
  navLinkButtonListener("add");
  oldInstance.stopAnimation();
});

swup.hooks.on("content:insert", (visit) => {
  navLinkButtonListener("remove");
  const route = visit.to.url as Routes;
  oldInstance = currentInstance;
  currentInstance = new classByRoutes[route]();
});

swup.hooks.on("visit:start", (visit) => {
  const anchor = visit.trigger.el as HTMLAnchorElement;

  if (anchor.classList.contains("main-link")) {
    const svgDot = anchor.querySelector("svg") as SVGElement;

    const { x, y } = svgDot.getBoundingClientRect();

    const squareSize = innerWidth > innerHeight ? "200vw" : "200vh";

    document.documentElement.style.setProperty("--x-corner", `${x}`);
    document.documentElement.style.setProperty("--y-corner", `${y}`);
    document.documentElement.style.setProperty(
      "--square-size",
      `${squareSize}`
    );
    return;
  }

  const button = anchor.previousElementSibling;
  const isLargeScreen = window.matchMedia("screen and (min-width: 768px)");

  if (isLargeScreen.matches) {
    const { x, y } = anchor.getBoundingClientRect();

    document.documentElement.style.setProperty("--x-corner", `${x}`);
    document.documentElement.style.setProperty("--y-corner", `${y}`);

    return;
  }

  if (button) {
    const { x, y } = button.getBoundingClientRect();

    document.documentElement.style.setProperty("--x-corner", `${x}`);
    document.documentElement.style.setProperty("--y-corner", `${y}`);
  }
});
