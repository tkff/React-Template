import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from './ui-store';

describe('useUIStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUIStore.setState({
      sidebarOpen: true,
      theme: 'system',
    });
  });

  it('has correct initial state', () => {
    const state = useUIStore.getState();
    expect(state.sidebarOpen).toBe(true);
    expect(state.theme).toBe('system');
  });

  it('toggleSidebar toggles sidebar state', () => {
    const { toggleSidebar } = useUIStore.getState();

    expect(useUIStore.getState().sidebarOpen).toBe(true);
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('setSidebarOpen sets sidebar state directly', () => {
    const { setSidebarOpen } = useUIStore.getState();

    setSidebarOpen(false);
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    setSidebarOpen(true);
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('setTheme updates theme correctly', () => {
    const { setTheme } = useUIStore.getState();

    setTheme('dark');
    expect(useUIStore.getState().theme).toBe('dark');

    setTheme('light');
    expect(useUIStore.getState().theme).toBe('light');

    setTheme('system');
    expect(useUIStore.getState().theme).toBe('system');
  });
});
