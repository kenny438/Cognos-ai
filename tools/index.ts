import { Type } from "@google/genai";

// --- Tool Definitions (Provider-Agnostic) ---
const toolDefinitions = {
  find_hotels: {
    name: 'find_hotels',
    description: 'Finds hotels in a given location.',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string', description: 'The city or area to search for hotels in.' },
        check_in_date: { type: 'string', description: 'The check-in date (e.g., "2024-12-24").' },
        check_out_date: { type: 'string', description: 'The check-out date (e.g., "2024-12-26").' },
      },
      required: ['location'],
    },
  },
  find_movie_tickets: {
    name: 'find_movie_tickets',
    description: 'Finds movie tickets for a given movie title and location.',
    parameters: {
      type: 'object',
      properties: {
        movie_title: { type: 'string', description: 'The title of the movie.' },
        location: { type: 'string', description: 'The city or area to search for cinemas in.' },
      },
      required: ['movie_title'],
    },
  },
  find_concert_tickets: {
    name: 'find_concert_tickets',
    description: 'Finds concert or tour tickets for a given artist or event.',
    parameters: {
      type: 'object',
      properties: {
        artist_name: { type: 'string', description: 'The name of the artist or band.' },
        location: { type: 'string', description: 'The city or area to search for concerts in (optional).' },
      },
      required: ['artist_name'],
    },
  },
  find_jobs: {
    name: 'find_jobs',
    description: 'Finds job listings based on a query and location.',
    parameters: {
      type: 'object',
      properties: {
        job_title: { type: 'string', description: 'The job title, keyword, or role to search for.' },
        location: { type: 'string', description: 'The city or area to search for jobs in (optional).' },
      },
      required: ['job_title'],
    },
  },
  find_cars: {
    name: 'find_cars',
    description: 'Finds cars for sale based on make, model, and location.',
    parameters: {
      type: 'object',
      properties: {
        make: { type: 'string', description: "The make of the car (e.g., Toyota, Ford)." },
        model: { type: 'string', description: "The model of the car (e.g., Camry, Mustang) (optional)." },
        location: { type: 'string', description: "The city or area to search for cars in (optional)." },
      },
      required: ['make'],
    },
  },
};

// --- Gemini-specific Schema Transformation ---
const mapToGeminiSchema = (def: any) => {
  const geminiParams: any = { ...def.parameters };
  // Convert property types to Gemini's `Type` enum
  for (const key in geminiParams.properties) {
    const prop = geminiParams.properties[key];
    switch(prop.type) {
      case 'string': prop.type = Type.STRING; break;
      case 'number': prop.type = Type.NUMBER; break;
      case 'integer': prop.type = Type.INTEGER; break;
      case 'boolean': prop.type = Type.BOOLEAN; break;
      case 'array': prop.type = Type.ARRAY; break;
      case 'object': prop.type = Type.OBJECT; break;
    }
  }
  return { ...def, parameters: geminiParams };
};

const geminiSchemas = Object.values(toolDefinitions).map(mapToGeminiSchema);
export const toolSchemas = [{ functionDeclarations: geminiSchemas }];


// --- OpenAI-specific Schema Transformation ---
const mapToOpenAISchema = (def: any) => ({ type: 'function', function: def });
export const openAIToolSchemas = Object.values(toolDefinitions).map(mapToOpenAISchema);

// --- Anthropic-specific Schema Transformation ---
const mapToAnthropicSchema = (def: any) => ({
  name: def.name,
  description: def.description,
  input_schema: def.parameters,
});
export const anthropicToolSchemas = Object.values(toolDefinitions).map(mapToAnthropicSchema);


// --- Client-side Tool Implementations (unchanged) ---

async function executeFindHotels(args: { location?: string; check_in_date?: string; check_out_date?: string }) {
  const { location } = args;
  if (!location) return { data: [] };
  const hotels = [
    { name: `Grand Hyatt ${location}`, price: 350, rating: 4.8 },
    { name: `${location} Marriott`, price: 280, rating: 4.6 },
    { name: `Ibis Styles ${location}`, price: 120, rating: 4.2 },
  ].map(hotel => ({ ...hotel, bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}&q=${encodeURIComponent(hotel.name)}` }));
  return { data: hotels };
}

async function executeFindMovieTickets(args: { movie_title?: string; location?: string }) {
    const { movie_title, location } = args;
    if (!movie_title) return { data: [] };
    const searchParams = new URLSearchParams({ q: movie_title });
    if(location) searchParams.set('location', location);
    return { data: [{ movie_title, url: `https://www.fandango.com/search?${searchParams.toString()}` }] };
}

async function executeFindConcertTickets(args: { artist_name?: string; location?: string }) {
    const { artist_name, location } = args;
    if (!artist_name) return { data: [] };
    const searchParams = new URLSearchParams({ q: `${artist_name} tickets` });
    if(location) searchParams.set('location', location);
    return { data: [{ artist_name, url: `https://www.ticketmaster.com/search?${searchParams.toString()}` }] };
}

async function executeFindJobs(args: { job_title?: string; location?: string }) {
    const { job_title, location } = args;
    if (!job_title) return { data: [] };
    const jobs = [
        { title: `Senior ${job_title}`, company: 'Tech Corp', location: location || 'Remote' },
        { title: `${job_title}`, company: 'Innovate LLC', location: location || 'Remote' },
    ].map(job => ({ ...job, url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location || 'Remote')}` }));
    return { data: jobs };
}

async function executeFindCars(args: { make?: string; model?: string; location?: string; }) {
    const { make, model } = args;
    if (!make) return { data: [] };
    const cars = [
        { make, model: model || 'All Models', price: 32000, year: 2022 },
        { make, model: model || 'All Models', price: 25000, year: 2020 },
    ].map(car => ({ ...car, url: `https://www.autotrader.com/cars-for-sale/all-cars/${make.toLowerCase()}/${model?.toLowerCase() || ''}` }));
    return { data: cars };
}


// --- Export Available Tools ---
export const availableTools = {
  'find_hotels': { execute: executeFindHotels },
  'find_movie_tickets': { execute: executeFindMovieTickets },
  'find_concert_tickets': { execute: executeFindConcertTickets },
  'find_jobs': { execute: executeFindJobs },
  'find_cars': { execute: executeFindCars },
};
