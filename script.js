class Square {
    constructor(generation, parent, airport) {
        this.generation = generation;

        this.airport = airport;

        this.probabilityPass =
            generation * 0.25 - 1 < Math.random() ? true : false;

        this.divisions =
            generation !== 1 ? Math.floor(Math.random() * 3) + 2 : 4;

        this.layout =
            this.divisions !== 4 ? (Math.random() < 0.5 ? "row" : "col") : null;

        this.direction =
            this.divisions !== 4 ? (Math.random() < 0.5 ? "for" : "rev") : null;

        const colors = [
            "rgb(0,75,0)",
            "rgb(0,100,0)",
            "rgb(0,125,0)",
            "rgb(95, 70, 55)",
        ];
        this.color = colors[Math.floor(Math.random() * 4)];

        const newSquare = createSquare(
            parent,
            this.generation,
            this.divisions,
            this.layout,
            this.direction
        );

        this.contents = [];
        for (let index = 0; index < this.divisions; index++) {
            if (this.generation < 7) {
                if (this.probabilityPass) {
                    this.contents.push(new Square(generation + 1, newSquare));
                } else {
                    newSquare.style.backgroundColor = this.color;
                }
            } else {
                newSquare.style.backgroundColor = this.color;
            }
        }
    }
}

function createSquare(parent, generation, divisions, layout, direction) {
    let newSquare = document.createElement("div");

    if (generation === 1) {
        newSquare.classList.add("square", "base");
    } else {
        newSquare.classList.add("square");
    }

    switch (divisions) {
        case 1:
            newSquare.style.display = "initial";
            break;
        case 2:
            newSquare.style.display = "flex";
            layout === "row"
                ? direction === "for"
                    ? (newSquare.style.flexDirection = "row")
                    : (newSquare.style.flexDirection = "row-reverse")
                : direction === "for"
                ? (newSquare.style.flexDirection = "column")
                : (newSquare.style.flexDirection = "column-reverse");
            break;
        case 3:
            newSquare.style.display = "grid";
            layout === "row"
                ? direction === "for"
                    ? newSquare.classList.add("row", "for")
                    : newSquare.classList.add("row", "rev")
                : direction === "for"
                ? newSquare.classList.add("col", "for")
                : newSquare.classList.add("col", "rev");
            break;
        case 4:
            newSquare.style.display = "grid";
            newSquare.style.gridTemplateRows = "1fr 1fr";
            newSquare.style.gridTemplateColumns = "1fr 1fr";
            break;
        default:
            console.warn("Invalid division count");
    }
    parent.appendChild(newSquare);
    return newSquare;
}

const start = document.querySelector(".wrap");
const airport = true;
const firstSquare = new Square(1, start, airport);
console.log(firstSquare);
