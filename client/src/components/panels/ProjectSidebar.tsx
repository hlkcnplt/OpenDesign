import { useState, useRef, useEffect } from 'react';
import { FolderOpen, Plus, MoreVertical, X, Trash, Edit2, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useCanvasStore } from '../../store/useCanvasStore';

export function ProjectSidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  
  const projects = useCanvasStore((state) => state.projects);
  const activeProjectId = useCanvasStore((state) => state.activeProjectId);
  const addProject = useCanvasStore((state) => state.addProject);
  const setActiveProject = useCanvasStore((state) => state.setActiveProject);
  const renameProject = useCanvasStore((state) => state.renameProject);
  const deleteProject = useCanvasStore((state) => state.deleteProject);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  
  // To avoid scroll clipping, store coordinates for the popover
  const [menuConfig, setMenuConfig] = useState<{ id: string, top: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  if (!isSidebarOpen) return null;

  const handleCreate = () => {
    addProject(`New Project ${projects.length + 1}`);
  };

  const handleRenameSubmit = () => {
    if (editingId && editName.trim()) {
      renameProject(editingId, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div 
        id="project-sidebar-panel"
        className="absolute top-16 left-4 z-50 w-64 glass-panel rounded-2xl border border-[var(--color-outline-variant)]/20 shadow-2xl flex flex-col transition-all text-[var(--color-on-surface)]" 
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onMouseLeave={() => setMenuConfig(null)}
    >
      
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-outline-variant)]/20 flex items-center justify-between z-10 bg-[#19191b]/80 rounded-t-2xl">
        <h2 className="text-sm font-semibold tracking-tight">Projects</h2>
        <div className="flex gap-1">
            <button onClick={handleCreate} className="p-1 hover:bg-[#262627] rounded-md transition-colors" title="New Project">
              <Plus size={16} />
            </button>
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-[#262627] rounded-md transition-colors" title="Close">
              <X size={16} />
            </button>
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide" onScroll={() => setMenuConfig(null)}>
        <div className="flex flex-col gap-1">
          {projects.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <div 
                key={project.id} 
                className={`relative group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-[var(--color-surface-container-high)] border border-[var(--color-primary)]/30' : 'hover:bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'}`}
                onClick={() => {
                  if (editingId !== project.id) setActiveProject(project.id);
                }}
              >
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                  <FolderOpen size={16} className={isActive ? "text-[var(--color-primary)]" : ""} />
                  
                  {editingId === project.id ? (
                    <input 
                      ref={inputRef}
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={handleRenameSubmit}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="bg-transparent border-none outline-none text-xs font-medium w-full text-white min-w-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-xs font-medium truncate min-w-0 flex-1">{project.name}</span>
                  )}
                </div>

                {/* Actions: Checkmark or Dropdown */}
                {editingId === project.id ? (
                  <button 
                    className="p-1 hover:bg-[#333336] rounded text-[var(--color-primary)] transition-all flex-shrink-0"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents input onBlur from firing too early
                      e.stopPropagation();
                      handleRenameSubmit();
                    }}
                  >
                    <Check size={14} />
                  </button>
                ) : (
                  <div className="relative flex-shrink-0">
                    <button 
                      className={`p-1 hover:bg-[#333336] rounded transition-all ${menuConfig?.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Get boundary constraints
                        const rect = e.currentTarget.getBoundingClientRect();
                        const sidebarRect = document.getElementById('project-sidebar-panel')?.getBoundingClientRect() || { top: 0, left: 0 };
                        
                        // Set coords relative to the sidebar top edge
                        setMenuConfig(menuConfig?.id === project.id ? null : {
                            id: project.id,
                            top: rect.bottom - sidebarRect.top,
                        });
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Popover (Outside scroll boundary to prevent clipping) */}
      {menuConfig && (
          <div 
            className="absolute z-[60] w-32 bg-[#1e1e20] border border-[var(--color-outline-variant)]/40 rounded-lg shadow-xl overflow-hidden" 
            style={{ 
                top: `${menuConfig.top + 4}px`, 
                right: '12px' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="w-full text-left px-3 py-2 text-xs hover:bg-[#262627] flex items-center gap-2"
              onClick={() => {
                const proj = projects.find(p => p.id === menuConfig.id);
                if (proj) {
                    setEditName(proj.name);
                    setEditingId(proj.id);
                }
                setMenuConfig(null);
              }}
            >
              <Edit2 size={12} /> Rename
            </button>
            <button 
              className="w-full text-left px-3 py-2 text-xs hover:bg-[#262627] text-red-400 flex items-center gap-2"
              onClick={() => {
                deleteProject(menuConfig.id);
                setMenuConfig(null);
              }}
            >
              <Trash size={12} /> Delete
            </button>
          </div>
      )}

    </div>
  );
}
