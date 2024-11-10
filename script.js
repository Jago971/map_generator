class Square {
    constructor(generation, parent, airport = false) {
        this.maxGenerations = 8;
        this.airportGeneration_size = 5;
        this.smallSquareLiklihood = 0.8;
        generateSquareStats(this, generation, airport);

        const newSquare = createNewSquareElement(this, parent);

        fillContents(this, newSquare);
    }
}

function generateSquareStats(square, generation, airport) {
    square.generation = generation;
    square.airport = airport;
    square.probabilityPass =
        square.generation * (1 - square.smallSquareLiklihood) - 1 <
        Math.random()
            ? true
            : false;

    if (generation === 1) {
        square.divisions = 4;
        square.layout = null;
        square.direction = null;
    } else if (generation < square.maxGenerations) {
        if (airport) {
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

    const colors = [
        "rgb(0,75,0)",
        "rgb(0,100,0)",
        "rgb(0,125,0)",
        "rgb(95, 70, 55)",
    ];
    square.color = colors[Math.floor(Math.random() * 4)];
}

function createNewSquareElement(square, parent) {
    let newSquare = document.createElement("div");

    square.generation === 1
        ? newSquare.classList.add("square", "base")
        : newSquare.classList.add("square");

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

    parent.appendChild(newSquare);
    return newSquare;
}

function fillContents(square, newSquare) {
    let contents = [];
    for (let index = 0; index < square.divisions; index++) {
        if (square.generation < square.maxGenerations) {
            if (square.airport) {
                if (square.generation === 1) {
                    if (index === 0) {
                        contents.push(
                            new Square(square.generation + 1, newSquare, true)
                        );
                    } else {
                        contents.push(
                            new Square(square.generation + 1, newSquare)
                        );
                    }
                } else if (square.generation < square.airportGeneration_size) {
                    if (square.divisions === 3) {
                        if (index === 1) {
                            contents.push(
                                new Square(
                                    square.generation + 1,
                                    newSquare,
                                    true
                                )
                            );
                        } else {
                            contents.push(
                                new Square(square.generation + 1, newSquare)
                            );
                        }
                    }
                    if (square.divisions === 4) {
                        if (index === 3) {
                            contents.push(
                                new Square(
                                    square.generation + 1,
                                    newSquare,
                                    true
                                )
                            );
                        } else {
                            contents.push(
                                new Square(square.generation + 1, newSquare)
                            );
                        }
                    }
                } else {
                    const airport = document.createElement("img");
                    airport.src = "./assets/airport1.svg";
                    airport.classList.add("airport");
                    newSquare.appendChild(airport);
                    newSquare.style.backgroundColor = "yellowGreen";
                }
            } else {
                if (square.probabilityPass) {
                    contents.push(new Square(square.generation + 1, newSquare));
                } else {
                    newSquare.style.backgroundColor = square.color;
                }
            }
        } else {
            newSquare.style.backgroundColor = square.color;
        }
    }
    square.contents = contents;
}

const start = document.querySelector(".wrap");
const firstSquare = new Square(1, start, true);
console.log(firstSquare);
