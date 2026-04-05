import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useAppStore } from '../../store/useAppStore';
import { ScreenNodeComponent } from './ScreenNodeComponent';

export function StageCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  const { handleWheel } = useCanvas();
  const stagePosition = useCanvasStore((state) => state.stagePosition);
  const stageScale = useCanvasStore((state) => state.stageScale);
  const setStagePosition = useCanvasStore((state) => state.setStagePosition);
  
  const projects = useCanvasStore((state) => state.projects);
  const activeProjectId = useCanvasStore((state) => state.activeProjectId);
  const addScreen = useCanvasStore((state) => state.addScreen);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const screens = activeProject?.screens || [];
  const activeTool = useAppStore((state) => state.activeTool);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const stage = containerRef.current?.querySelector('canvas');
    if (!stage) return;
    
    // Simplistic coordinate mapping for drop.
    const pointerPosition = { x: e.clientX, y: e.clientY }; 
    const x = (pointerPosition.x - stagePosition.x) / stageScale;
    const y = (pointerPosition.y - stagePosition.y) / stageScale;

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        
        // load image to get dimensions
        const img = new Image();
        img.onload = () => {
          addScreen({
            id: crypto.randomUUID(),
            position: { x, y },
            size: { width: img.width, height: img.height },
            imageUrl,
            name: file.name
          });
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getCursor = () => {
    if (activeTool === 'hand') return 'grab';
    if (activeTool === 'comment') return 'cell';
    return 'default';
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 bg-[var(--color-surface)] overflow-hidden bg-[radial-gradient(var(--color-outline-variant)_1px,transparent_1px)] [background-size:24px_24px] opacity-80"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ cursor: getCursor() }}
    >
      <Stage
        ref={(node) => {
          if (node) {
            useCanvasStore.getState().setStageRef(node);
          }
        }}
        width={size.width}
        height={size.height}
        onWheel={handleWheel}
        draggable={activeTool === 'hand'}
        x={stagePosition.x}
        y={stagePosition.y}
        scaleX={stageScale}
        scaleY={stageScale}
        onDragEnd={(e) => {
          if (e.target === e.target.getStage()) {
            setStagePosition({ x: e.target.x(), y: e.target.y() });
          }
        }}
      >
        <Layer>
          {screens.length === 0 && (
            <Text
              x={size.width / 2 - 180}
              y={size.height / 2 - 20}
              text="Drag and drop a screenshot here or add one using the toolbar below..."
              fill="rgba(255,255,255,0.4)"
              fontSize={14}
              fontFamily="monospace"
              align="center"
              width={360}
            />
          )}
          {screens.map(s => (
            <ScreenNodeComponent key={s.id} screen={s} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
