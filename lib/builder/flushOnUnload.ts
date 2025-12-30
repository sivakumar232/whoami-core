// Flush all pending saves before page unload
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        // Get all pending updates
        const pendingKeys = Object.keys(globalThis).filter(key => key.startsWith('pending_'));

        if (pendingKeys.length > 0) {
            console.log('Flushing pending saves before unload:', pendingKeys.length);

            // Use sendBeacon for reliable delivery
            pendingKeys.forEach(key => {
                const id = key.replace('pending_', '');
                const updates = (globalThis as any)[key];

                if (updates) {
                    const data = JSON.stringify({ id, ...updates });
                    navigator.sendBeacon('/api/elements', data);
                }
            });
        }
    });
}

export { }
