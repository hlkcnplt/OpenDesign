import { useCallback } from 'react';
import { useProviderStore } from '../store/useProviderStore';
import type { AIProvider } from '../types';

export function useProvider() {
  const provider = useProviderStore((state) => state.provider);
  const apiKey = useProviderStore((state) => state.apiKey);
  const localEndpoint = useProviderStore((state) => state.localEndpoint);
  const modelName = useProviderStore((state) => state.modelName);
  
  const setProvider = useProviderStore((state) => state.setProvider);
  const setApiKey = useProviderStore((state) => state.setApiKey);
  const setLocalEndpoint = useProviderStore((state) => state.setLocalEndpoint);
  const setModelName = useProviderStore((state) => state.setModelName);

  const updateProvider = useCallback((newProvider: AIProvider) => {
    setProvider(newProvider);
    if (newProvider !== provider) {
      setApiKey('');
    }
  }, [provider, setProvider, setApiKey]);

  const isConfigured = useCallback(() => {
    if (provider === 'LOCAL') {
      return localEndpoint.trim().length > 0;
    }
    return apiKey.trim().length > 0;
  }, [provider, apiKey, localEndpoint]);

  return {
    provider,
    apiKey,
    localEndpoint,
    modelName,
    updateProvider,
    setApiKey,
    setLocalEndpoint,
    setModelName,
    isConfigured
  };
}
