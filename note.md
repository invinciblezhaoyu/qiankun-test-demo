# QianKun基础使用总结

---

一. 搭建基础CommonJS环境， 提供环境（webpack）以进行前端引入第三方模块（qiankun).

二. 主应用

  1. 引入qiankun中要使用的方法

      ``` js

        import {
          registerMicroApps,
          setDefaultMountApp,
          loadMicroApp,
          start
        } from 'qiankun';
      ```

  2. 注册子应用并启动

      ``` js
        registerMicroApps([{
          name: 'purehtml', // 子应用名称
          entry: '//localhost:8094', // 子应用部署地址（启动地址）
          container: appContainer, // 两种方式：
            // 1.#app 或者 div对象（document.getElementById('app')）;
            // 2. rander参数 提供渲染函数,以vue为例,便是挂载实例的过程
              // rander: () => { /* rander something*/ },
          activeRule: genActiveRule('/app1'), // 匹配规则， 字符串或者返回值为字符串的函数
        }]);

        setDefaultMountApp('/app1'); // 设置进入默认子应用

        start(); // 启动
      ```

  3. 手动加载微应用,适用于不通过路由关联微应用的场景

      ``` js
        loadMicroApp({
          name: 'app1',
          entry: '//localhost:8094',
          container: div1,
        });
        loadMicroApp({
          name: 'app2',
          entry: '//localhost:8095',
          container: div2,
        });
      ```

三. 子应用

  1. 暴露quiankun需要的三个钩子函数

      ``` js
        (global => {
            global['purehtml'] = {
              bootstrap: () => {
                console.log('purehtml bootstrap');
                return Promise.resolve();
              },
              mount: () => {
                console.log('purehtml mount');
                return Promise.resolve(); // 此处可以供渲染子应用
              },
              unmount: () => {
                console.log('purehtml unmount');
                return Promise.resolve();
              },
            };
          })(window);
      ```

四. 其他非纯净环境下需要注意的点

  1. webpack 需要进行配置打包参数
  
      ``` js
        output: {
          library: packageName,  // 这里改成跟主应用中注册的一致
          libraryTarget: 'umd',
          jsonpFunction: `webpackJsonp_${packageName}`,
        }
      ```

五. 其他

  1. 父子应用传值可以通过props传值, 没有发现子应用向父应用emit的方式.
  2. 在纯净环境下(只使用了webpack和qiankun,不使用其他框架), 刷新或切换路由时使用路由加载方式会出现404的错误(目前没有找到问题所在,不知道如何配置).
  3. 简单说明,两个子应用只是纯html引入一个index.js文件,index中暴露三个方法,并无多余代码(子应用部署时要在nginx中开启跨域).
