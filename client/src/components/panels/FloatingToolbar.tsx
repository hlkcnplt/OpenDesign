import React from 'react';
import { MousePointer2, Hand, MessageSquare, ImagePlus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useCanvasStore } from '../../store/useCanvasStore';
import type { ActiveTool } from '../../types';

export function FloatingToolbar() {
  const activeTool = useAppStore((state) => state.activeTool);
  const setActiveTool = useAppStore((state) => state.setActiveTool);
  const addScreen = useCanvasStore((state) => state.addScreen);
  const stagePosition = useCanvasStore((state) => state.stagePosition);

  const tools: { id: ActiveTool; icon: React.ElementType; label: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'hand', icon: Hand, label: 'Pan' },
    { id: 'comment', icon: MessageSquare, label: 'Comment' },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-panel flex items-center gap-1.5 p-2 rounded-2xl shadow-xl border border-[var(--color-outline-variant)]/20 ghost-border">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#1e1e20] text-[var(--color-primary)] shadow-sm scale-105' 
                  : 'text-[var(--color-on-surface-variant)] hover:text-white hover:bg-[var(--color-surface-container-low)]'
              }`}
              title={tool.label}
            >
              <tool.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}

        <div className="w-[1px] h-8 bg-[var(--color-outline-variant)]/30 mx-1"></div>

        <label className="w-11 h-11 flex items-center justify-center rounded-xl text-[var(--color-on-surface-variant)] hover:text-white hover:bg-[var(--color-surface-container-low)] cursor-pointer transition-all duration-200" title="Add Image">
          <ImagePlus size={20} strokeWidth={2} />
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                const img = new Image();
                img.onload = () => {
                  addScreen({
                   id: Date.now().toString(),
                   name: file.name,
                   imageUrl,
                   position: { x: -stagePosition.x + document.documentElement.clientWidth / 2 - img.width / 2, y: -stagePosition.y + document.documentElement.clientHeight / 2 - img.height / 2 },
                   size: { width: img.width, height: img.height },
                  });
                };
                img.src = imageUrl;
              };
              reader.readAsDataURL(file);
              e.target.value = '';
            }} 
          />
        </label>
      </div>
    </div>
  );
}
