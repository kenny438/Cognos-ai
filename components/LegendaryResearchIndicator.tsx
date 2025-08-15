import React, { useState, useEffect } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';
import CheckIcon from './icons/CheckIcon';

const researchSteps = [
  'Deconstructing User Directive',
  'Formulating Research Trajectories',
  'Accessing Academic Databases (JSTOR, arXiv)',
  'Cross-Referencing Scholarly Publications',
  'Querying Primary Search Indices (Google Scholar)',
  'Analyzing Real-time Data Streams',
  'Synthesizing Multi-faceted Findings',
  'Constructing Foundational Arguments',
  'Drafting Dissertation...'
];

const LegendaryResearchIndicator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev < researchSteps.length - 1 ? prev + 1 : prev));
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[rgb(var(--color-card-bg)/0.6)] backdrop-blur-xl border border-[rgb(var(--color-border)/0.5)] rounded-lg p-4 w-full mb-2 animate-fade-in">
            <h3 className="text-base font-semibold text-[rgb(var(--color-text-primary))] mb-4">Engaging Legendary Research Protocol...</h3>
            <div className="space-y-2.5">
                {researchSteps.map((step, index) => (
                    <div key={index} className={`flex items-center gap-3 text-sm transition-all duration-500 ${index > currentStep ? 'opacity-40' : 'opacity-100'}`}>
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            {index < currentStep ? (
                                <CheckIcon className="w-4 h-4 text-green-500" />
                            ) : (
                                <SpinnerIcon className={`w-4 h-4 text-[rgb(var(--color-primary))] ${index === currentStep ? 'animate-spin' : 'opacity-0'}`} />
                            )}
                        </div>
                        <span className={`${index < currentStep ? 'text-[rgb(var(--color-text-secondary))] line-through' : 'text-[rgb(var(--color-text-primary))]'}`}>{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegendaryResearchIndicator;