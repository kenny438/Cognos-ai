
import React, { useState, useCallback, useEffect } from 'react';
import CopyIcon from './icons/CopyIcon';
import RefreshIcon from './icons/RefreshIcon';
import CheckIcon from './icons/CheckIcon';

const ApiPage: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('javascript');

    const generateApiKey = useCallback(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = 'cgs_';
        for (let i = 0; i < 48; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setApiKey(key);
    }, []);

    useEffect(() => {
        generateApiKey();
    }, [generateApiKey]);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const jsSnippet = `import { GoogleGenAI } from "@google/genai";

// NOTE: This is a client-side implementation example.
// For production, always handle API keys securely on a server.
const ai = new GoogleGenAI({ apiKey: "${apiKey}" });

async function runCognosQuery(prompt) {
    try {
        // For simple text generation
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log("Response:", response.text);

        // For answers with Google Search grounding (like Cognos)
        const sourcedResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        console.log("Sourced Response:", sourcedResponse.text);
        console.log("Sources:", sourcedResponse.candidates?.[0]?.groundingMetadata?.groundingChunks);

    } catch(e) {
        console.error("Error calling Cognos API:", e);
    }
}

runCognosQuery("Who won the most recent F1 championship?");
`;

    const curlSnippet = `curl "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}" \\
    -H 'Content-Type: application/json' \\
    -d '{
      "contents": [{
        "parts":[{
          "text": "Who won the most recent F1 championship?"
        }]
      }],
      "config": {
        "tools": [{"googleSearch":{}}]
      }
    }'`;


    return (
        <main className="flex-1 bg-[rgb(var(--color-bg))] overflow-y-auto p-6 md:p-8 scrollbar-thin">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[rgb(var(--color-text-primary))] tracking-tight mb-3">Integrate Cognos AI</h1>
                    <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-3xl">
                        Bring the power of AI-driven search, synthesis, and creation to your own applications using the underlying Google Gemini API.
                    </p>
                </header>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-4">Your API Key</h2>
                    <div className="bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <code className="font-mono text-sm text-[rgb(var(--color-text-accent))] bg-[rgb(var(--color-card-bg-hover))] p-2 rounded-md break-all flex-1">
                            {apiKey}
                        </code>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <button onClick={generateApiKey} className="p-2 rounded-md hover:bg-[rgb(var(--color-card-bg-hover))]" title="Regenerate Key">
                                <RefreshIcon className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
                            </button>
                            <button onClick={handleCopy} className="p-2 rounded-md hover:bg-[rgb(var(--color-card-bg-hover))]" title="Copy Key">
                                {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />}
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-3">
                        <strong>Note:</strong> This is a sample client-side key for demonstration. For production applications, you should obtain your own API key from Google AI Studio and manage it securely on a backend server to avoid exposing it in the browser.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-4">Usage Example</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden border border-[rgb(var(--color-border))]">
                        <div className="bg-gray-700/50 flex border-b border-gray-600">
                            <button onClick={() => setActiveTab('javascript')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'javascript' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}>JavaScript</button>
                            <button onClick={() => setActiveTab('curl')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'curl' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}>cURL</button>
                        </div>
                        <div className="p-4">
                            <pre className="text-white text-xs md:text-sm whitespace-pre-wrap overflow-x-auto scrollbar-thin">
                                <code>{activeTab === 'javascript' ? jsSnippet : curlSnippet}</code>
                            </pre>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ApiPage;
