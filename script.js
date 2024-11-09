class Square {
    constructor(generation, parent) {
        squareStats(this, generation);

        const newSquare = createSquare(this, parent);

        fillContents(this, newSquare);
    }
}

function squareStats(square, generation) {
    square.generation = generation;
    square.probabilityPass =
        square.generation * 0.25 - 1 < Math.random() ? true : false;
    square.divisions =
        square.generation !== 1 ? Math.floor(Math.random() * 3) + 2 : 4;
    square.layout =
        square.divisions !== 4 ? (Math.random() < 0.5 ? "row" : "col") : null;
    square.direction =
        square.divisions !== 4 ? (Math.random() < 0.5 ? "for" : "rev") : null;
    const colors = [
        "rgb(0,75,0)",
        "rgb(0,100,0)",
        "rgb(0,125,0)",
        "rgb(95, 70, 55)",
    ];
    square.color = colors[Math.floor(Math.random() * 4)];
}

function fillContents(square, newSquare) {
    let contents = [];
    for (let index = 0; index < square.divisions; index++) {
        if (square.generation < 7) {
            if (square.probabilityPass) {
                contents.push(new Square(square.generation + 1, newSquare));
            }
        } else {
            newSquare.style.backgroundColor = square.color;
        }
    }
    square.contents = contents;
}

function createSquare(square, parent) {
    let newSquare = document.createElement("div");

    if (square.generation === 1) {
        newSquare.classList.add("square", "base");
    } else {
        newSquare.classList.add("square");
    }

    switch (square.divisions) {
        case 1:
            newSquare.style.display = "initial";
            break;
        case 2:
            newSquare.style.display = "flex";
            square.layout === "row"
                ? square.direction === "for"
                    ? (newSquare.style.flexDirection = "row")
                    : (newSquare.style.flexDirection = "row-reverse")
                : square.direction === "for"
                ? (newSquare.style.flexDirection = "column")
                : (newSquare.style.flexDirection = "column-reverse");
            break;
        case 3:
            newSquare.style.display = "grid";
            square.layout === "row"
                ? square.direction === "for"
                    ? newSquare.classList.add("row", "for")
                    : newSquare.classList.add("row", "rev")
                : square.direction === "for"
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

    if (!square.probabilityPass) {
        newSquare.style.backgroundColor = square.color;
    }
    parent.appendChild(newSquare);
    return newSquare;
}

const start = document.querySelector(".wrap");
const firstSquare = new Square(1, start);
console.log(firstSquare);
