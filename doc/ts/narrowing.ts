// 联合类型

interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  return {
    swim: () => {},
    layEggs: () => {
      console.log(3)
    }
  }
}

let pet = getSmallPet()

// 每一个成员访问都会报错
if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}

// 写法一 类型断言
if ((<Fish>pet).swim) {
  ;(<Fish>pet).swim()
} else {
  ;(<Bird>pet).fly()
}

// 用户自定义的类型保护
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}
// 写法二
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

// function isNumber(x: any): x is number {
//   return typeof x === 'number'
// }

// function isString(x: any): x is string {
//   return typeof x === 'string'
// }

// function padLeft(value: string, padding: string | number) {
//   if (isNumber(padding)) {
//     return Array(padding + 1).join(' ') + value
//   }
//   if (isString(padding)) {
//     return padding + value
//   }
//   throw new Error(`Expected string or number, got '${padding}'.`)
// }

// typeof 类型保护

function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
