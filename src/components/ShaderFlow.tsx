"use client";

import React, { useEffect, useRef, CSSProperties } from "react";

interface WebGLShaderEffectProps {
  xScale?: number;
  yScale?: number;
  distortion?: number;
  speed?: number;
  style?: CSSProperties;
  className?: string;
}

export default function ShaderFlow({
  xScale = 1.0,
  yScale = 0.5,
  distortion = 0.05,
  speed = 0.01,
  style,
  className = "",
}: WebGLShaderEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    const vertexShaderSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;

        void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            float d = length(p) * distortion;
            
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float baseR = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
            float baseG = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
            float baseB = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
            
            // Zlatá farba RGB (0.9, 0.75, 0.25)
            vec3 goldColor = vec3(0.9, 0.75, 0.25);
            
            // Všetky chromatické vlny do zlatej farby pre elegantný luxusný vzhľad
            vec3 colorR = baseR * goldColor;
            vec3 colorG = baseG * goldColor; 
            vec3 colorB = baseB * goldColor;
            
            vec3 finalColor = colorR + colorG + colorB;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const createShader = (type: number, source: string) => {
      const shader = (gl as WebGLRenderingContext).createShader(type);
      if (!shader) return null;
      (gl as WebGLRenderingContext).shaderSource(shader, source);
      (gl as WebGLRenderingContext).compileShader(shader);
      if (!(gl as WebGLRenderingContext).getShaderParameter(shader, (gl as WebGLRenderingContext).COMPILE_STATUS)) {
        console.error("Shader compilation error:", (gl as WebGLRenderingContext).getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    
    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "resolution"),
      time: gl.getUniformLocation(program, "time"),
      xScale: gl.getUniformLocation(program, "xScale"),
      yScale: gl.getUniformLocation(program, "yScale"),
      distortion: gl.getUniformLocation(program, "distortion"),
    };

    let timeValue = 0;
    let animationId: number;

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    };

    const animate = () => {
      timeValue += speed;
      gl.uniform1f(uniforms.time, timeValue);
      gl.uniform1f(uniforms.xScale, xScale);
      gl.uniform1f(uniforms.yScale, yScale);
      gl.uniform1f(uniforms.distortion, distortion);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      // cleanup webgl context
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [xScale, yScale, distortion, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full block ${className}`}
      style={style}
    />
  );
}
