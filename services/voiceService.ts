
import { type Persona } from '../types';

let voices: SpeechSynthesisVoice[] = [];

/**
 * Loads and caches the available speech synthesis voices from the browser.
 */
export function loadVoices() {
  const updateVoices = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // console.log('Speech synthesis voices loaded:', voices.length);
    }
  };
  
  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

interface VoicePrefs {
  lang: string;
  gender?: 'female' | 'male';
  nameKeywords?: string[];
}

interface PersonaConfig {
  pitch: number;
  rate: number;
  voicePrefs: VoicePrefs;
}

const personaConfigs: Record<Persona, PersonaConfig> = {
  default:        { pitch: 1, rate: 1, voicePrefs: { lang: 'en-US', gender: 'female' } },
  unhinged:       { pitch: 1.4, rate: 1.25, voicePrefs: { lang: 'en-US', gender: 'female', nameKeywords: ['zira', 'samantha'] } },
  storyteller:    { pitch: 1, rate: 0.9, voicePrefs: { lang: 'en-GB', gender: 'male' } },
  romantic:       { pitch: 0.8, rate: 0.8, voicePrefs: { lang: 'en-US', gender: 'female', nameKeywords: ['google', 'samantha'] } },
  genius:         { pitch: 1, rate: 1, voicePrefs: { lang: 'en-GB', gender: 'male', nameKeywords: ['daniel', 'david'] } },
  conspiracy:     { pitch: 1.1, rate: 1.15, voicePrefs: { lang: 'en-US', gender: 'male' } },
  therapist:      { pitch: 0.9, rate: 0.9, voicePrefs: { lang: 'en-US', gender: 'female' } },
  grok_doc:       { pitch: 1, rate: 1, voicePrefs: { lang: 'en-GB', gender: 'female' } },
  meditation:     { pitch: 0.7, rate: 0.75, voicePrefs: { lang: 'en-US', gender: 'female' } },
  sexy:           { pitch: 0.8, rate: 0.9, voicePrefs: { lang: 'en-US', gender: 'female' } },
  professor:      { pitch: 0.9, rate: 0.95, voicePrefs: { lang: 'en-GB', gender: 'male' } },
  code_wizard:    { pitch: 1.1, rate: 1.1, voicePrefs: { lang: 'en-US', gender: 'male', nameKeywords: ['google'] } },
  historian:      { pitch: 0.9, rate: 0.85, voicePrefs: { lang: 'en-GB', gender: 'male' } },
  comedian:       { pitch: 1.2, rate: 1.15, voicePrefs: { lang: 'en-AU', gender: 'female' } },
  fitness_coach:  { pitch: 1.2, rate: 1.1, voicePrefs: { lang: 'en-US', gender: 'female' } },
  kanye_west:     { pitch: 1, rate: 1.05, voicePrefs: { lang: 'en-US', gender: 'male' } },
  movie_buff:     { pitch: 1, rate: 1.05, voicePrefs: { lang: 'en-US', gender: 'male' } },
  music_snob:     { pitch: 0.95, rate: 1, voicePrefs: { lang: 'en-GB', gender: 'male' } },
  drill_sergeant: { pitch: 1.3, rate: 1.2, voicePrefs: { lang: 'en-US', gender: 'male', nameKeywords: ['david'] } },
  ghostwriter:    { pitch: 1, rate: 1.05, voicePrefs: { lang: 'en-US', gender: 'male' } },
};

/**
 * Finds the best available voice based on a configuration using a scoring system.
 * @param prefs The desired voice preferences.
 * @returns The best-matching SpeechSynthesisVoice object or null.
 */
function findBestVoice(prefs: VoicePrefs): SpeechSynthesisVoice | null {
    if (!voices.length) return null;

    let bestScore = -1;
    let bestVoice: SpeechSynthesisVoice | null = null;

    voices
      .filter(v => v.lang.startsWith(prefs.lang.substring(0,2))) // Pre-filter by language family
      .forEach(voice => {
        let score = 0;
        const name = voice.name.toLowerCase();

        // Language match is primary
        if (voice.lang === prefs.lang) {
            score += 5;
        }

        if (prefs.gender) {
            if (prefs.gender === 'female' && (name.includes('female') || name.includes('zira') || name.includes('samantha'))) {
                score += 2;
            } else if (prefs.gender === 'male' && (name.includes('male') || name.includes('david') || name.includes('daniel'))) {
                score += 2;
            }
        }

        // Prefer high-quality voices
        if (name.includes('google')) score += 2;
        if (name.includes('microsoft')) score += 1;
        if (voice.localService) score += 1;

        if (prefs.nameKeywords) {
            for (const keyword of prefs.nameKeywords) {
                if (name.includes(keyword.toLowerCase())) {
                    score += 4;
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestVoice = voice;
        }
    });

    return bestVoice || voices.find(v => v.lang === prefs.lang) || voices.find(v => v.default) || voices[0];
}

/**
 * Speaks a given text using a persona-specific voice.
 * @param text The text to speak.
 * @param personaId The persona to use for the voice.
 * @param onEndCallback A callback to execute when speech finishes or errors.
 */
export function speak(text: string, personaId: Persona, onEndCallback: () => void) {
  if (!('speechSynthesis' in window)) {
    console.error("Speech Synthesis not supported in this browser.");
    onEndCallback();
    return;
  }
  if (!text.trim()) {
    onEndCallback();
    return;
  }

  stop(); // Stop any currently playing speech

  const config = personaConfigs[personaId] || personaConfigs.default;
  const utterance = new SpeechSynthesisUtterance(text);

  const voice = findBestVoice(config.voicePrefs);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.pitch = config.pitch;
  utterance.rate = config.rate;
  utterance.lang = config.voicePrefs.lang;

  utterance.onend = onEndCallback;
  utterance.onerror = (event) => {
    if (event.error !== 'interrupted') {
        console.error('SpeechSynthesis Error:', event.error);
    }
    onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any ongoing speech synthesis.
 */
export function stop() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
