const randomNumber = (min, max) => { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

const findBoxByRC = (row, column) => {
    const boxesPerRow = 3;
    // r1c2 => b0
    // r1c5 => b1
    // r3c1 = b3
}

let puzzle = [];
let solutionRows = [];
let solutionColumns = [];
let solutionBoxes = []; // 2d array, both indexes are ordered left to right then go to next line of boxes/numbers
const totalSize = 9; // has to be divisable by 3 to an integer
const boxSize = totalSize / 3; 

// create empty 2d array to represet rows, columns, and boxes
for (let r=0; r<totalSize; r++) {
    solutionRows.push([])
    solutionColumns.push([])
    solutionBoxes.push([])
    for (let c=0; c<totalSize; c++) {
        solutionRows[r][c] = 0;
        solutionColumns[r][c] = 0;
        solutionBoxes[r][c] = 0;
    }
}



for (let r=0; r<totalSize; r++) {
    for (let c=0; c<totalSize; c++) {
        let cellReady = false;
        const maxRetries = 1000;
        let retries = 0;
        // const bBox, bCell = findBoxByRC(r, c);
        while (cellReady === false && retries < maxRetries) {
            const cellValue = randomNumber(1, totalSize);
            if (
                !solutionRows[r].includes(cellValue) &&
                !solutionColumns[c].includes(cellValue) //&&
                // !solutionBoxes[bBox].includes(cellValue)
            ) {
                solutionRows[r][c] = cellValue;
                solutionColumns[c][r] = cellValue;
                // solutionBoxes[bBox][bCell] = cellValue;
                
                cellReady = true;
            } else {
                retries++;
                if (retries > 990) console.log(cellValue)
                // NOTE FOR LATERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
                // The reason this is getting 0s sometimes is the retries is hitting 1000
                // Not sure why it can't find a solution
                // Try switching to a defined number list maybe, still have to make it random 
                
                
                
            }
            // check for if value is included on row, column, or box
            // if it isn't then add it to all 3 and break from while
            // else continue with new value in while loop
        }
    }
}


console.log(solutionRows)
console.log(solutionColumns)
console.log(solutionBoxes)

document.getElementById("result").innerHTML = `${solutionRows}`