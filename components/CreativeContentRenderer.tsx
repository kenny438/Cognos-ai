import React, { useState, useEffect, useMemo, useRef } from 'react';
import JSZip from 'jszip';
import { type CreativeOutput } from '../types';
import CardsIcon from './icons/CardsIcon';
import GridIcon from './icons/GridIcon';
import LayoutIcon from './icons/LayoutIcon';
import FileCodeIcon from './icons/FileCodeIcon';
import BinaryIcon from './icons/BinaryIcon';
import ImageIcon from './icons/ImageIcon';
import SlidesIcon from './icons/SlidesIcon';
import VisualizationIcon from './icons/VisualizationIcon';
import PlaybookIcon from './icons/PlaybookIcon';
import VideoIcon from './icons/VideoIcon';
import AudioIcon from './icons/AudioIcon';
import DownloadIcon from './icons/DownloadIcon';
import CalculatorIcon from './icons/CalculatorIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

declare const katex: any;

// --- Helper Components ---
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-800 text-white font-mono text-sm rounded-b-lg">
      <button 
        onClick={handleCopy} 
        className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors z-10"
        title="Copy code"
      >
        {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
      </button>
      <pre className="p-4 overflow-x-auto scrollbar-thin">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};


// --- LaTeX Renderer Helper ---
const Latex: React.FC<{ children: string; displayMode?: boolean }> = ({ children, displayMode = false }) => {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (ref.current && typeof katex !== 'undefined') {
            try {
                katex.render(children, ref.current, {
                    throwOnError: false,
                    displayMode,
                });
            } catch (e) {
                console.error("KaTeX render error:", e);
                if (ref.current) {
                  ref.current.textContent = children; // fallback to text
                }
            }
        } else if (ref.current) {
            ref.current.textContent = children;
        }
    }, [children, displayMode]);

    return <span ref={ref} />;
};


// --- Image Viewer ---
const ImageViewer: React.FC<{ data: { base64: string } }> = ({ data }) => {
  return <img src={`data:image/jpeg;base64,${data.base64}`} alt="Generated Image" className="w-full h-auto rounded-b-lg" />;
};


