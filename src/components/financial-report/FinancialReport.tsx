import { ResponsiveBar } from '@nivo/bar';
import { Button, Select } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const FinancialReport: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [type, setType] = useState<'monthly' | 'quarterly' | 'yearly'>(
    'monthly'
  );
  const [filter, setFilter] = useState<{
    buildingId?: string;
    assetType?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api-realty-estate.xn--hthng-171byc.vn:3000/financial-report',
        {
          params: { type, ...filter },
        }
      );
      setData(
        response.data.map((item: any) => ({
          period: type === 'monthly' ? `Month ${item._id}` : `Q${item._id}`,
          Revenue: item.totalRevenue,
          Expenses: item.totalExpenses,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch financial report:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, type]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Financial Report</h2>
        <div className="flex space-x-4">
          <Select
            placeholder="Select Type"
            value={type}
            onChange={(value) => setType(value)}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'yearly', label: 'Yearly' },
            ]}
          />
          <Select
            placeholder="Filter by Building"
            onChange={(value) => handleFilterChange('buildingId', value)}
            options={[
              { value: 'building1', label: 'Building 1' },
              { value: 'building2', label: 'Building 2' },
            ]}
          />
          <Select
            placeholder="Filter by Asset Type"
            onChange={(value) => handleFilterChange('assetType', value)}
            options={[
              { value: 'Office', label: 'Office' },
              { value: 'Retail', label: 'Retail' },
              { value: 'Housing', label: 'Housing' },
            ]}
          />
          <Button onClick={fetchReport} type="primary">
            Refresh
          </Button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ width: '100%', height: 'calc(100vh - 280px)' }}>
          <ResponsiveBar
            data={data}
            keys={['Revenue', 'Expenses']}
            indexBy="period"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Period',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Amount',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} in period: ${e.indexValue}`
            }
          />
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
