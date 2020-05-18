import {
  registerMicroApps,
  setDefaultMountApp,
  loadMicroApp,
  start
} from 'qiankun';

function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

const appContainer = document.createElement('div');
appContainer.setAttribute('style', 'position: absolute;top:0;right:0;bottom:0;left:0;display:flex');
appContainer.setAttribute('id', 'app');
document.body.append(appContainer);

const div1 = document.createElement('div');
const div2 = document.createElement('div');
appContainer.appendChild(div1);
appContainer.appendChild(div2);

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

// registerMicroApps([{
//     name: 'purehtml',
//     entry: '//localhost:8094',
//     container: appContainer,
//     activeRule: genActiveRule('/app1'),
//   }, {
//     name: 'purehtml2',
//     entry: '//localhost:8095',
//     container: appContainer,
//     activeRule: genActiveRule('/app2'),
//   }
// ], {
//   beforeLoad: [
//     app => {
//       console.log("before load", app);
//     }
//   ], // 挂载前回调
//   beforeMount: [
//     app => {
//       console.log("before mount", app);
//     }
//   ], // 挂载后回调
//   afterUnmount: [
//     app => {
//       console.log("after unload", app);
//     }
//   ] // 卸载后回调
// });

// setDefaultMountApp('/app2');

start();
