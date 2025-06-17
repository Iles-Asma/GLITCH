"use client";

import React, { useEffect, useRef } from 'react';
import styles from './Loader.module.css';
import gsap from 'gsap';

interface LoaderProps {
  onLoaded?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const terminalOutputRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const terminalScreenRef = useRef<HTMLDivElement>(null);
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const terminalTextSequence = [
      "Loading net_history.sys...",
      "\n\n",
      "Initializing core modules [OK]",
      "\nLoading network protocols [OK]",
      "\nEstablishing connection [DONE]",
      "\n\nFetching historical data...",
      "\nAccess granted. Initiating visual playback...",
      "\n\n>> Commencing World Wide Web Chronology <<",
      "\n\n\n"
    ];

    let currentText = "";
    let charIndex = 0;
    let sequenceIndex = 0;

    const typeChar = () => {
      if (sequenceIndex < terminalTextSequence.length) {
        const line = terminalTextSequence[sequenceIndex];
        if (charIndex < line.length) {
          currentText += line.charAt(charIndex);
          if (terminalOutputRef.current) {
            terminalOutputRef.current.innerHTML = currentText.replace(/./g, '<span class="glitch" data-text="$&">$&</span>');
          }
          charIndex++;
          setTimeout(typeChar, Math.random() * 50 + 20);
        } else {
          sequenceIndex++;
          charIndex = 0;
          setTimeout(typeChar, 300);
        }
      } else {
        setTimeout(() => {
          if (terminalScreenRef.current) {
            terminalScreenRef.current.style.opacity = '0';
          }
          setTimeout(() => {
            if (loaderContainerRef.current) {
              loaderContainerRef.current.style.display = 'none';
              if (onLoaded) {
                onLoaded();
              }
            }
          }, 1000);
        }, 1000);
      }
    };

    typeChar();

    // Initialize canvas for noise effect
    const resizeCanvas = () => {
      if (noiseCanvasRef.current) {
        noiseCanvasRef.current.width = window.innerWidth;
        noiseCanvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const generateNoise = () => {
      if (noiseCanvasRef.current) {
        const ctx = noiseCanvasRef.current.getContext('2d');
        if (ctx) {
          const imageData = ctx.createImageData(noiseCanvasRef.current.width, noiseCanvasRef.current.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 255;
          }

          ctx.putImageData(imageData, 0, 0);
        }
      }
    };

    generateNoise();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onLoaded]);

  return (
    <div id="loader-container" className={styles.loaderContainer} ref={loaderContainerRef}>
      <div id="terminal-screen" className={styles.terminalScreen} ref={terminalScreenRef}>
        <pre id="terminal-output" className={styles.terminalOutput} ref={terminalOutputRef}></pre>
        <span id="cursor" className={styles.cursor} ref={cursorRef}></span>
      </div>
      <canvas id="noise-canvas" className={styles.noiseCanvas} ref={noiseCanvasRef}></canvas>
    </div>
  );
};

export default Loader;
