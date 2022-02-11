
const buf = Buffer.from('Node.js 技术栈', 'UTF-8')
console.log(buf)
console.log(buf.toString('UTF-8')) // Node.js �

//  中文在 utf-8 中占用三个字节


buffer 内存分配原理 
node.js 采用的是slab 机制进行 预先申请  事后分配  是一种动态的管理机制

// 创建 Buffer 的方式
Buffer.from 
Buffer.alloc
Buffer.allocUnsafe


const fs = require('fs');
const { resolve } = require('path')
const inputStream = fs.createReadStream(resolve(__dirname,'./input.txt')); // 创建可读流
const outputStream = fs.createWriteStream(resolve(__dirname,'./output.txt')); // 创建可写流
inputStream.pipe(outputStream); // 管道读写






// 闭包
function f(fn,x){
    function g(){
        console.log(x)
    }
    if(x<1){
        f(g,1)
        
    }else{
        fn()

    }
    
}

f(2,0)