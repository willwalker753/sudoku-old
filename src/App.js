import React, { PureComponent } from 'react'
import "./App.css"

const randomNumber = (min, max) => { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // return Math.ceil(Math.random() * 9)
} 


class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      rows: []
    }
  }

  componentDidMount = () => {
    
  
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



            let bBox 
            let bCell 

            let realC = c + 1
            let realR = r + 1
            // c2 r5 => 4
            // c6 r9 => 8
            // c4 r2 => 2
            // c9 r7 => 9

            // if rows greater than 3 => remove 3 from rows, add 9 to columns
            let flatC = realC + ((Math.ceil(realR / boxSize) - 1) * totalSize)
            let flatR = realR + ((Math.ceil(realR / boxSize) - 1) * -boxSize)
            bBox = Math.ceil(flatC / boxSize) - 1;

            

            // divide the column number by 3 then round up to get the bBox value



            // c2 r3 => c56

            // if row greater than 1 => remove 1 from row, add totalSize * boxSize to column
            flatC = flatC + (totalSize * boxSize * (flatR - 1));

            // NOTE FOR LATERRRRRRRRRRRRRRRRRRRRRRRRR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            // There is a problem with flatC or bCell. It is repeating the same 3 numbers for each bBox. Should have all 9

            // console.log(flatC)
            flatR = 1;

            bCell = flatC % totalSize - 1;
            if (bCell === -1) bCell = totalSize - 1;
            // console.log(bCell)

            console.log(bBox, bCell)





            for (let i=0; i<100; i++) {
                const cellValue = randomNumber(1, totalSize);
                if (
                    !solutionRows[r].includes(cellValue) &&
                    !solutionColumns[c].includes(cellValue) &&
                    !solutionBoxes[bBox].includes(cellValue)
                ) {
                    solutionRows[r][c] = cellValue;
                    solutionColumns[c][r] = cellValue;
                    solutionBoxes[bBox][bCell] = cellValue;
                    
                    i = 100;
                } else {
                    // NOTE FOR LATERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
                    // The reason this is getting 0s sometimes is the retries is hitting 100
                    // it cant find a solution because it is blocked, have to backtrack a few squares
                    // see this link for an example
                    // https://www.codeproject.com/articles/23206/sudoku-algorithm-generates-a-valid-sudoku-in-0-018
                    
                    
                }
            }
        }
    }
    
    
    console.log(solutionRows)
    console.log(solutionColumns)
    console.log(solutionBoxes)
    
    this.setState({ rows: solutionRows})
  }

  render() {
    return (
      <div className='outer'>
        {this.state.rows.map((row, key) => {
          return (
            <div className='inner' key={key}>
              {row.map((cell, key) => {
                return <p key={key}>{cell}</p>
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default App