// Data transformation utilities for mapping API responses to Finance UI components
import { getDaysSinceLastSale } from './dataTransformers';

// Transform agent data from API to Finance UI format
export const transformFinanceData = (apiAgentData, paymentsPipelinesData = null) => {
  return apiAgentData.map((agent, index) => ({
    id: agent.user_id || index + 1,
    name: agent.first_name || 'Unknown',
    image: agent.image ? `https://b2b.olankatravels.com${agent.image}` : '/default-avatar.png',
    lastSaleDate: agent.last_sale_date,
    badge: {
      color: getBadgeColor(agent),
      number: getDaysSinceLastSale(agent.last_sale_date) ?? '—',
      daysSinceLastSale: getDaysSinceLastSale(agent.last_sale_date)
    },
    // Inquiries data: [company_live_enquiry_count, agent_live_enquiry_count, company_live_enquiries_engage, agent_live_enquiries_engage]
    inquiries: [
      agent.company_live_enquiry_count || 0,
      agent.agent_live_enquiry_count || 0,
      agent.company_live_enquiries_engage || 0,
      agent.agent_live_enquiries_engage || 0
    ],
    // Follow Up data: [follow_up_total, follow_up_agent]
    followUp: [
      agent.follow_up_total || 0,
      agent.follow_up_agent || 0
    ],
    // Engaging data: [company_live_enquiries_engage, agent_live_enquiries_engage] - same as inquiries engaged
    engaging: [
      agent.company_live_enquiries_engage || 0,
      agent.agent_live_enquiries_engage || 0
    ],
    // HE (Highly Engaged) data: [highly_engaged_total, highly_engaged_agent]
    he: [
      agent.highly_engaged_total || 0,
      agent.highly_engaged_agent || 0
    ],
    // Pipeline data: [company_pipeline_count, agent_pipelines_count, company_pipelines_engage, agent_pipelines_engage]
    pipeline: [
      agent.company_pipeline_count || 0,
      agent.agent_pipelines_count || 0,
      agent.company_pipelines_engage || 0,
      agent.agent_pipelines_engage || 0
    ],
    // Paid data: [paid_total, paid_agent]
    paid: [
      agent.paid_total || 0,
      agent.paid_agent || 0
    ],
    // Paid2 data: profit_sum as string
    paid2: agent.profit_sum ? `$${parseFloat(agent.profit_sum).toFixed(2)}` : '$0.00',
    // Activity indicators - always show data even if 0
    followUpActive: true,
    heActive: true,
    inquiriesActive: true,
    engagingActive: true,
    pipelineActive: true,
    paidActive: true,
    indicators: {
      followUp: (agent.follow_up_total || 0) > 0 ? Math.min(agent.follow_up_total, 9) : 0,
      he: (agent.highly_engaged_total || 0) > 0 ? Math.min(agent.highly_engaged_total, 9) : 0,
      inquiries: (agent.company_live_enquiry_count || 0) > 0 ? Math.min(agent.company_live_enquiry_count, 9) : 0,
      engaging: (agent.company_live_enquiries_engage || 0) > 0 ? Math.min(agent.company_live_enquiries_engage, 9) : 0,
      pipeline: (agent.company_pipeline_count || 0) > 0 ? Math.min(agent.company_pipeline_count, 9) : 0,
      paid: (agent.paid_total || 0) > 0 ? Math.min(agent.paid_total, 9) : 0
    }
  }));
};

