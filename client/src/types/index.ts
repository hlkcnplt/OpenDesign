// Provider Enums/Unions
export const AIProvider = {
  GEMINI: 'GEMINI',
  OPENAI: 'OPENAI',
  LOCAL: 'LOCAL',
} as const;

export type AIProvider = typeof AIProvider[keyof typeof AIProvider];

export interface ProviderState {
  provider: AIProvider;
  apiKey: string;
  localEndpoint: string;
  modelName: string;
}

export interface ProviderActions {
  setProvider: (provider: AIProvider) => void;
  setApiKey: (key: string) => void;
  setLocalEndpoint: (url: string) => void;
  setModelName: (name: string) => void;
}

export type ProviderStore = ProviderState & ProviderActions;

// Canvas Objects
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface AnnotationResult {
  x: number;
  y: number;
  issue: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface ScreenNode {
  id: string;
  position: Position;
  size: Size;
  imageUrl: string;
  name: string;
  annotations?: AnnotationResult[];
}

export interface Project {
  id: string;
  name: string;
  screens: ScreenNode[];
}

// Global App UI State
export type ActiveTool = 'select' | 'hand' | 'comment';

export interface AppState {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  activeTool: ActiveTool;
}

export interface AppActions {
  setSidebarOpen: (isOpen: boolean) => void;
  setSettingsOpen: (isOpen: boolean) => void;
  setActiveTool: (tool: ActiveTool) => void;
}

export type AppStore = AppState & AppActions;

// API Models
export interface AnalysisRequest {
  screenId: string;
  provider: AIProvider;
  apiKey: string;
  imageBase64: string;
  localEndpoint?: string;
  modelName?: string;
}

export interface AnalysisResult {
  provider_used: string;
  model_version: string;
  annotations: AnnotationResult[];
  raw_response: any;
}
