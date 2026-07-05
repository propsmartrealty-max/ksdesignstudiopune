import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Check if it's a chunk loading error (common after deployments)
    if (error.name === 'ChunkLoadError' || error.message.includes('Failed to fetch dynamically imported module')) {
      // Force a hard reload to get the latest chunks
      window.location.reload();
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center">
             <h2 className="text-2xl font-black text-charcoal mb-4">Optimizing Neural Link...</h2>
             <p className="text-stone-500 mb-8">We are synchronizing the latest architectural modules.</p>
             <button 
                onClick={() => window.location.reload()}
                className="bg-brass text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-charcoal transition-all"
             >
                Force Sync
             </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
