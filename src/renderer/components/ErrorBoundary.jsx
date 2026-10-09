import { Component } from 'react';

// Catches errors thrown while rendering, so one broken component shows a
// recovery screen instead of a blank window.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    return (
      <div role="alert" className="mx-auto mt-16 max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong.</h1>
        <p className="mt-2 text-sm text-gray-500">{this.state.error.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Reload
        </button>
      </div>
    );
  }
}
