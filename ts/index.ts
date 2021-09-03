<<<<<<< HEAD
interface IPerson {
  age: number
  name: string
}

interface IPeoPle extends IPerson {
  sex: string
}

class User implements IPerson {
  age: number
  name: string
}
interface IRoles extends User {}

class Roles extends User {}

type LinkedList<T> = T & { next: LinkedList<T> }

interface Person {
  name: string
}
type Yikes = Array<Yikes>
=======
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
>>>>>>> 4046f1267010986911b23d3a9044613c97b906d5
