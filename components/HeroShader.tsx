"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.02;

  vec2 c1 = vec2(0.55 + sin(t) * 0.04, 0.32 + cos(t * 0.7) * 0.03);
  float d1 = length(p - c1);
  float wash1 = exp(-d1 * d1 * 1.1);

  vec2 c2 = vec2(-0.55 + cos(t * 0.6) * 0.04, -0.38 + sin(t * 0.9) * 0.03);
  float d2 = length(p - c2);
  float wash2 = exp(-d2 * d2 * 1.6);

  float dm = length(p - m);
  float cursorGlow = exp(-dm * dm * 5.0) * 0.18;

  vec3 deepBlack = vec3(0.035, 0.035, 0.04);
  vec3 plumRose = vec3(0.28, 0.10, 0.16);
  vec3 softPink = vec3(0.92, 0.50, 0.62);

  vec3 color = deepBlack;
  color = mix(color, plumRose, wash1 * 0.80);
  color = mix(color, softPink, wash1 * wash1 * 0.32);
  color = mix(color, plumRose, wash2 * 0.50);
  color = mix(color, softPink, cursorGlow * 0.7);

  float grain = hash(uv * u_resolution.xy * 1.5 + floor(u_time * 18.0));
  color += (grain - 0.5) * 0.05;

  gl_FragColor = vec4(color, 0.96);
}
`;

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const glNullable = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!glNullable) return;
    const gl = glNullable;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const scale = 0.65;
      const w = Math.max(1, Math.floor(rect.width * dpr * scale));
      const h = Math.max(1, Math.floor(rect.height * dpr * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(render);
    };

    const startTime = performance.now();
    function render() {
      if (!running) return;
      const ease = reduceMotion ? 0.05 : 0.09;
      mouseX += (targetX - mouseX) * ease;
      mouseY += (targetY - mouseY) * ease;

      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, reduceMotion ? 0.0 : elapsed);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibility);
    render();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        maskImage:
          "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
      }}
    />
  );
}
