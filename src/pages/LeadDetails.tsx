import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Link as LinkIcon, Building, Users, Calendar, MapPin, Layout, Linkedin, Lock } from 'lucide-react';
import type { SpeakerLead } from '../types';

// Using mock data for now - in real app, fetch based on ID
const mockLead: SpeakerLead = {
  id: '4',
  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  name: 'Crowe Insights Multiplier',
  focus: 'Economic Trends & AI Developments',
  unlockType: 'Event URL',
  industryCategory: 'Business',
  extensionType: 'com',
  addedToSpeakerDrive: 'Within the Last Week',
  linkedIn: 'https://linkedin.com/company/crowe',
  isUnlocked: false,
  eventPurpose: `Event Name: Crowe Insights Multiplier\n\nTarget Audience: Executives and industry leaders\n\nEvent Overview: The Crowe Insights Multiplier event focuses on timely topics for businesses and features prominent speakers discussing economic trends, AI developments, and tax impacts.\n\nDate researched from available information: September 2024. May recur or include related opportunities; see event source.\n\nSpeakers and other experts include: Michael Feuz, Tony Klaich, Doug Schrock, Thomas Callaghan, Yan Chow, Ratinder Ahuja, Jannie Affeld, Rochelle Hodes, Peter Judge, John Kelleher, Robert Johnson, Caitlin Brzycki, Bart Kelly, Brandon Skinner, Don Weinstein, Ron Avidan, Chris Thornberg, Kim Yin, Jeff Schaeffer, Glenn Richards, Kathy Lai, Tony Boras, Azi Ghahremani, Chris Engels, Sowmya Varadharajan, Pejmun Zargar, Paul Zolnowski`,
  detailedInfo: `Professional Role:  
Tiffany Hiscock serves as the Lead Talent Business Advisor and Assistant Director at Crowe. In this role, she focuses on leadership assessment and development, influencing talent strategies that align with business goals. Her expertise in industrial/organizational psychology positions her uniquely to consult with executives and assess their leadership capabilities.

Professional Background:  
Tiffany has extensive experience in talent development, having previously worked as a Senior Assessment & Development Consultant at Vaya Group. Her journey also includes pivotal roles at Valtera Corporation and Ace Hardware. This diverse background enhances her understanding of various business sectors and their leadership needs.

Recent Activity:  
Tiffany has been active on LinkedIn, sharing insights about effective leadership development and the importance of emotional intelligence in workplace settings. Her posts, such as "Why Sensitivity Can Be a Superpower at Work," reflect her commitment to fostering strong leadership qualities among professionals, making her insights particularly valuable for event participants.

Influence & Network:  
Within her role at Crowe, Tiffany interacts with a network of executives and decision-makers, amplifying her influence in the industry. Her connections facilitate potential collaboration opportunities and synergies, beneficial for SpeakerDrive clients seeking to engage effectively within this event context.`,
  hostOrganization: 'Crowe LLP',
  targetAudience: 'Business leaders, entrepreneurs, creators, and changemakers',
  eventDetails: {
    location: 'Chicago, United States',
    type: 'In-person',
    format: 'Keynotes, panels, workshops'
  }
};

export default function LeadDetails() {
  const { id } = useParams();
  const lead = mockLead; // In real app, fetch lead based on id
  const isEventLead = lead.unlockType === 'Event Email' || lead.unlockType === 'Event URL';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link to="/leads" className="flex items-center text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Leads
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={lead.image}
                  alt={lead.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
                  <p className="mt-1 text-sm text-gray-500">{lead.focus}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {!lead.isUnlocked && (
                  <>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      {lead.unlockType === 'Contact Email' && (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Unlock Contact Email
                        </>
                      )}
                      {lead.unlockType === 'Event Email' && (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Unlock Event Email
                        </>
                      )}
                      {lead.unlockType === 'Event URL' && (
                        <>
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Unlock Event URL
                        </>
                      )}
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Mail className="w-4 h-4 mr-2" />
                      Unlock Lead To Generate Email
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 whitespace-pre-line">{lead.eventPurpose}</p>
            </div>

            {/* Detailed Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Information</h2>
              <p className="text-gray-700 whitespace-pre-line">{lead.detailedInfo}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Industry Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.industryCategory}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Added to SpeakerDrive</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.addedToSpeakerDrive}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Extension Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">.{lead.extensionType}</dd>
                </div>
                {lead.hostOrganization && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Host Organization</dt>
                    <dd className="mt-1 text-sm text-gray-900">{lead.hostOrganization}</dd>
                  </div>
                )}
                {lead.linkedIn && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">LinkedIn Profile</dt>
                    <dd className="mt-1">
                      <a
                        href={lead.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#0A66C2] hover:text-[#004182]"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        <span className="text-sm">View Profile</span>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Contact/Event Info - Locked State */}
            {!lead.isUnlocked && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Unlock {lead.unlockType} to View Details
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Get direct access to contact information and full event details
                  </p>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Unlock Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}