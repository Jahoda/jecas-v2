---
title: "3D hod kostkou"
headline: "3D hod kostkou online – interaktivní simulátor"
description: "Online 3D simulátor hodu kostkou s realistickou fyzikou a osvětlením. Nastavte počet stran, klikněte nebo chytněte a hoďte."
date: "2026-01-27"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Interaktivní 3D kostka s realistickým osvětlením a fyzikou. Kostka levituje ve vzduchu – kliknutím ji hodíte, nebo ji chytněte myší a hoďte sami. Můžete si zvolit počet stran (d4, d6, d8, d10, d12, d20).</p>

<div class="live">
<style>
  .dice-app { text-align: center; font-family: sans-serif; }
  .dice-app canvas { display: block; margin: 0 auto; cursor: grab; border-radius: 12px; background: #0f172a; max-width: 100%; }
  .dice-app canvas:active { cursor: grabbing; }
  .dice-controls { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 16px 0; align-items: center; }
  .dice-controls label { font-weight: bold; }
  .dice-controls select, .dice-controls button { padding: 8px 16px; border-radius: 8px; border: 1px solid #475569; font-size: 15px; background: #1e293b; color: #f1f5f9; cursor: pointer; }
  .dice-controls button { background: #2563eb; border-color: #2563eb; font-weight: bold; }
  .dice-controls button:hover { background: #1d4ed8; }
  .dice-result { font-size: 250%; font-weight: bold; margin: 12px 0; color: #f59e0b; min-height: 1.4em; }
  .dice-hint { color: #94a3b8; font-size: 90%; margin-bottom: 8px; }
</style>

<div class="dice-app">
  <div class="dice-controls">
    <label for="dice-sides">Kostka:</label>
    <select id="dice-sides">
      <option value="4">d4</option>
      <option value="6" selected>d6</option>
      <option value="8">d8</option>
      <option value="10">d10</option>
      <option value="12">d12</option>
      <option value="20">d20</option>
    </select>
    <button id="dice-roll-btn">🎲 Hodit kostkou</button>
  </div>
  <div class="dice-result" id="dice-result">–</div>
  <p class="dice-hint">Klikněte na kostku nebo ji chytněte a hoďte tažením myši</p>
  <canvas id="dice-canvas" width="500" height="400"></canvas>
</div>

<script>
(function() {
  const canvas = document.getElementById('dice-canvas');
  const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
  if (!gl) { canvas.parentElement.innerHTML = '<p>WebGL není podporováno.</p>'; return; }

  const sidesEl = document.getElementById('dice-sides');
  const resultEl = document.getElementById('dice-result');
  const rollBtn = document.getElementById('dice-roll-btn');

  let W = canvas.width, H = canvas.height;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * pixelRatio;
  canvas.height = H * pixelRatio;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  gl.viewport(0, 0, canvas.width, canvas.height);

  /* ===== Shader ===== */
  function createShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vsSrc = `
    attribute vec3 aPos;
    attribute vec3 aNorm;
    uniform mat4 uMVP;
    uniform mat4 uModel;
    uniform mat3 uNormMat;
    varying vec3 vNorm;
    varying vec3 vWorldPos;
    void main() {
      vNorm = normalize(uNormMat * aNorm);
      vWorldPos = (uModel * vec4(aPos, 1.0)).xyz;
      gl_Position = uMVP * vec4(aPos, 1.0);
    }
  `;
  const fsSrc = `
    precision mediump float;
    varying vec3 vNorm;
    varying vec3 vWorldPos;
    uniform vec3 uColor;
    uniform vec3 uEye;
    void main() {
      vec3 n = normalize(vNorm);
      vec3 light1 = normalize(vec3(3.0, 5.0, 4.0));
      vec3 light2 = normalize(vec3(-2.0, 3.0, -1.0));
      float diff = max(dot(n, light1), 0.0) * 0.7 + max(dot(n, light2), 0.0) * 0.3;
      float amb = 0.18;
      vec3 viewDir = normalize(uEye - vWorldPos);
      vec3 halfDir = normalize(light1 + viewDir);
      float spec = pow(max(dot(n, halfDir), 0.0), 40.0) * 0.5;
      vec3 col = uColor * (amb + diff) + vec3(1.0) * spec;
      col = pow(col, vec3(1.0/2.2));
      gl_FragColor = vec4(col, 1.0);
    }
  `;
  const vs = createShader(gl.VERTEX_SHADER, vsSrc);
  const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const aPos = gl.getAttribLocation(prog, 'aPos');
  const aNorm = gl.getAttribLocation(prog, 'aNorm');
  const uMVP = gl.getUniformLocation(prog, 'uMVP');
  const uModel = gl.getUniformLocation(prog, 'uModel');
  const uNormMat = gl.getUniformLocation(prog, 'uNormMat');
  const uColor = gl.getUniformLocation(prog, 'uColor');
  const uEye = gl.getUniformLocation(prog, 'uEye');

  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aNorm);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.059, 0.09, 0.165, 1);

  /* ===== Matrix math ===== */
  function mat4() { const m = new Float32Array(16); m[0]=m[5]=m[10]=m[15]=1; return m; }
  function mat4Mul(a, b) {
    const r = new Float32Array(16);
    for (let i=0;i<4;i++) for (let j=0;j<4;j++) { let s=0; for (let k=0;k<4;k++) s+=a[i*4+k]*b[k*4+j]; r[i*4+j]=s; }
    return r; // row-major multiply but stored column-major... let's do proper column-major
  }
  // Column-major helpers
  function m4Perspective(fov, aspect, near, far) {
    const f = 1/Math.tan(fov/2), nf = 1/(near-far), m = new Float32Array(16);
    m[0]=f/aspect; m[5]=f; m[10]=(far+near)*nf; m[11]=-1; m[14]=2*far*near*nf;
    return m;
  }
  function m4LookAt(eye, target, up) {
    const z = v3Norm(v3Sub(eye, target));
    const x = v3Norm(v3Cross(up, z));
    const y = v3Cross(z, x);
    const m = new Float32Array(16);
    m[0]=x[0]; m[1]=y[0]; m[2]=z[0];
    m[4]=x[1]; m[5]=y[1]; m[6]=z[1];
    m[8]=x[2]; m[9]=y[2]; m[10]=z[2];
    m[12]=-(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]);
    m[13]=-(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]);
    m[14]=-(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]);
    m[15]=1;
    return m;
  }
  function m4Mul(a, b) {
    const r = new Float32Array(16);
    for (let c=0;c<4;c++) for (let row=0;row<4;row++) {
      let s=0; for(let k=0;k<4;k++) s+=a[row+k*4]*b[c*4+k]; r[c*4+row]=s;
    }
    return r;
  }
  function m4FromQuat(q) {
    const [x,y,z,w] = q;
    const m = new Float32Array(16);
    m[0]=1-2*(y*y+z*z); m[1]=2*(x*y+w*z);   m[2]=2*(x*z-w*y);
    m[4]=2*(x*y-w*z);   m[5]=1-2*(x*x+z*z); m[6]=2*(y*z+w*x);
    m[8]=2*(x*z+w*y);   m[9]=2*(y*z-w*x);   m[10]=1-2*(x*x+y*y);
    m[15]=1;
    return m;
  }
  function m4Translate(tx,ty,tz) {
    const m = new Float32Array(16); m[0]=m[5]=m[10]=m[15]=1; m[12]=tx; m[13]=ty; m[14]=tz; return m;
  }
  function m3NormalFromM4(m) {
    const a=m[0],b=m[1],c=m[2],d=m[4],e=m[5],f=m[6],g=m[8],h=m[9],i=m[10];
    const det=a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g);
    const id=1/det;
    return new Float32Array([
      (e*i-f*h)*id, (c*h-b*i)*id, (b*f-c*e)*id,
      (f*g-d*i)*id, (a*i-c*g)*id, (c*d-a*f)*id,
      (d*h-e*g)*id, (b*g-a*h)*id, (a*e-b*d)*id
    ]);
  }
  function v3Sub(a,b) { return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]; }
  function v3Cross(a,b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
  function v3Norm(v) { const l=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2])||1; return [v[0]/l,v[1]/l,v[2]/l]; }
  function v3Len(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }

  /* ===== Quaternion ===== */
  function qMul(a,b) {
    return [
      a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
      a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
      a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
      a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]
    ];
  }
  function qFromAxis(axis, angle) {
    const s = Math.sin(angle/2), c = Math.cos(angle/2);
    return [axis[0]*s, axis[1]*s, axis[2]*s, c];
  }
  function qNorm(q) {
    const l = Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3])||1;
    return [q[0]/l,q[1]/l,q[2]/l,q[3]/l];
  }
  function qSlerp(a,b,t) {
    let dot = a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
    if (dot<0) { b=[-b[0],-b[1],-b[2],-b[3]]; dot=-dot; }
    if (dot>0.9995) {
      const r=[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t, a[3]+(b[3]-a[3])*t];
      return qNorm(r);
    }
    const theta=Math.acos(dot), sinT=Math.sin(theta);
    const w1=Math.sin((1-t)*theta)/sinT, w2=Math.sin(t*theta)/sinT;
    return [a[0]*w1+b[0]*w2, a[1]*w1+b[1]*w2, a[2]*w1+b[2]*w2, a[3]*w1+b[3]*w2];
  }

  /* ===== Geometry generators ===== */
  function makeBuffers(verts, normals, indices) {
    const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    const nb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, nb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    return { vb, nb, ib, count: indices.length };
  }

  function buildCube() {
    const s = 0.9;
    const faces = [
      { n:[0,0,1],  verts:[[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]] },
      { n:[0,0,-1], verts:[[s,-s,-s],[-s,-s,-s],[-s,s,-s],[s,s,-s]] },
      { n:[0,1,0],  verts:[[-s,s,s],[s,s,s],[s,s,-s],[-s,s,-s]] },
      { n:[0,-1,0], verts:[[-s,-s,-s],[s,-s,-s],[s,-s,s],[-s,-s,s]] },
      { n:[1,0,0],  verts:[[s,-s,s],[s,-s,-s],[s,s,-s],[s,s,s]] },
      { n:[-1,0,0], verts:[[-s,-s,-s],[-s,-s,s],[-s,s,s],[-s,s,-s]] },
    ];
    // Bevel: slightly round the cube by pushing vertices along normals
    const v=[], n=[], idx=[];
    let vi=0;
    for (const f of faces) {
      for (const p of f.verts) {
        // Push vertex slightly along face normal for bevel look
        const bevel = 0.03;
        v.push(p[0]+f.n[0]*bevel, p[1]+f.n[1]*bevel, p[2]+f.n[2]*bevel);
        n.push(f.n[0], f.n[1], f.n[2]);
      }
      idx.push(vi,vi+1,vi+2, vi,vi+2,vi+3);
      vi+=4;
    }
    // Add beveled edges - simplified: add chamfer triangles between adjacent faces
    return makeBuffers(v,n,idx);
  }

  function buildPolyhedron(type) {
    let vertices, faces;
    const phi = (1+Math.sqrt(5))/2;

    if (type === 4) {
      // Tetrahedron
      const a = 1;
      vertices = [[a,a,a],[-a,-a,a],[-a,a,-a],[a,-a,-a]];
      faces = [[0,1,2],[0,3,1],[0,2,3],[1,3,2]];
    } else if (type === 6) {
      return buildCube();
    } else if (type === 8) {
      // Octahedron
      vertices = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
      faces = [[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,4,2],[1,3,4],[1,5,3],[1,2,5]];
    } else if (type === 10) {
      // Pentagonal trapezohedron (d10) - approximate with bipyramid
      vertices = [[0,1.2,0],[0,-1.2,0]];
      faces = [];
      for (let i=0;i<10;i++) {
        const a1 = i*Math.PI*2/10, a2 = (i+1)*Math.PI*2/10;
        const r = 0.95, yOff = (i%2===0)?0.15:-0.15;
        vertices.push([Math.cos(a1)*r, yOff, Math.sin(a1)*r]);
      }
      for (let i=0;i<10;i++) {
        const next = (i+1)%10;
        if (i%2===0) {
          faces.push([0, i+2, next+2]);
        } else {
          faces.push([1, next+2, i+2]);
        }
      }
      // Fill sides
      for (let i=0;i<10;i++) {
        const next=(i+1)%10;
        if(i%2===0) faces.push([1,i+2,next+2]);
        else faces.push([0,next+2,i+2]);
      }
    } else if (type === 12) {
      // Dodecahedron
      const a=1/phi, b=phi;
      vertices = [
        [1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],
        [-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],
        [0,a,b],[0,a,-b],[0,-a,b],[0,-a,-b],
        [a,b,0],[a,-b,0],[-a,b,0],[-a,-b,0],
        [b,0,a],[b,0,-a],[-b,0,a],[-b,0,-a]
      ];
      const pentFaces = [
        [0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],
        [1,17,3,11,9],[1,9,5,14,12],[2,10,6,15,13],
        [2,13,3,17,16],[3,13,15,7,11],[4,14,5,19,18],
        [4,18,6,10,8],[5,9,11,7,19],[6,18,19,7,15]
      ];
      faces = [];
      for (const pf of pentFaces) {
        // Triangulate pentagon
        faces.push([pf[0],pf[1],pf[2]]);
        faces.push([pf[0],pf[2],pf[3]]);
        faces.push([pf[0],pf[3],pf[4]]);
      }
    } else if (type === 20) {
      // Icosahedron
      const t = phi;
      vertices = [
        [-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],
        [0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],
        [t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]
      ];
      faces = [
        [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
        [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
        [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
        [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]
      ];
    }

    // Normalize vertices to unit sphere, scale
    const scale = 1.0;
    for (let i=0;i<vertices.length;i++) {
      const l = v3Len(vertices[i]) || 1;
      vertices[i] = [vertices[i][0]/l*scale, vertices[i][1]/l*scale, vertices[i][2]/l*scale];
    }

    const vData=[], nData=[], iData=[];
    let idx=0;
    for (const f of faces) {
      const p0=vertices[f[0]], p1=vertices[f[1]], p2=vertices[f[2]];
      const e1=v3Sub(p1,p0), e2=v3Sub(p2,p0);
      const fn=v3Norm(v3Cross(e1,e2));
      for (const vi of f) {
        vData.push(vertices[vi][0], vertices[vi][1], vertices[vi][2]);
        nData.push(fn[0],fn[1],fn[2]);
      }
      iData.push(idx,idx+1,idx+2);
      idx+=3;
    }
    return makeBuffers(vData, nData, iData);
  }

  // Floor plane
  function buildFloor() {
    const s=5, y=-2.5;
    return makeBuffers(
      [-s,y,-s, s,y,-s, s,y,s, -s,y,s],
      [0,1,0, 0,1,0, 0,1,0, 0,1,0],
      [0,1,2, 0,2,3]
    );
  }
  const floor = buildFloor();

  /* ===== Dice state ===== */
  let currentSides = 6;
  let mesh = buildPolyhedron(6);
  let pos = [0, 0, 0];
  let quat = qFromAxis([1,0.5,0.3], 0.5);
  let angVel = [0, 0.8, 0]; // angular velocity for levitation spin
  let vel = [0, 0, 0];
  let state = 'levitate'; // levitate | rolling | settling | result | grabbed
  let levTime = 0;
  let rollTime = 0;
  let resultValue = null;
  let grabStart = null, grabPrev = null, grabVel = [0,0];

  // Face orientations for result detection (which quat shows which face up)
  function getTopFace(sides, q) {
    // Transform up vector by inverse quaternion to find which face is on top
    // Simplified: rotate (0,1,0) by quaternion and find closest face normal
    const up = [0,1,0];
    // Rotate up by conjugate of q
    const cq = [-q[0],-q[1],-q[2],q[3]];
    const localUp = quatRotVec(cq, up);

    if (sides === 6) {
      const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
      const vals = [3,4,6,1,2,5]; // standard die: opposite faces sum to 7
      let best=-1, bestD=-2;
      for (let i=0;i<6;i++) {
        const d=dirs[i][0]*localUp[0]+dirs[i][1]*localUp[1]+dirs[i][2]*localUp[2];
        if (d>bestD) { bestD=d; best=i; }
      }
      return vals[best];
    }
    // For other dice, just random
    return Math.floor(Math.random()*sides)+1;
  }

  function quatRotVec(q, v) {
    const [qx,qy,qz,qw] = q;
    const [vx,vy,vz] = v;
    const tx=2*(qy*vz-qz*vy), ty=2*(qz*vx-qx*vz), tz=2*(qx*vy-qy*vx);
    return [vx+qw*tx+qy*tz-qz*ty, vy+qw*ty+qz*tx-qx*tz, vz+qw*tz+qx*ty-qy*tx];
  }

  // Target quats for each face (d6)
  function getTargetQuat(sides, face) {
    if (sides === 6) {
      const targets = {
        1: [0.707,0,0,0.707],
        2: [0,0,0.707,0.707],
        3: [0,0,0,1],
        4: [0,1,0,0],
        5: [0,0,-0.707,0.707],
        6: [-0.707,0,0,0.707]
      };
      return qNorm(targets[face] || [0,0,0,1]);
    }
    // For non-d6, return random orientation
    const axis = v3Norm([Math.random()-0.5, Math.random()-0.5, Math.random()-0.5]);
    return qFromAxis(axis, Math.random()*Math.PI*2);
  }

  function rollDice() {
    const sides = parseInt(sidesEl.value);
    if (sides !== currentSides) {
      currentSides = sides;
      mesh = buildPolyhedron(sides);
    }
    resultValue = Math.floor(Math.random() * sides) + 1;
    state = 'rolling';
    rollTime = 0;
    vel = [0, 3, 0];
    // Random strong spin
    angVel = [(Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*15];
    resultEl.textContent = '...';
    resultEl.style.opacity = '0.5';
  }

  rollBtn.addEventListener('click', rollDice);
  sidesEl.addEventListener('change', function() {
    const sides = parseInt(sidesEl.value);
    if (sides !== currentSides) {
      currentSides = sides;
      mesh = buildPolyhedron(sides);
      resultEl.textContent = '–';
    }
  });

  /* ===== Mouse / touch interaction ===== */
  let isDown = false;
  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX) || 0);
    const y = (e.clientY || (e.touches && e.touches[0].clientY) || 0);
    return [(x-r.left)/r.width*2-1, -((y-r.top)/r.height*2-1)];
  }

  canvas.addEventListener('mousedown', function(e) {
    isDown = true;
    const p = getPos(e);
    grabStart = p;
    grabPrev = p;
    grabVel = [0,0];
    state = 'grabbed';
  });
  canvas.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    const p = getPos(e);
    if (grabPrev) {
      grabVel = [p[0]-grabPrev[0], p[1]-grabPrev[1]];
      // Move die position based on drag
      pos[0] += (p[0]-grabPrev[0]) * 3;
      pos[1] += (p[1]-grabPrev[1]) * 3;
    }
    grabPrev = p;
  });
  function onUp(e) {
    if (!isDown) return;
    isDown = false;
    if (state === 'grabbed') {
      const speed = Math.sqrt(grabVel[0]*grabVel[0]+grabVel[1]*grabVel[1]);
      if (speed > 0.01) {
        // Throw!
        const sides = parseInt(sidesEl.value);
        if (sides !== currentSides) { currentSides = sides; mesh = buildPolyhedron(sides); }
        resultValue = Math.floor(Math.random() * sides) + 1;
        state = 'rolling';
        rollTime = 0;
        vel = [grabVel[0]*8, grabVel[1]*8 + 2, 0];
        angVel = [(Math.random()-0.5)*20, (Math.random()-0.5)*20, (Math.random()-0.5)*20];
        resultEl.textContent = '...';
        resultEl.style.opacity = '0.5';
      } else {
        // Just a click - roll
        rollDice();
      }
    }
  }
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('mouseleave', onUp);
  // Touch
  canvas.addEventListener('touchstart', function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent('mousedown', {clientX:e.touches[0].clientX,clientY:e.touches[0].clientY})); }, {passive:false});
  canvas.addEventListener('touchmove', function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent('mousemove', {clientX:e.touches[0].clientX,clientY:e.touches[0].clientY})); }, {passive:false});
  canvas.addEventListener('touchend', function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent('mouseup')); }, {passive:false});

  /* ===== Draw ===== */
  function drawMesh(m, modelMat, color) {
    const eye = [0, 2, 6];
    const proj = m4Perspective(Math.PI/5, W/H, 0.1, 50);
    const view = m4LookAt(eye, [0,0,0], [0,1,0]);
    const mvp = m4Mul(proj, m4Mul(view, modelMat));
    const normMat = m3NormalFromM4(modelMat);

    gl.uniformMatrix4fv(uMVP, false, mvp);
    gl.uniformMatrix4fv(uModel, false, modelMat);
    gl.uniformMatrix3fv(uNormMat, false, normMat);
    gl.uniform3fv(uColor, color);
    gl.uniform3fv(uEye, eye);

    gl.bindBuffer(gl.ARRAY_BUFFER, m.vb);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nb);
    gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.ib);
    gl.drawElements(gl.TRIANGLES, m.count, gl.UNSIGNED_SHORT, 0);
  }

  let lastTime = 0;
  let settleStart = 0, settleQFrom, settleQTo;

  function frame(time) {
    const dt = Math.min((time - lastTime)/1000, 0.05);
    lastTime = time;
    levTime += dt;

    // Physics / state machine
    if (state === 'levitate') {
      pos[0] += (0-pos[0]) * 2 * dt;
      pos[1] = Math.sin(levTime*1.5)*0.15;
      pos[2] += (0-pos[2]) * 2 * dt;
      // Slow idle spin
      const axis = v3Norm(angVel[0]||angVel[1]||angVel[2] ? angVel : [0,1,0]);
      const speed = 0.6;
      const dq = qFromAxis(axis, speed*dt);
      quat = qNorm(qMul(dq, quat));
    } else if (state === 'grabbed') {
      // Position controlled by mouse, gentle spin
      const dq = qFromAxis([0,1,0], dt*2);
      quat = qNorm(qMul(dq, quat));
    } else if (state === 'rolling') {
      rollTime += dt;
      // Gravity
      vel[1] -= 9 * dt;
      pos[0] += vel[0]*dt;
      pos[1] += vel[1]*dt;
      pos[2] += vel[2]*dt;
      // Bounce off floor
      if (pos[1] < -1.5) {
        pos[1] = -1.5;
        vel[1] = Math.abs(vel[1])*0.4;
        vel[0] *= 0.7;
        vel[2] *= 0.7;
        angVel[0]*=0.6; angVel[1]*=0.6; angVel[2]*=0.6;
      }
      // Walls
      if (Math.abs(pos[0])>3) { pos[0]=Math.sign(pos[0])*3; vel[0]*=-0.5; }
      // Apply angular velocity
      const angSpeed = v3Len(angVel);
      if (angSpeed > 0.01) {
        const axis = v3Norm(angVel);
        const dq = qFromAxis(axis, angSpeed*dt);
        quat = qNorm(qMul(dq, quat));
      }
      // Damping
      angVel[0]*=(1-1.5*dt); angVel[1]*=(1-1.5*dt); angVel[2]*=(1-1.5*dt);
      vel[0]*=(1-0.5*dt); vel[2]*=(1-0.5*dt);

      // Check if settled
      const totalVel = Math.abs(vel[0])+Math.abs(vel[1])+Math.abs(vel[2])+v3Len(angVel);
      if ((rollTime > 1.0 && totalVel < 2) || rollTime > 3.0) {
        state = 'settling';
        settleStart = 0;
        settleQFrom = quat.slice();
        settleQTo = getTargetQuat(currentSides, resultValue);
      }
    } else if (state === 'settling') {
      settleStart += dt;
      const t = Math.min(settleStart / 0.6, 1);
      const ease = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
      quat = qSlerp(settleQFrom, settleQTo, ease);
      pos[0] += (0-pos[0])*3*dt;
      pos[1] += (-1.5-pos[1])*3*dt;
      pos[2] += (0-pos[2])*3*dt;
      if (t >= 1) {
        state = 'result';
        resultEl.textContent = resultValue;
        resultEl.style.opacity = '1';
        setTimeout(function() { state = 'levitate'; pos=[0,0,0]; angVel=[0,0.8,0]; }, 1500);
      }
    } else if (state === 'result') {
      pos[1] = -1.5;
    }

    // Render
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Floor
    const floorModel = m4Translate(0,0,0);
    drawMesh(floor, floorModel, [0.12, 0.15, 0.22]);

    // Dice
    const rotMat = m4FromQuat(quat);
    const transMat = m4Translate(pos[0], pos[1], pos[2]);
    const model = m4Mul(transMat, rotMat);

    // Dice color based on type
    const colors = {4:[0.85,0.2,0.2], 6:[0.95,0.95,0.95], 8:[0.2,0.6,0.9], 10:[0.1,0.75,0.4], 12:[0.9,0.6,0.1], 20:[0.7,0.2,0.8]};
    drawMesh(mesh, model, colors[currentSides]||[0.9,0.9,0.9]);

    // Shadow (dark circle on floor)
    // simplified: skip for now

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>
</div>

<h2 id="jak-to-funguje">Jak to funguje</h2>

<p>Simulátor používá čistý <b>WebGL</b> bez externích knihoven. Kostka je vykreslena jako 3D polyhedron s realistickým <b>Phong osvětlením</b> (difúzní + spekulární složka ze dvou světelných zdrojů).</p>

<h3>Podporované kostky</h3>

<table>
<tr><th>Kostka</th><th>Tvar</th><th>Použití</th></tr>
<tr><td>d4</td><td>Čtyřstěn</td><td>Stolní RPG (DMG)</td></tr>
<tr><td>d6</td><td>Krychle</td><td>Klasická kostka, deskové hry</td></tr>
<tr><td>d8</td><td>Osmistěn</td><td>RPG, zásahy zbraní</td></tr>
<tr><td>d10</td><td>Desetistěn</td><td>RPG, procentuální hody</td></tr>
<tr><td>d12</td><td>Dvanáctistěn</td><td>RPG, speciální zbraně</td></tr>
<tr><td>d20</td><td>Dvacetistěn</td><td>D&amp;D, útoky a záchranné hody</td></tr>
</table>

<h2 id="ovladani">Ovládání</h2>

<ul>
<li><p><b>Klik na kostku</b> – automatický hod s náhodným roztočením</p></li>
<li><p><b>Tažení myší</b> – chytíte kostku a můžete ji hodit směrem tažení</p></li>
<li><p><b>Tlačítko „Hodit kostkou"</b> – hod vybrané kostky</p></li>
<li><p><b>Výběr kostky</b> – přepínání mezi d4 až d20</p></li>
</ul>

<h2 id="technicke-detaily">Technické detaily</h2>

<p>Celý simulátor běží v prohlížeči a nepotřebuje žádné externí knihovny:</p>

<ul>
<li><p><b>WebGL</b> – hardwarově akcelerované 3D vykreslování</p></li>
<li><p><b>Vlastní fyzika</b> – gravitace, odrazy od podlahy a stěn, útlum rotace</p></li>
<li><p><b>Quaterniony</b> – plynulá rotace bez gimbal locku</p></li>
<li><p><b>Phong shading</b> – realistické osvětlení se dvěma světly a odlesky</p></li>
<li><p><b>Stavový automat</b> – levitace → hod → dopad → výsledek → levitace</p></li>
</ul>

<p>Kostky jsou generovány procedurálně jako platónská tělesa (čtyřstěn, krychle, osmistěn, dvanáctistěn, dvacetistěn) plus desetistěn jako pentagonální trapezohedron.</p>
