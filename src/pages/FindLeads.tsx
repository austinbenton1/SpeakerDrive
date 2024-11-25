import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { SpeakerLead } from '../types';
import LeadsTable from '../components/LeadsTable';
import LeadDetail from '../components/LeadDetail';
import FilterSection from '../components/filters/FilterSection';
import FilterSelect from '../components/filters/FilterSelect';
import FilterSearch from '../components/filters/FilterSearch';

const mockLeads: SpeakerLead[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    name: 'David Chen',
    focus: 'VP of Engineering at TechCorp',
    unlockType: 'Contact Email',
    industryCategory: 'Technology',
    extensionType: 'com',
    addedToSpeakerDrive: 'Within the Last Year',
    linkedIn: 'https://linkedin.com/in/davidchen',
    isUnlocked: false,
    eventPurpose: 'Experienced engineering leader with expertise in AI and cloud infrastructure.',
    companySize: '101 - 500',
    location: 'United States'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    name: 'Enterprise AI Summit',
    focus: 'Enterprise AI Implementation',
    unlockType: 'Event URL',
    industryCategory: 'Technology',
    extensionType: 'com',
    addedToSpeakerDrive: 'Within the Last Year',
    linkedIn: 'https://linkedin.com/company/enterprise-ai-summit',
    isUnlocked: false,
    eventPurpose: 'Premier conference focused on enterprise AI adoption and implementation strategies.',
    hostOrganization: 'Enterprise Tech Forum',
    targetAudience: 'CTOs, CIOs, Tech Leaders',
    location: 'Virtual/Unspecified'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    name: 'Sarah Martinez',
    focus: 'Chief Innovation Officer at HealthTech Inc',
    unlockType: 'Contact Email',
    industryCategory: 'Healthcare',
    extensionType: 'com',
    addedToSpeakerDrive: 'Within the Last Month',
    linkedIn: 'https://linkedin.com/in/sarahmartinez',
    isUnlocked: false,
    eventPurpose: 'Healthcare innovation expert specializing in digital transformation.',
    companySize: '1000+',
    location: 'Canada'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    name: 'Global FinTech Forum',
    focus: 'Future of Banking',
    unlockType: 'Event Email',
    industryCategory: 'Finance',
    extensionType: 'org',
    addedToSpeakerDrive: 'Within the Last Month',
    linkedIn: 'https://linkedin.com/company/global-fintech-forum',
    isUnlocked: false,
    eventPurpose: 'Annual gathering of financial technology leaders and innovators.',
    hostOrganization: 'Global FinTech Association',
    targetAudience: 'Banking Executives, FinTech Leaders',
    location: 'United Kingdom'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    name: 'Michael Chang',
    focus: 'Head of Digital Transformation',
    unlockType: 'Contact Email',
    industryCategory: 'Consulting',
    extensionType: 'com',
    addedToSpeakerDrive: 'Over a year ago',
    linkedIn: 'https://linkedin.com/in/michaelchang',
    isUnlocked: false,
    eventPurpose: 'Digital transformation strategist with focus on enterprise modernization.',
    companySize: '501 - 1000',
    location: 'United States'
  }
];

export default function FindLeads() {
  const [selectedLead, setSelectedLead] = useState<SpeakerLead | null>(null);
  const [filters, setFilters] = useState({
    leadType: '',
    unlockType: '',
    industry: '',
    location: '',
    organization: '',
    addedDate: '',
    searchAll: '',
    searchEvent: ''
  });
  const [openSections, setOpenSections] = useState({
    leadType: true,
    unlockType: true,
    industry: true,
    location: true,
    organization: true,
    addedDate: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Sidebar Filters */}
      <div className="w-72 bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

          <FilterSection
            title="Lead Type"
            isOpen={openSections.leadType}
            onToggle={() => toggleSection('leadType')}
          >
            <FilterSelect
              value={filters.leadType}
              onChange={(value) => setFilters(prev => ({ ...prev, leadType: value }))}
              placeholder="Select Lead"
              options={['Contact', 'Event']}
            />
          </FilterSection>

          <FilterSection
            title="Unlock Type"
            isOpen={openSections.unlockType}
            onToggle={() => toggleSection('unlockType')}
          >
            <FilterSelect
              value={filters.unlockType}
              onChange={(value) => setFilters(prev => ({ ...prev, unlockType: value }))}
              placeholder="Select Unlock Type"
              options={['Contact Email', 'Event Email', 'Event URL']}
            />
          </FilterSection>

          <FilterSection
            title="Industry"
            isOpen={openSections.industry}
            onToggle={() => toggleSection('industry')}
          >
            <FilterSearch
              value={filters.industry}
              onChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}
              placeholder="Search industry..."
            />
          </FilterSection>

          <FilterSection
            title="Organization"
            isOpen={openSections.organization}
            onToggle={() => toggleSection('organization')}
          >
            <FilterSearch
              value={filters.organization}
              onChange={(value) => setFilters(prev => ({ ...prev, organization: value }))}
              placeholder="Search organization..."
            />
          </FilterSection>

          <FilterSection
            title="Location"
            isOpen={openSections.location}
            onToggle={() => toggleSection('location')}
          >
            <FilterSelect
              value={filters.location}
              onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              placeholder="Select Location"
              options={['United States', 'Canada', 'United Kingdom', 'Virtual/Unspecified']}
            />
          </FilterSection>

          <FilterSection
            title="Added Date"
            isOpen={openSections.addedDate}
            onToggle={() => toggleSection('addedDate')}
          >
            <FilterSelect
              value={filters.addedDate}
              onChange={(value) => setFilters(prev => ({ ...prev, addedDate: value }))}
              placeholder="Select timeframe"
              options={['Within the Last Year', 'Within the Last Month', 'Over a year ago']}
            />
          </FilterSection>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Speaking Opportunities</h1>
            <p className="text-gray-600 mb-6">Discover and connect with events and industry leaders that match your expertise</p>

            {/* Search Bars */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <FilterSearch
                value={filters.searchAll}
                onChange={(value) => setFilters(prev => ({ ...prev, searchAll: value }))}
                placeholder="Search across all data..."
              />
              <FilterSearch
                value={filters.searchEvent}
                onChange={(value) => setFilters(prev => ({ ...prev, searchEvent: value }))}
                placeholder="Search event name..."
              />
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <LeadsTable leads={mockLeads} onLeadSelect={setSelectedLead} />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}