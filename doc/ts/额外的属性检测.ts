interface Square {
  color: string
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }

  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }

  return newSquare
}

createSquare({ color: 'black', opacity: 0.5 })
// 方式一

let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)

// 方式二
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
// 方式三

let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)
