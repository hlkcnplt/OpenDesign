import { useEffect } from 'react';
import { useProvider } from '../../hooks/useProvider';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X } from 'lucide-react';
import { AIProvider } from '../../types';

export function ProviderSettings() {
  const isSettingsOpen = useAppStore((state) => state.isSettingsOpen);
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen);
  
  const { 
    provider, apiKey, localEndpoint, modelName,
    updateProvider, setApiKey, setLocalEndpoint, setModelName, isConfigured 
  } = useProvider();

  useEffect(() => {
    if (!isConfigured()) {
      setSettingsOpen(true);
    }
  }, [isConfigured, setSettingsOpen]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md p-6 rounded-2xl glass-panel text-left flex flex-col gap-8 shadow-2xl border border-[var(--color-outline-variant)]/20">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-white tracking-tight">Intelligence Config</h2>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mt-1">Select Provider</p>
          </div>
          {isConfigured() && (
            <button 
              onClick={() => setSettingsOpen(false)}
              className="p-2 -mr-2 text-[var(--color-on-surface-variant)] hover:text-white transition-colors rounded-full hover:bg-[var(--color-surface-container-high)]"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-1 p-1 bg-[var(--color-surface-container-lowest)] rounded-xl border border-[var(--color-outline-variant)]/20 shadow-inner">
            {(Object.values(AIProvider)).map((p) => (
              <button
                key={p}
                onClick={() => updateProvider(p)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  provider === p 
                    ? 'bg-[var(--color-surface-container-high)] text-white shadow-md' 
                    : 'text-[var(--color-on-surface-variant)] hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {provider === 'LOCAL' ? (
              <>
                <Input 
                  label="Local Endpoint" 
                  value={localEndpoint}
                  onChange={(e) => setLocalEndpoint(e.target.value)}
                  placeholder="http://localhost:11434/v1"
                />
                <Input 
                  label="Model Name" 
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="qwen2.5-vl"
                />
              </>
            ) : (
              <Input 
                label={`${provider} API Key`} 
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                autoComplete="off"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={() => setSettingsOpen(false)} 
            disabled={!isConfigured()}
            fullWidth
          >
            Confirm Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
