模块加载的步骤：

路径分析 => 文件定位 => 编译执行


// 寻找步骤
系统缓存

系统模块

文件模块

目录作为模块

node_modules 目录加载  

（funtion(exports,require,module,__filename,__dirname){
    // 模块的内容
})

require('./cache.js')

console.log(require.cache)


// 源码  



Module.prototype.require = function(path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, /* isMain */ false);
};


Module._load = function(request, parent, isMain) {
    if (parent) {
      debug('Module._load REQUEST %s parent: %s', request, parent.id);
    }
  
    var filename = Module._resolveFilename(request, parent, isMain);
  
    var cachedModule = Module._cache[filename];
    if (cachedModule) {
      return cachedModule.exports;
    }
  
    if (NativeModule.nonInternalExists(filename)) {
      debug('load native module %s', request);
      return NativeModule.require(filename);
    }
  
    var module = new Module(filename, parent);
  
    if (isMain) {
      process.mainModule = module;
      module.id = '.';
    }
  
    Module._cache[filename] = module;
  
    tryModuleLoad(module, filename);
  
    return module.exports;
  };






  // compile 源码
  NativeModule.wrap = function(script) {
    return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
  };

  NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ];

  NativeModule.prototype.compile = function() {
    var source = NativeModule.getSource(this.id);
    source = NativeModule.wrap(source);

    this.loading = true;

    try {
      const fn = runInThisContext(source, {
        filename: this.filename,
        lineOffset: 0,
        displayErrors: true
      });
      fn(this.exports, NativeModule.require, this, this.filename);

      this.loaded = true;
    } finally {
      this.loading = false;
    }
  };









  function Effect(f) {
    return {
        map(g) {
            return Effect(x => g(f(x)));
        }
    }
}



function fZero() {
    console.log('Starting with nothing');
    // Definitely not launching a nuclear strike here.
    // But this function is still impure.
    return 0;
}
const zero = Effect(fZero);
const increment = x =>{
    console.log(111)
     return x + 1 } ; // A plain ol' regular function.
const one = zero.map(increment);



