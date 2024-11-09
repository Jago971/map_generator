class Square {
    constructor(generation, parent, airport = false) {
        squareStats(this, generation, airport);

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

        fillContents(
            this,
            newSquare,
            this.generation,
            this.airport,
            this.probabilityPass,
            this.divisions,
            this.color
        );
    }
}

function fillContents(
    square,
    newSquare,
    generation,
    probabilityPass,
    airport,
    divisions,
    color
) {
    let contents = [];
    for (let index = 0; index < divisions; index++) {
        if (generation < 7) {
            if (airport) {
                if (generation === 1) {
                    if (index === 0) {
                        contents.push(
                            new Square(generation + 1, newSquare, true)
                        );
                    } else {
                        contents.push(new Square(generation + 1, newSquare));
                    }
                } else {
                    if (index === 3) {
                        contents.push(
                            new Square(generation + 1, newSquare, true)
                        );
                    } else {
                        contents.push(new Square(generation + 1, newSquare));
                    }
                }
                square.contents = contents;
            } else if (probabilityPass) {
                contents.push(new Square(generation + 1, newSquare));
                square.contents = contents;
            } else {
                newSquare.style.backgroundColor = color;
            }
        } else {
            newSquare.style.backgroundColor = color;
        }
    }
}

function squareStats(square, generation, aiport) {
    square.generation = generation;
    square.aiport = aiport;
    square.probabilityPass =
        generation * 0.25 - 1 < Math.random() ? true : false;

    if (generation === 1) {
        square.divisions = 4;
        square.layout = null;
        square.direction = null;
    } else if (generation < 7) {
        if (aiport) {
            let divisions = Math.random() < 0.5 ? 3 : 4;
            square.divisions = divisions;
            if (divisions === 3) {
                let layout = Math.random() < 0.5 ? "row" : "col";
                square.layout = layout;
                square.direction = "rev";
            } else {
                square.layout = null;
                square.direction = null;
            }
        } else {
            let divisions = Math.floor(Math.random() * 3) + 2;
            square.divisions = divisions;
            square.layout =
                divisions !== 4 ? (Math.random() < 0.5 ? "row" : "col") : null;
            square.direction =
                divisions !== 4 ? (Math.random() < 0.5 ? "for" : "rev") : null;
        }
    } else {
        square.divisions = 1;
        square.layout = null;
        square.direction = null;
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
