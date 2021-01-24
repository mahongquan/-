import React from 'react';
import ReactDOM from 'react-dom';
import App from './mui/AppScrum_mui'
const fs = require('fs');
const path = require('path');
// console.log(path);
function fileExist(p) {
  if (fs.existsSync(p)) {
    return true;
  }
  return false;
}
function link(where, module_name) {
  // body...
  var thelink = document.createElement('link');
  thelink.setAttribute('rel', 'stylesheet');
  var file1 = path.join(where, module_name);
  thelink.setAttribute('href', file1);
  document.head.appendChild(thelink);
}
function getWhere() {
  let p = window.require('electron').ipcRenderer.sendSync('getpath');
  return p;
}
let module_name;
let where = getWhere();
console.log(where);
link('./', 'animate.min.css');
// if (module_name === './AppScrum') {
  // link('./', 'style.css');
  // link(where, 'node_modules/react-tabs/style/react-tabs.css');
  // link(where, 'node_modules/bootstrap/dist/css/bootstrap.min.css');
  // link(where, 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css');
// }
ReactDOM.render(<App />, document.getElementById('root'));
