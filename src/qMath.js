import * as THREE from 'three';
import * as MATH from 'mathjs';
import { vec3 } from 'gl-matrix';

var ket0 = vec3.fromValues(1, 0, 0);
var ket1 = vec3.fromValues(0, 0, 1);
export const res = vec3.dot(ket0, ket1);