// Calculate summary data from agent data and payments/pipelines data
export const calculateFinanceSummaryData = (agentData, paymentsPipelinesData = null) => {
  const summary = {
    badges: [
      { color: "green", number: 0 },
      { color: "yellow", number: 0 },
      { color: "red", number: 0 }
    ],
    totals: {
      inquiries: [0, 0, 0, 0],
      followUp: [0, 0, 0, 0],
      engaging: [0, 0, 0, 0],
      he: [0, 0, 0, 0],
      pipeline: [0, 0, 0, 0],
      paid: [0, 0, 0, 0]
    },
    summaryIndicators: {
      followUp: { top: 0, bottom: 0 },
      he: { top: 0, bottom: 0 },
      paid: { top: 0, bottom: 0 }
    },
    totalPaid: '$0.00'
  };

  // Count badges by color
  agentData.forEach(agent => {
    if (agent.badge.color === 'green') summary.badges[0].number++;
    else if (agent.badge.color === 'yellow') summary.badges[1].number++;
    else if (agent.badge.color === 'red') summary.badges[2].number++;
  });

  // Calculate totals for each category
  let totalProfit = 0;
  agentData.forEach(agent => {
    summary.totals.inquiries[0] += agent.inquiries[0] || 0;
    summary.totals.inquiries[1] += agent.inquiries[1] || 0;
    summary.totals.inquiries[2] += agent.inquiries[2] || 0;
    summary.totals.inquiries[3] += agent.inquiries[3] || 0;

    summary.totals.followUp[0] += agent.followUp[0] || 0;
    summary.totals.followUp[1] += agent.followUp[1] || 0;

    summary.totals.engaging[0] += agent.engaging[0] || 0;
    summary.totals.engaging[1] += agent.engaging[1] || 0;

    summary.totals.he[0] += agent.he[0] || 0;
    summary.totals.he[1] += agent.he[1] || 0;

    summary.totals.pipeline[0] += agent.pipeline[0] || 0;
    summary.totals.pipeline[1] += agent.pipeline[1] || 0;
    summary.totals.pipeline[2] += agent.pipeline[2] || 0;
    summary.totals.pipeline[3] += agent.pipeline[3] || 0;

    summary.totals.paid[0] += agent.paid[0] || 0;
    summary.totals.paid[1] += agent.paid[1] || 0;

    // Calculate total profit
    const profitValue = parseFloat(agent.paid2.replace('$', '')) || 0;
    totalProfit += profitValue;
  });

  // Calculate summary indicators
  summary.summaryIndicators.followUp = {
    top: Math.min(summary.totals.followUp[0], 99),
    bottom: Math.min(summary.totals.followUp[1], 99)
  };
  summary.summaryIndicators.he = {
    top: Math.min(summary.totals.he[0], 99),
    bottom: Math.min(summary.totals.he[1], 99)
  };
  summary.summaryIndicators.paid = {
    top: Math.min(summary.totals.paid[0], 99),
    bottom: Math.min(summary.totals.paid[1], 99)
  };

  // Format total paid amount
  if (totalProfit >= 1000) {
    summary.totalPaid = `$${(totalProfit / 1000).toFixed(1)}K`;
  } else {
    summary.totalPaid = `$${totalProfit.toFixed(2)}`;
  }

  return summary;
};

// Helper function to determine badge color based on days since last sale
const getBadgeColor = (agent) => {
  const daysSinceLastSale = getDaysSinceLastSale(agent.last_sale_date);

  // If no last_sale_date or invalid, return red (most inactive)
  if (daysSinceLastSale === null || daysSinceLastSale < 0) return 'red';

  // Color based on days since last sale:
  // 1-7 days: Green (active)
  // 7-14 days: Yellow (warning)
  // More than 14 days: Red (inactive)
  if (daysSinceLastSale >= 1 && daysSinceLastSale <= 7) return 'green';
  if (daysSinceLastSale > 7 && daysSinceLastSale <= 14) return 'yellow';
  return 'red'; // More than 14 days or 0 days
};

// Helper function to determine badge number
const getBadgeNumber = (agent) => {
  const totalActivity = (agent.company_live_enquiry_count || 0) +
    (agent.follow_up_total || 0) +
    (agent.highly_engaged_total || 0) +
    (agent.company_pipeline_count || 0) +
    (agent.paid_total || 0);

  // Adjust thresholds based on finance data patterns
  if (totalActivity >= 50) return 5;
  if (totalActivity >= 25) return 4;
  if (totalActivity >= 10) return 3;
  if (totalActivity >= 5) return 2;
  return 1;
};
