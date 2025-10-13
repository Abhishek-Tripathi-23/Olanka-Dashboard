// Data transformation utilities for mapping API responses to UI components

// Transform agent data from API to UI format
export const transformAgentData = (apiAgentData) => {
  return apiAgentData.map((agent, index) => ({
    id: agent.user_id || index + 1,
    name: agent.first_name || 'Unknown',
    image: agent.image ? `https://b2b.olankatravels.com${agent.image}` : '/default-avatar.png',
    lastSaleDate: agent.last_sale_date,
    badge: {
      color: getBadgeColor(agent),
      number: getBadgeNumber(agent)
    },
    // Calls data: [company_attempts, company_success, agent_attempts, agent_success]
    calls: [
      agent.company_call_attempts || 0,
      agent.company_call_success || 0,
      agent.agent_call_attempts || 0,
      agent.agent_call_success || 0
    ],
    // PKG Sends data: [total, agent]
    pkgSends: [
      agent.pkg_sends_total || 0,
      agent.pkg_sends_agent || 0
    ],
    // WhatsApp data: [company_attempts, company_success, agent_attempts, agent_success]
    whatsapp: [
      agent.company_whatsapp_attempts || 0,
      agent.company_whatsapp_success || 0,
      agent.agent_whatsapp_attempts || 0,
      agent.agent_whatsapp_success || 0
    ],
    // New data: [total, agent]
    new: [
      agent.new_enquiries_total || 0,
      agent.new_enquiries_agent || 0
    ],
    // Email data: [company_attempts, company_success, agent_attempts, agent_success]
    email: [
      agent.company_email_attempts || 0,
      agent.company_email_success || 0,
      agent.agent_email_attempts || 0,
      agent.agent_email_success || 0
    ],
    // Activity indicators - always show data even if 0
    pkgSendsActive: true,
    newActive: true,
    callsActive: true,
    whatsappActive: true,
    emailActive: true,
    indicators: {
      pkgSends: (agent.pkg_sends_total || 0) > 0 ? Math.min(agent.pkg_sends_total, 9) : 0,
      whatsapp: (agent.company_whatsapp_attempts || 0) > 0 ? Math.min(agent.company_whatsapp_attempts, 9) : 0,
      new: (agent.new_enquiries_total || 0) > 0 ? Math.min(agent.new_enquiries_total, 9) : 0,
      email: (agent.company_email_attempts || 0) > 0 ? Math.min(agent.company_email_attempts, 9) : 0
    }
  }));
};

// Calculate summary data from agent data
export const calculateSummaryData = (agentData) => {
  const summary = {
    badges: [
      { color: "green", number: 0 },
      { color: "yellow", number: 0 },
      { color: "red", number: 0 }
    ],
    totals: {
      calls: [0, 0, 0, 0],
      pkgSends: [0, 0, 0, 0],
      whatsapp: [0, 0, 0, 0],
      new: [0, 0, 0, 0],
      email: [0, 0, 0, 0]
    },
    summaryIndicators: {
      pkgSends: { top: 0, bottom: 0 },
      new: { top: 0, bottom: 0 }
    }
  };

  // Count badges by color
  agentData.forEach(agent => {
    if (agent.badge.color === 'green') summary.badges[0].number++;
    else if (agent.badge.color === 'yellow') summary.badges[1].number++;
    else if (agent.badge.color === 'red') summary.badges[2].number++;
  });

  // Calculate totals for each category
  agentData.forEach(agent => {
    summary.totals.calls[0] += agent.calls[0] || 0;
    summary.totals.calls[1] += agent.calls[1] || 0;
    summary.totals.calls[2] += agent.calls[2] || 0;
    summary.totals.calls[3] += agent.calls[3] || 0;

    summary.totals.pkgSends[0] += agent.pkgSends[0] || 0;
    summary.totals.pkgSends[1] += agent.pkgSends[1] || 0;

    summary.totals.whatsapp[0] += agent.whatsapp[0] || 0;
    summary.totals.whatsapp[1] += agent.whatsapp[1] || 0;
    summary.totals.whatsapp[2] += agent.whatsapp[2] || 0;
    summary.totals.whatsapp[3] += agent.whatsapp[3] || 0;

    summary.totals.new[0] += agent.new[0] || 0;
    summary.totals.new[1] += agent.new[1] || 0;

    summary.totals.email[0] += agent.email[0] || 0;
    summary.totals.email[1] += agent.email[1] || 0;
    summary.totals.email[2] += agent.email[2] || 0;
    summary.totals.email[3] += agent.email[3] || 0;
  });

  // Calculate summary indicators
  summary.summaryIndicators.pkgSends = {
    top: Math.min(summary.totals.pkgSends[0], 99),
    bottom: Math.min(summary.totals.pkgSends[1], 99)
  };
  summary.summaryIndicators.new = {
    top: Math.min(summary.totals.new[0], 99),
    bottom: Math.min(summary.totals.new[1], 99)
  };

  return summary;
};

// Helper function to determine badge color based on agent performance
const getBadgeColor = (agent) => {
  // Calculate total activity score
  const totalActivity = (agent.company_call_attempts || 0) + 
                       (agent.company_whatsapp_attempts || 0) + 
                       (agent.company_email_attempts || 0) + 
                       (agent.pkg_sends_total || 0) + 
                       (agent.new_enquiries_total || 0) +
                       (agent.company_live_enquiry_count || 0) +
                       (agent.paid_total || 0);
  
  // Adjust thresholds based on actual data patterns
  if (totalActivity >= 30) return 'red';
  if (totalActivity >= 15) return 'yellow';
  return 'green';
};

// Helper function to determine badge number
const getBadgeNumber = (agent) => {
  const totalActivity = (agent.company_call_attempts || 0) + 
                       (agent.company_whatsapp_attempts || 0) + 
                       (agent.company_email_attempts || 0) + 
                       (agent.pkg_sends_total || 0) + 
                       (agent.new_enquiries_total || 0) +
                       (agent.company_live_enquiry_count || 0) +
                       (agent.paid_total || 0);
  
  // Adjust thresholds based on actual data patterns
  if (totalActivity >= 50) return 5;
  if (totalActivity >= 30) return 4;
  if (totalActivity >= 15) return 3;
  if (totalActivity >= 5) return 2;
  return 1;
};
