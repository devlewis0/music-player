import React, { useEffect, useRef } from 'react';
import './Visualizer.css';

const Visualizer = ({ audioRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      context.fillStyle = '#121212';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        context.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw();
  }, [audioRef]);

  return <canvas ref={canvasRef} className="visualizer" />;
};

export default Visualizer;
