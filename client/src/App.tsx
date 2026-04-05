
import { StageCanvas } from './components/canvas/StageCanvas';
import { ProviderSettings } from './components/panels/ProviderSettings';
import { Header } from './components/panels/Header';
import { FloatingToolbar } from './components/panels/FloatingToolbar';
import { ProjectSidebar } from './components/panels/ProjectSidebar';

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--color-surface)] font-sans">
      <Header />
      <ProjectSidebar />
      <StageCanvas />
      <FloatingToolbar />
      <ProviderSettings />
    </div>
  );
}

export default App;
