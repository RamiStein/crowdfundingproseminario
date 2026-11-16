import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CrowdfundingLanding } from './components/landing/CrowdfundingLanding';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <>
      <CrowdfundingLanding />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs backdrop-blur-md border border-stone-700 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
