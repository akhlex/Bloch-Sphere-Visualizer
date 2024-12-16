import { log } from "./qMath.js"
import { x, y, z, h, reset } from "./main.js"

document.querySelector('#app').innerHTML = `
    <div>
        <button id="log" type="button">log</button>
        <button id="reset" type="button">reset</button>
        <button id="x" type="button">X</button>
        <button id="y" type="button">Y</button>
        <button id="z" type="button">Z</button>
        <button id="h" type="button">H</button>
    </div>
`

log(document.querySelector('#log'));
reset(document.querySelector('#reset'));
x(document.querySelector('#x'));
y(document.querySelector('#y'));
z(document.querySelector('#z'));
h(document.querySelector('#h'));
