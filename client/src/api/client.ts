import type { AnalysisRequest, AnalysisResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiClient = {
  analyzeScreen: async (payload: AnalysisRequest): Promise<AnalysisResult> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.error || `API Error: ${response.statusText}`);
    }

    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.data;
  }
};
