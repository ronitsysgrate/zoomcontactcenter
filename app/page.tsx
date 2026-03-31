'use client';

import { useEffect, useRef } from 'react';

const Page = () => {

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const YOUR_DOMAIN = 'https://zoomcontactcenter.vercel.app';

    const embedUrl = `https://zoom.us/cci/callbar/crm/?origin=${encodeURIComponent(YOUR_DOMAIN)}`;

    // Optional: Listen for messages from the iframe (call events, etc.)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Only accept messages from zoom.us
            if (event.origin.includes('zoom.us')) {
                console.log('✅ Zoom Contact Center Event:', event.data);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Zoom Contact Center
                    </h1>
                    <p className="text-gray-600">Embedded Softphone</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="bg-zinc-900 text-white px-6 py-3 flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Live Agent Desktop</span>
                    </div>

                    <iframe
                        ref={iframeRef}
                        src={embedUrl}
                        id="zoom-embeddable-phone-iframe"
                        className="w-full"
                        style={{ height: '700px', minHeight: '580px' }}
                        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
                        allow="autoplay; microphone; camera; display-capture; midi; encrypted-media; clipboard-write"
                    />
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Make sure you replace <code className="bg-gray-100 px-1 rounded">YOUR_DOMAIN</code> with your actual domain (including protocol).
                    <br />
                    Users must be logged into Zoom Contact Center with proper permissions.
                </div>
            </div>
        </div>
    )
}

export default Page