- 类型保护函数

```ts
enum Type {
  Strong,
  Week
}

class Java {
  helloJava() {
    console.log('hello java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('hellp javascript')
  }
  javascript: any
}

function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // 写法 0 类型断言
  if ((lang as Java).helloJava) {
    ;(lang as Java).helloJava()
  } else {
    ;(lang as JavaScript).helloJavaScript()
  }

  // 写法一  类型保护函数
  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  //写法二

  if (lang instanceof Java) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }
  // 写法三
  if ('java' in lang) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}
```
