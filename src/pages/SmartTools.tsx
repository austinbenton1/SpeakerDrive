import React, { useState } from 'react';
import { Lightbulb, Zap, PlusCircle, ChevronRight } from 'lucide-react';

export default function SmartTools() {
  const [activeTab, setActiveTab] = useState("strategic");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const categoryColors = {
    industry: "from-green-100 to-green-200",
    company: "from-purple-100 to-purple-200",
    role: "from-blue-100 to-blue-200",
    objections: "from-red-100 to-red-200",
    urgency: "from-amber-100 to-amber-200",
    roleSpecific: "from-violet-100 to-violet-200",
    differentiation: "from-indigo-100 to-indigo-200",
  };

  const categoryTextColors = {
    industry: "text-green-700",
    company: "text-purple-700",
    role: "text-blue-700",
    objections: "text-red-700",
    urgency: "text-amber-700",
    roleSpecific: "text-violet-700",
    differentiation: "text-indigo-700",
  };

  const categoryBgColors = {
    industry: "bg-green-100",
    company: "bg-purple-100",
    role: "bg-blue-100",
    objections: "bg-red-100",
    urgency: "bg-amber-100",
    roleSpecific: "bg-violet-100",
    differentiation: "bg-indigo-100",
  };

  const strategicIntelSections = [
    {
      id: "industry",
      title: "Industry Intel",
      subheadline: "Industry focused research",
      color: categoryColors.industry,
      textColor: categoryTextColors.industry,
      bgColor: categoryBgColors.industry,
      prompts: [
        {
          text: "What revenue-generating trends are most prominent in [industry] right now?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "Where are companies in [industry] currently over-investing?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What are the key financial challenges facing [industry] companies this year?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What new technology or innovation is driving revenue in [industry]?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What are the high-growth customer segments in [industry]?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What budget cycles are most significant in [industry]?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "Where are [industry] companies focusing on cost-saving measures?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What recent regulations are impacting revenue strategies in [industry]?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "What competitive pressures are influencing revenue strategies in [industry]?",
          inputPlaceholder: "Enter [industry]",
        },
        {
          text: "Which departments within [industry] are expected to receive budget increases this year?",
          inputPlaceholder: "Enter [industry]",
        },
      ],
    },
    {
      id: "company",
      title: "Company Intel",
      subheadline: "Company focused research",
      color: categoryColors.company,
      textColor: categoryTextColors.company,
      bgColor: categoryBgColors.company,
      prompts: [
        {
          text: "Provide a revenue-focused deep dive on [company]",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What are [company]'s current budget priorities?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What recent financial initiatives has [company] undertaken, and what is the expected ROI?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "How does [company] position itself against competitors in terms of revenue growth?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What recent acquisitions or partnerships is [company] pursuing to increase revenue?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What high-growth products or services is [company] focusing on?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What are the main financial challenges impacting [company]'s revenue?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "How has [company] adapted its revenue strategy in response to recent market changes?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "What are [company]'s key objectives for the next fiscal year?",
          inputPlaceholder: "Enter [company]",
        },
        {
          text: "How does [company] allocate budgets across different departments?",
          inputPlaceholder: "Enter [company]",
        },
      ],
    },
    {
      id: "role",
      title: "Role Intel",
      subheadline: "Role based research",
      color: categoryColors.role,
      textColor: categoryTextColors.role,
      bgColor: categoryBgColors.role,
      prompts: [
        {
          text: "Give a revenue-focused overview of priorities for [role]",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What metrics are most important to [role]?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What are the top financial concerns keeping [role] up at night?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What revenue-generating goals does [role] have for this year?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What achievements or metrics are likely to fast-track a promotion for [role]?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What budget constraints is [role] typically managing?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "How does [role] prioritize short-term vs. long-term revenue growth?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What common challenges does [role] face in achieving revenue goals?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What recent trends are most relevant to [role]?",
          inputPlaceholder: "Enter [role]",
        },
        {
          text: "What key responsibilities does [role] have in driving profitability?",
          inputPlaceholder: "Enter [role]",
        },
      ],
    },
  ];

  const salesCoachSections = [
    {
      id: "objections",
      title: "Overcoming Objections Coaching",
      subheadline:
        "Practice responding to common buyer objections around budget, ROI, time, and complexity",
      color: categoryColors.objections,
      textColor: categoryTextColors.objections,
      bgColor: categoryBgColors.objections,
      pillText: "Overcoming Objections",
      prompts: [
        {
          text: "The buyer is concerned about budget constraints for [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The buyer has concerns about the ROI of [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The buyer doesn't have time to implement [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The buyer thinks [topic] is too complex to implement",
          inputPlaceholder: "Enter [topic]",
        },
      ],
    },
    {
      id: "urgency",
      title: "Urgency & Value Coaching",
      subheadline:
        "Practice creating urgency and emphasizing the value, without being pushy",
      color: categoryColors.urgency,
      textColor: categoryTextColors.urgency,
      bgColor: categoryBgColors.urgency,
      pillText: "Urgency & Value",
      prompts: [
        {
          text: "The buyer doesn't see an urgent need for [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The buyer is only focused on short-term gains and doesn't see the long-term value of [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The buyer wants to understand the specific financial benefits of [topic]",
          inputPlaceholder: "Enter [topic]",
        },
      ],
    },
    {
      id: "roleSpecific",
      title: "Role-Specific Coaching",
      subheadline:
        "Tailor responses to address unique priorities of different buyer roles",
      color: categoryColors.roleSpecific,
      textColor: categoryTextColors.roleSpecific,
      bgColor: categoryBgColors.roleSpecific,
      pillText: "Role-Specific",
      prompts: [
        {
          text: "The CFO is concerned about controlling costs and needs reassurance on financial impact of [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The COO is concerned about operational efficiency and workload with [topic]",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The CMO is focused on customer acquisition and wants to see how [topic] will help achieve that",
          inputPlaceholder: "Enter [topic]",
        },
        {
          text: "The Head of HR is concerned about [topic] training and onboarding",
          inputPlaceholder: "Enter [topic]",
        },
      ],
    },
    {
      id: "differentiation",
      title: "Differentiation Coaching",
      subheadline:
        "Practice positioning your topic as a superior solution compared to alternatives",
      color: categoryColors.differentiation,
      textColor: categoryTextColors.differentiation,
      bgColor: categoryBgColors.differentiation,
      pillText: "Differentiation",
      prompts: [
        {
          text: "The buyer is considering a [competitor] solution instead of yours",
          inputPlaceholder: "Enter [competitor]",
        },
        {
          text: "The buyer feels that [competitor]'s pricing is more attractive than yours",
          inputPlaceholder: "Enter [competitor]",
        },
        {
          text: "The buyer believes [competitor] has a longer track record than you",
          inputPlaceholder: "Enter [competitor]",
        },
      ],
    },
  ];

  const sections =
    activeTab === "strategic" ? strategicIntelSections : salesCoachSections;

  const PromptCard = ({ prompt, index, section }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xl text-gray-400 font-medium">
              {index + 1}
            </span>
            <div className="text-gray-400">
              <Lightbulb className="w-5 h-5" />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div
              className={`text-xs font-medium px-2 py-1 rounded-full ${section.textColor} ${section.bgColor}`}
            >
              {activeTab === "strategic"
                ? `${section.title}`
                : section.pillText}
            </div>
          </div>

          <p className="text-gray-900 font-medium text-base mb-4">
            {prompt.text}
          </p>
        </div>

        <div className="bg-gray-50 rounded-b-lg px-6 py-4">
          <div className="flex gap-1.5 w-full items-stretch">
            <input
              type="text"
              placeholder={prompt.inputPlaceholder}
              className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
            <button className="flex-shrink-0 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1">
              <span>{activeTab === "strategic" ? "Generate" : "Build"}</span>
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ShowMoreCard = ({ onClick, section }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-all duration-200 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
    >
      <div className="p-6 text-center">
        <PlusCircle className={`w-12 h-12 mb-2 ${section.textColor}`} />
        <div className={`text-2xl font-semibold ${section.textColor}`}>
          Show More Cards
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex px-6 pt-2">
          <button
            onClick={() => setActiveTab("strategic")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "strategic"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Instant Intel
          </button>
          <button
            onClick={() => setActiveTab("coach")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "coach"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Sales Coach
          </button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {activeTab === "strategic" ? "Instant Intel" : "Sales Coach"}
          </h1>
        </div>

        <div className="mb-12 max-w-xl">
          {activeTab === "strategic" ? (
            <div className="text-gray-600 space-y-4 text-base">
              <p>
                <span className="font-semibold">Instructions:</span> Choose
                an Intel Card below. Enter your input in the card. Click
                Generate to begin your research.
              </p>
              <p className="flex items-start">
                <Lightbulb className="w-5 h-5 mt-1 mr-2 text-yellow-500" />
                <span>
                  Use the cards to spark new ideas, uncover hidden
                  opportunities and win new business.
                </span>
              </p>
            </div>
          ) : (
            <div className="text-gray-600 space-y-4 text-base">
              <p>
                <span className="font-semibold">Instructions:</span> Choose
                a Coaching Card below. Enter your input in the card. This
                input will launch a customized, real-world sales scenario.
              </p>
              <p className="flex items-start">
                <Lightbulb className="w-5 h-5 mt-1 mr-2 text-yellow-500" />
                <span>
                  Cards serve as a jumping off point to get the juices
                  flowing. Based on the card you choose, we'll built an
                  in-context sales scenario for your training.
                </span>
              </p>
            </div>
          )}
        </div>

        {sections.map((section, sectionIdx) => (
          <div
            key={section.id}
            id={section.id}
            className={`${
              sectionIdx === 0 ? "" : "mt-16 pt-10 border-t border-gray-200"
            }`}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-500 mt-1">{section.subheadline}</p>
              <button
                className="text-blue-600 text-xl font-bold mt-2"
                onClick={() => toggleCategory(section.id)}
              >
                {expandedCategory === section.id
                  ? "- Collapse"
                  : "+ Expand"}
              </button>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {(expandedCategory === section.id
                ? section.prompts
                : section.prompts.slice(0, 2)
              ).map((prompt, idx) => (
                <PromptCard
                  key={idx}
                  prompt={prompt}
                  index={idx}
                  section={section}
                />
              ))}

              {expandedCategory !== section.id && (
                <ShowMoreCard
                  onClick={() => toggleCategory(section.id)}
                  section={section}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}