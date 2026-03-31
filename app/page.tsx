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
        <div className="h-screen w-screen">
            <iframe
                ref={iframeRef}
                src={embedUrl}
                id="zoom-embeddable-phone-iframe"
                className="w-full h-full"
                sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
                allow="autoplay; microphone; camera; display-capture; midi; encrypted-media; clipboard-write"
            />
        </div>
    )
}

export default Page