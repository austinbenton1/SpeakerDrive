import React from 'react';
import type { Lead } from '../../types';

interface LeadTableRowProps {
  lead: Lead;
  onClick: () => void;
  stickyColumnStyle: string;
  stickyColumnShadow: string;
}

export default function LeadTableRow({ 
  lead, 
  onClick,
  stickyColumnStyle,
  stickyColumnShadow
}: LeadTableRowProps) {
  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <tr
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer"
    >
      <td className={`sticky left-0 z-10 ${stickyColumnStyle} px-3 py-3 whitespace-nowrap`}>
        <img 
          src={lead.image_url} 
          alt={lead.lead_name}
          className="h-8 w-8 rounded-full object-cover"
        />
      </td>
      <td 
        className={`sticky left-[3.5rem] z-10 ${stickyColumnStyle} ${stickyColumnShadow} px-3 py-3 whitespace-nowrap`}
        title={lead.lead_name}
      >
        <div className="text-[13.5px] font-medium text-gray-900 truncate max-w-[400px]">
          {lead.lead_name}
        </div>
      </td>
      <td 
        className="px-3 py-3 whitespace-nowrap max-w-[300px] w-[300px]"
        title={lead.focus}
      >
        <div className="text-[13.5px] text-gray-500 truncate">
          {lead.focus}
        </div>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <span className="inline-flex px-2.5 py-1 rounded-md text-[13.5px] font-medium bg-gray-100 text-gray-900">
          {lead.lead_type}
        </span>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        {lead.unlock_type === 'Unlock Event URL' && (
          <button 
            className="inline-flex items-center w-[140px] px-3 py-1.5 rounded-md text-[13.5px] font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H9M15 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H15M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Event URL
          </button>
        )}
        {lead.unlock_type === 'Unlock Contact Email' && (
          <button 
            className="inline-flex items-center w-[140px] px-3 py-1.5 rounded-md text-[13.5px] font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Contact Email
          </button>
        )}
        {lead.unlock_type === 'Unlock Event Email' && (
          <button 
            className="inline-flex items-center w-[140px] px-3 py-1.5 rounded-md text-[13.5px] font-medium bg-emerald-300 text-white hover:bg-emerald-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Event Email
          </button>
        )}
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <span className="text-[13.5px] text-gray-900">
          {lead.industry}
        </span>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <div className="text-[13.5px] text-gray-500">
          {lead.event_format || 'N/A'}
        </div>
      </td>
      <td 
        className="px-3 py-3 whitespace-nowrap"
        title={lead.organization}
      >
        <div className="text-[13.5px] text-gray-500 truncate max-w-[200px]">
          {lead.organization}
        </div>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <div className="text-[13.5px] text-gray-500">
          {lead.organization_type || 'N/A'}
        </div>
      </td>
      <td 
        className="px-3 py-3 whitespace-nowrap"
        title={lead.event_info}
      >
        <div className="text-[13.5px] text-gray-500 truncate max-w-[200px]">
          {truncateText(lead.event_info || 'No event details available')}
        </div>
      </td>
      <td className="px-3 py-3 whitespace-nowrap">
        <span className="inline-flex px-2.5 py-1 rounded-md text-[13.5px] font-medium bg-gray-100 text-gray-900">
          {lead.location || 'N/A'}
        </span>
      </td>
    </tr>
  );
}