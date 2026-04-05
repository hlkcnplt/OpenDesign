import { useState, useCallback } from 'react';
import { apiClient } from '../api/client';
import { useProviderStore } from '../store/useProviderStore';
import { useCanvasStore } from '../store/useCanvasStore';
import type { ScreenNode } from '../types';

export function useAIAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const provider = useProviderStore((state) => state.provider);
  const apiKey = useProviderStore((state) => state.apiKey);
  const localEndpoint = useProviderStore((state) => state.localEndpoint);
  const modelName = useProviderStore((state) => state.modelName);
  


  // We reuse updateScreenPosition but really we should have a generic updateScreen,
  // let's expand useCanvasStore via the canvas hook if needed, but for now we can access Zustand set directly or add a new action.
  
  const analyze = useCallback(async (screen: ScreenNode, imageBase64: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      if (provider !== 'LOCAL' && !apiKey) {
        throw new Error('API Key is missing for cloud provider.');
      }

      const payload = {
        screenId: screen.id,
        provider,
        apiKey,
        localEndpoint,
        modelName,
        imageBase64
      };

      const result = await apiClient.analyzeScreen(payload);
      
      // Update screen with annotations
      useCanvasStore.setState((state) => ({
        screens: state.screens.map(s => 
          s.id === screen.id ? { ...s, annotations: result.annotations } : s
        )
      }));

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [provider, apiKey, localEndpoint, modelName]);

  return { analyze, isAnalyzing, error };
}
