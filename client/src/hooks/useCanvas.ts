import { useCallback } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';
import type { KonvaEventObject } from 'konva/lib/Node';

const SCALE_BY = 1.1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 5;

export function useCanvas() {
  const stagePosition = useCanvasStore((state) => state.stagePosition);
  const stageScale = useCanvasStore((state) => state.stageScale);
  const setStagePosition = useCanvasStore((state) => state.setStagePosition);
  const setStageScale = useCanvasStore((state) => state.setStageScale);

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    let newScale = direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
    
    newScale = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));

    setStageScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    
    setStagePosition(newPos);
  }, [setStagePosition, setStageScale]);

  return {
    stagePosition,
    stageScale,
    handleWheel,
    setStagePosition
  };
}
