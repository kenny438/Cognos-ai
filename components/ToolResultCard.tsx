
import React from 'react';
import { ToolResult } from '../types';
import HotelIcon from './icons/HotelIcon';
import TicketIcon from './icons/TicketIcon';
import StarIcon from './icons/StarIcon';
import ConcertIcon from './icons/ConcertIcon';
import JobIcon from './icons/JobIcon';
import CarIcon from './icons/CarIcon';

interface ToolResultCardProps {
  result: ToolResult;
}

const ToolResultCard: React.FC<ToolResultCardProps> = ({ result }) => {
  if (result.name === 'find_hotels' && result.data.length > 0) {
    return (
      <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden">
        <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))]">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2">
            <HotelIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
            Hotel Recommendations
          </h3>
        </div>
        <div className="divide-y divide-[rgb(var(--color-border))]">
          {result.data.map((hotel: any, index: number) => (
            <div key={index} className="p-3 grid grid-cols-3 gap-3 items-center">
              <div className="col-span-2">
                <p className="font-medium text-[rgb(var(--color-text-primary))] truncate">{hotel.name}</p>
                <div className="flex items-center gap-3 text-xs text-[rgb(var(--color-text-secondary))] mt-1">
                  <span className="font-bold text-green-600">${hotel.price}</span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3.5 h-3.5 text-yellow-500" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
              </div>
              <a 
                href={hotel.bookingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="col-span-1 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] text-xs font-bold py-2 px-3 rounded-md text-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (result.name === 'find_movie_tickets' && result.data.length > 0) {
    const ticketInfo = result.data[0];
    return (
       <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden">
        <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))]">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2">
            <TicketIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
            Movie Ticket Information
          </h3>
        </div>
        <div className="p-3 flex items-center justify-between">
           <div>
             <p className="font-medium text-[rgb(var(--color-text-primary))]">{ticketInfo.movie_title}</p>
             <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1">Ready to book online</p>
           </div>
           <a 
            href={ticketInfo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] text-xs font-bold py-2 px-3 rounded-md text-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
           >
             Buy Tickets
           </a>
        </div>
      </div>
    );
  }

  if (result.name === 'find_concert_tickets' && result.data.length > 0) {
    const ticketInfo = result.data[0];
    return (
       <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden">
        <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))]">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2">
            <ConcertIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
            Concert Ticket Information
          </h3>
        </div>
        <div className="p-3 flex items-center justify-between">
           <div>
             <p className="font-medium text-[rgb(var(--color-text-primary))]">{ticketInfo.artist_name}</p>
             <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1">Tickets available online</p>
           </div>
           <a 
            href={ticketInfo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] text-xs font-bold py-2 px-3 rounded-md text-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
           >
             Find Tickets
           </a>
        </div>
      </div>
    );
  }

  if (result.name === 'find_jobs' && result.data.length > 0) {
    return (
      <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden">
        <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))]">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2">
            <JobIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
            Job Listings
          </h3>
        </div>
        <div className="divide-y divide-[rgb(var(--color-border))]">
          {result.data.map((job: any, index: number) => (
            <div key={index} className="p-3 grid grid-cols-3 gap-3 items-center">
              <div className="col-span-2">
                <p className="font-medium text-[rgb(var(--color-text-primary))] truncate">{job.title}</p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1 truncate">{job.company} - {job.location}</p>
              </div>
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="col-span-1 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] text-xs font-bold py-2 px-3 rounded-md text-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (result.name === 'find_cars' && result.data.length > 0) {
    return (
      <div className="border border-[rgb(var(--color-border))] rounded-lg overflow-hidden">
        <div className="p-3 bg-[rgb(var(--color-card-bg-hover))] border-b border-[rgb(var(--color-border))]">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm flex items-center gap-2">
            <CarIcon className="w-5 h-5 text-[rgb(var(--color-text-accent))]" />
            Cars For Sale
          </h3>
        </div>
        <div className="divide-y divide-[rgb(var(--color-border))]">
          {result.data.map((car: any, index: number) => (
            <div key={index} className="p-3 grid grid-cols-3 gap-3 items-center">
              <div className="col-span-2">
                <p className="font-medium text-[rgb(var(--color-text-primary))] truncate">{car.year} {car.make} {car.model}</p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1 font-bold text-green-600">${car.price.toLocaleString()}</p>
              </div>
              <a 
                href={car.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="col-span-1 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-text))] text-xs font-bold py-2 px-3 rounded-md text-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return null;
};

export default ToolResultCard;