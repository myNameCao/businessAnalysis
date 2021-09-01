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
