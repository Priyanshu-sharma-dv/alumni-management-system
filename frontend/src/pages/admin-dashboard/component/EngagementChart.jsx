import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const EngagementChart = ({ data, title, type = 'line' }) => {
  // Default mock data (fallback if no data prop is passed)
  const defaultData = [
    { month: 'Jan', users: 2400, events: 1200, donations: 800 },
    { month: 'Feb', users: 2800, events: 1400, donations: 950 },
    { month: 'Mar', users: 3200, events: 1600, donations: 1100 },
    { month: 'Apr', users: 2900, events: 1350, donations: 1050 },
    { month: 'May', users: 3500, events: 1800, donations: 1300 },
    { month: 'Jun', users: 3800, events: 1950, donations: 1450 },
    { month: 'Jul', users: 4100, events: 2100, donations: 1600 },
    { month: 'Aug', users: 3900, events: 2000, donations: 1550 },
    { month: 'Sep', users: 4300, events: 2200, donations: 1700 },
  ];

  // Use incoming data if provided, else fallback
  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Donations</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80" aria-label="Engagement Analytics Chart">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#FF6B35"
                fill="#FF6B35"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="events"
                stackId="1"
                stroke="#4A90A4"
                fill="#4A90A4"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="donations"
                stackId="1"
                stroke="#38A169"
                fill="#38A169"
                fillOpacity={0.6}
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#FF6B35"
                strokeWidth={3}
                dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#4A90A4"
                strokeWidth={3}
                dot={{ fill: '#4A90A4', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#38A169"
                strokeWidth={3}
                dot={{ fill: '#38A169', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementChart;
