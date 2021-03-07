import { Game } from "./Game";
import { Ship } from "./Ship";

export class Playground {
  public playground: number[][] = [];
  public playgroundShips: Ship[] = [];

  constructor() {
    this.preparePlayground();
  }

  protected preparePlayground() {
    for (let i = 0; i < Game.playgroundFieldsCount; i++) {
      const fields: number[] = new Array(Game.playgroundFieldsCount).fill(0);
      this.playground.push(fields);
    }
  }

  public preparePlaygroundDOMStructure(): HTMLElement {
    const main: HTMLElement = document.createElement("div");
    main.setAttribute("class", "playground");
    main.style.width = `${Game.playgroundSize}px`;
    main.style.height = `${Game.playgroundSize}px`;

    this.playground.forEach((row, rowIndex) => {
      const rowDiv: HTMLElement = document.createElement("div");
      rowDiv.setAttribute("class", `playground-row`);
      rowDiv.style.height = `${Game.fieldSize + 4}px`;

      row.forEach((field, fieldIndex) => {
        const div: HTMLElement = document.createElement("div");
        div.style.width = `${Game.fieldSize}px`;
        div.style.height = `${Game.fieldSize}px`;

        div.setAttribute(
          "class",
          `playground-field playground-${rowIndex}_${fieldIndex}`
        );
        div.addEventListener("mouseover", () => {
          console.log("siemanko");
        });
        rowDiv.appendChild(div);
      });

      main.appendChild(rowDiv);
    });

    return main;
  }
}