// --- Flashcard Viewer ---
const FlashcardViewer: React.FC<{ data: { front: string; back: string }[] }> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [index]);

  const card = data[index];

  return (
    <div className="w-full">
      <div className="relative w-full h-48 [perspective:1000px] mb-2">
        <div 
          className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer shadow-lg rounded-lg"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute w-full h-full flex items-center justify-center p-4 bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-lg text-center [backface-visibility:hidden]">
            <p className="text-lg font-medium text-[rgb(var(--color-text-primary))]">{card.front}</p>
          </div>
          <div className="absolute w-full h-full flex items-center justify-center p-4 bg-[rgb(var(--color-card-bg-hover))] border border-[rgb(var(--color-border))] rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="text-md text-[rgb(var(--color-text-primary))]">{card.back}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setIndex(prev => (prev > 0 ? prev - 1 : data.length - 1))}
          className="px-3 py-1 text-xs font-semibold text-[rgb(var(--color-text-secondary))] bg-[rgb(var(--color-card-bg-hover))] rounded-md hover:bg-[rgb(var(--color-border))]"
        >
          Prev
        </button>
        <p className="text-xs text-[rgb(var(--color-text-secondary))] font-medium">
          Card {index + 1} of {data.length}
        </p>
        <button
          onClick={() => setIndex(prev => (prev < data.length - 1 ? prev + 1 : 0))}
          className="px-3 py-1 text-xs font-semibold text-[rgb(var(--color-text-secondary))] bg-[rgb(var(--color-card-bg-hover))] rounded-md hover:bg-[rgb(var(--color-border))]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- Slides Viewer ---
const SlidesViewer: React.FC<{ data: { slides: { title: string; content: string[] }[] } }> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const slide = data.slides[index];

  return (
    <div className="w-full bg-gray-700 p-4 rounded-b-lg">
      <div className="aspect-video w-full flex flex-col justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-inner">
        <h4 className="text-3xl font-bold text-gray-800 mb-6">{slide.title}</h4>
        <ul className="list-disc pl-8 space-y-3 text-gray-700 text-lg">
          {slide.content.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-3 px-2">
        <button
          onClick={() => setIndex(prev => (prev > 0 ? prev - 1 : data.slides.length - 1))}
          disabled={data.slides.length <= 1}
          className="px-4 py-2 text-xs font-semibold text-white bg-gray-600/50 rounded-md hover:bg-gray-600/80 disabled:opacity-50 transition-colors"
        >
          Prev
        </button>
        <p className="text-xs text-gray-300 font-medium">
          Slide {index + 1} of {data.slides.length}
        </p>
        <button
          onClick={() => setIndex(prev => (prev < data.slides.length - 1 ? prev + 1 : 0))}
          disabled={data.slides.length <= 1}
          className="px-4 py-2 text-xs font-semibold text-white bg-gray-600/50 rounded-md hover:bg-gray-600/80 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- Visualization Viewer ---
const VisualizationViewer: React.FC<{ data: { svg: string } }> = ({ data }) => {
  return (
    <div className="w-full flex justify-center items-center p-4 bg-[rgb(var(--color-card-bg))] rounded-b-lg">
      <div className="w-full" dangerouslySetInnerHTML={{ __html: data.svg }} />
    </div>
  );
};

// --- Playbook Viewer ---
const PlaybookViewer: React.FC<{ data: { sections: { title: string, steps: string[] }[] } }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.sections.map((section, idx) => (
        <div key={idx} className="border-l-4 border-[rgb(var(--color-primary))] pl-4">
          <h4 className="font-bold text-[rgb(var(--color-text-primary))] text-lg mb-2">{section.title}</h4>
          <ol className="space-y-2 text-[rgb(var(--color-text-secondary))]">
            {section.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-[rgb(var(--color-text-primary))]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

// --- Script Viewer ---
const ScriptViewer: React.FC<{ data: any }> = ({ data }) => {
  const formattedJson = useMemo(() => JSON.stringify(data, null, 2), [data]);
  return <CodeBlock code={formattedJson} language="json" />;
};


// --- Spreadsheet Viewer ---
const SpreadsheetViewer: React.FC<{ data: { headers: string[], rows: string[][] } }> = ({ data }) => {
    return (
        <div className="w-full overflow-x-auto rounded-b-lg border-t border-[rgb(var(--color-border))]">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[rgb(var(--color-card-bg-hover))]">
                    <tr>
                        {data.headers.map((header, i) => (
                            <th key={i} className="px-4 py-3 font-semibold text-[rgb(var(--color-text-primary))] border-b-2 border-[rgb(var(--color-border))]">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-[rgb(var(--color-card-bg))]">
                    {data.rows.map((row, i) => (
                        <tr key={i} className="even:bg-[rgb(var(--color-card-bg-hover))]">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2 border-b border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))]">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Webpage Viewer ---
const WebpageViewer: React.FC<{ data: { html: string, css: string, js: string } }> = ({ data }) => {
    const [activeTab, setActiveTab] = useState('Preview');

    const srcDoc = useMemo(() => {
        return `
            <html>
                <head>
                    <style>${data.css || ''}</style>
                </head>
                <body>
                    ${data.html || ''}
                    <script>${data.js || ''}<\/script>
                </body>
            </html>
        `;
    }, [data]);
    
    const hasHtml = data.html && data.html.trim().length > 0;
    const hasCss = data.css && data.css.trim().length > 0;
    const hasJs = data.js && data.js.trim().length > 0;

    const TabButton = ({ name }: { name: string }) => (
      <button onClick={() => setActiveTab(name)} className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === name ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'}`}>
        {name}
      </button>
    );

    return (
        <div className="w-full bg-gray-800 rounded-b-lg overflow-hidden">
            <div className="bg-gray-700/50 flex border-b border-gray-600">
                <TabButton name="Preview" />
                {hasHtml && <TabButton name="HTML" />}
                {hasCss && <TabButton name="CSS" />}
                {hasJs && <TabButton name="JS" />}
            </div>
            {activeTab === 'Preview' && (
              <div className="bg-white">
                <iframe srcDoc={srcDoc} className="w-full h-80 border-0" sandbox="allow-scripts allow-same-origin" title="Webpage Preview" />
              </div>
            )}
            {activeTab === 'HTML' && hasHtml && <CodeBlock code={data.html} language="html" />}
            {activeTab === 'CSS' && hasCss && <CodeBlock code={data.css} language="css" />}
            {activeTab === 'JS' && hasJs && <CodeBlock code={data.js} language="javascript" />}
        </div>
    );
};


// --- Code Viewer (for React App) ---
const CodeViewer: React.FC<{ data: { jsx: string, css: string } }> = ({ data }) => {
    const [activeTab, setActiveTab] = useState('Preview');
    
    const hasJsx = data.jsx && data.jsx.trim().length > 0;
    const hasCss = data.css && data.css.trim().length > 0;

    const TabButton = ({ name }: { name: string }) => (
      <button onClick={() => setActiveTab(name)} className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === name ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'}`}>
        {name === 'jsx' ? 'Component.jsx' : name === 'css' ? 'styles.css' : name}
      </button>
    );

    return (
        <div className="w-full bg-gray-800 rounded-b-lg overflow-hidden">
            <div className="bg-gray-700/50 flex border-b border-gray-600">
                <TabButton name="Preview" />
                {hasJsx && <TabButton name="jsx" />}
                {hasCss && <TabButton name="css" />}
            </div>
            {activeTab === 'Preview' && (
              <div className="p-6 text-center bg-gray-800 text-gray-300 font-sans">
                <h4 className="font-bold text-white mb-2">Live Preview Not Available</h4>
                <p>React components require a build step to be previewed.</p>
                <p className="mt-2 text-sm text-gray-400">Please download the ZIP file and run it in a local development environment to see it in action.</p>
              </div>
            )}
            {activeTab === 'jsx' && hasJsx && <CodeBlock code={data.jsx} language="jsx" />}
            {activeTab === 'css' && hasCss && <CodeBlock code={data.css} language="css" />}
        </div>
    );
};


// --- Binary Animation Viewer ---
const BinaryAnimationViewer: React.FC<{ data: { frames: string[], width: number, height: number, interval: number } }> = ({ data }) => {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setFrameIndex(prev => (prev + 1) % data.frames.length);
        }, data.interval || 200);
        return () => clearInterval(timer);
    }, [data.frames, data.interval]);

    const currentFrame = data.frames[frameIndex] || '';

    return (
        <div className="p-2 bg-[rgb(var(--color-card-bg-hover))] rounded-b-lg">
            <div 
                className="grid gap-px"
                style={{ gridTemplateColumns: `repeat(${data.width}, 1fr)` }}
            >
                {currentFrame.split('').map((bit, i) => (
                    <div key={i} className={`w-full pb-[100%] ${bit === '1' ? 'bg-[rgb(var(--color-text-primary))]' : 'bg-[rgb(var(--color-card-bg))]'}`} />
                ))}
            </div>
        </div>
    );
};

// --- Math Solution Viewer ---
const MathSolutionViewer: React.FC<{ data: { problem: string; answer: string; steps: { explanation: string; formula: string }[] } }> = ({ data }) => {
  const [showSteps, setShowSteps] = useState(false);

  if (!data || !data.problem) {
    return <div className="p-4 text-sm text-red-600">Invalid mathematical data format.</div>;
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <h4 className="font-bold text-[rgb(var(--color-text-secondary))] text-sm mb-2">Problem</h4>
        <div className="p-4 bg-[rgb(var(--color-card-bg-hover))] border border-[rgb(var(--color-border))] rounded-lg overflow-x-auto text-[rgb(var(--color-text-primary))]">
           <Latex displayMode>{data.problem}</Latex>
        </div>
      </div>
      
      {data.answer && (
        <div>
          <h4 className="font-bold text-[rgb(var(--color-text-secondary))] text-sm mb-2">Final Answer</h4>
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-800 rounded-lg overflow-x-auto">
            <Latex displayMode>{data.answer}</Latex>
          </div>
        </div>
      )}
      
      {data.steps && data.steps.length > 0 && (
        <div>
          <button 
            onClick={() => setShowSteps(!showSteps)}
            className="w-full text-left px-4 py-2 bg-[rgb(var(--color-card-bg-hover))] border border-[rgb(var(--color-border))] rounded-lg text-sm font-semibold flex justify-between items-center text-[rgb(var(--color-text-primary))]"
          >
            <span>Step-by-Step Solution</span>
            <svg className={`w-4 h-4 transition-transform ${showSteps ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showSteps && (
            <div className="mt-2 border border-[rgb(var(--color-border))] rounded-lg divide-y divide-[rgb(var(--color-border))] animate-fade-in">
              {data.steps.map((step, index) => (
                <div key={index} className="p-4">
                  <p className="font-semibold text-sm mb-2 text-[rgb(var(--color-text-primary))]">
                    <span className="text-[rgb(var(--color-text-accent))]">Step {index + 1}:</span> {step.explanation}
                  </p>
                  <div className="p-3 bg-[rgb(var(--color-card-bg))] rounded-md overflow-x-auto text-[rgb(var(--color-text-primary))]">
                     <Latex displayMode>{step.formula}</Latex>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// --- Main Renderer Component ---
const CreativeContentRenderer: React.FC<{ output: CreativeOutput }> = ({ output }) => {
    const { type, title, data } = output;

    const slugify = (text: string) => {
      return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w-]+/g, '')      // Remove all non-word chars
          .replace(/--+/g, '-')          // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
    };

    const downloadBlob = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const handleDownload = async () => {
      if (!data) return;
      const filenameBase = slugify(title) || 'cognos-creation';
      let blob: Blob;
      let filename: string;

      switch (type) {
          case 'image':
              const mimeType = 'image/jpeg';
              const res = await fetch(`data:${mimeType};base64,${data.base64}`);
              blob = await res.blob();
              filename = `${filenameBase}.jpg`;
              break;
              
          case 'flashcards':
              const csvFlashcards = 'front,back\n' + data.map((d: any) => `"${d.front.replace(/"/g, '""')}","${d.back.replace(/"/g, '""')}"`).join('\n');
              blob = new Blob([csvFlashcards], { type: 'text/csv;charset=utf-8;' });
              filename = `${filenameBase}.csv`;
              break;
              
          case 'spreadsheet':
              const csvSheet = data.headers.join(',') + '\n' + data.rows.map((row: string[]) => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
              blob = new Blob([csvSheet], { type: 'text/csv;charset=utf-8;' });
              filename = `${filenameBase}.csv`;
              break;
              
          case 'webpage':
              const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${data.css || ''}</style>
</head>
<body>
    ${data.html || ''}
    <script>${data.js || ''}<\/script>
</body>
</html>`;
              blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
              filename = `${filenameBase}.html`;
              break;

          case 'react_app':
              const zip = new JSZip();
              zip.file('Component.jsx', data.jsx);
              if (data.css) {
                  zip.file('styles.css', data.css);
              }
              blob = await zip.generateAsync({ type: 'blob' });
              filename = `${filenameBase}.zip`;
              break;
          
          case 'visualization':
              blob = new Blob([data.svg], { type: 'image/svg+xml;charset=utf-8;' });
              filename = `${filenameBase}.svg`;
              break;

          case 'math_solution':
              const mathSteps = data.steps.map((s: any, i: number) => `Step ${i+1}: ${s.explanation}\n${s.formula}`).join('\n\n');
              const mathText = `Problem:\n${data.problem}\n\nFinal Answer:\n${data.answer}\n\n---\n\nStep-by-Step Solution:\n${mathSteps}`;
              blob = new Blob([mathText], { type: 'text/plain;charset=utf-8;' });
              filename = `${filenameBase}.txt`;
              break;

          case 'playbook':
          case 'video_script':
          case 'audio_script':
              const textContent = JSON.stringify(data, null, 2);
              blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
              filename = `${filenameBase}.txt`;
              break;

          default: // For any other type, download the raw JSON
              const jsonContent = JSON.stringify(data, null, 2);
              blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
              filename = `${filenameBase}.json`;
              break;
      }
      
      downloadBlob(blob, filename);
    };


    const renderContent = () => {
        switch (type) {
            case 'image':
                return <ImageViewer data={data} />;
            case 'flashcards':
                return <FlashcardViewer data={data} />;
            case 'slides':
                return <SlidesViewer data={data} />;
            case 'spreadsheet':
                return <SpreadsheetViewer data={data} />;
            case 'visualization':
                return <VisualizationViewer data={data} />;
            case 'playbook':
                return <PlaybookViewer data={data} />;
            case 'video_script':
            case 'audio_script':
                return <ScriptViewer data={data} />;
            case 'webpage':
                return <WebpageViewer data={data} />;
            case 'react_app':
                return <CodeViewer data={data} />;
            case 'binary_animation':
                return <BinaryAnimationViewer data={data} />;
            case 'math_solution':
                return <MathSolutionViewer data={data} />;
            default:
                return (
                    <div className="w-full bg-gray-800 rounded-b-lg overflow-hidden font-mono text-sm">
                        <pre className="p-4 text-white overflow-x-auto">
                            <code>{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    </div>
                );
        }
    };
    
    const getIcon = () => {
        switch(type) {
            case 'image': return <ImageIcon className="w-5 h-5" />;
            case 'flashcards': return <CardsIcon className="w-5 h-5" />;
            case 'slides': return <SlidesIcon className="w-5 h-5" />;
            case 'spreadsheet': return <GridIcon className="w-5 h-5" />;
            case 'visualization': return <VisualizationIcon className="w-5 h-5" />;
            case 'playbook': return <PlaybookIcon className="w-5 h-5" />;
            case 'video_script': return <VideoIcon className="w-5 h-5" />;
            case 'audio_script': return <AudioIcon className="w-5 h-5" />;
            case 'webpage': return <LayoutIcon className="w-5 h-5" />;
            case 'react_app': return <FileCodeIcon className="w-5 h-5" />;
            case 'binary_animation': return <BinaryIcon className="w-5 h-5" />;
            case 'math_solution': return <CalculatorIcon className="w-5 h-5" />;
            default: return <FileCodeIcon className="w-5 h-5" />;
        }
    };

    const needsPadding = !['webpage', 'react_app', 'image', 'visualization', 'spreadsheet', 'slides', 'video_script', 'audio_script'].includes(type);

    return (
        <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden animate-fade-in">
            <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))] flex justify-between items-center">
                <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2 truncate pr-2">
                    {getIcon()}
                    <span className="truncate">{title}</span>
                </h3>
                <button 
                  onClick={handleDownload} 
                  title="Download Content" 
                  className="p-1.5 rounded-full text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-card-bg))] hover:text-[rgb(var(--color-text-primary))] transition-colors flex-shrink-0"
                  aria-label="Download content"
                >
                    <DownloadIcon className="w-4 h-4" />
                </button>
            </div>
            <div className={needsPadding ? 'p-4' : ''}>
                {renderContent()}
            </div>
        </div>
    );
};

export default CreativeContentRenderer;
