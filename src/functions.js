import { log } from "./main.js"
import { x, y, z, h, reset } from "./main.js"

document.querySelector('#app').innerHTML = `
    <div>
        <div class="scene" style="background-color: antiquewhite; display: inline; padding-right: 50px;">
            <p style="display: inline; padding-right: 10px;">Scene Control</p>
            <button id="log" type="button">log</button>
            <button id="reset" type="button">reset</button>
        </div>
        <div class="gates" style="background-color: antiquewhite; display: inline;">
            <p style="display: inline; padding-right: 10px;">Basic Gates</p>
            <button id="x" type="button">X</button>
            <button id="y" type="button">Y</button>
            <button id="z" type="button">Z</button>
            <button id="h" type="button">H</button>
        </div>
    </div>
`

log(document.querySelector('#log'));
reset(document.querySelector('#reset'));
x(document.querySelector('#x'));
y(document.querySelector('#y'));
z(document.querySelector('#z'));
h(document.querySelector('#h'));
