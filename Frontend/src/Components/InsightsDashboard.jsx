import  { useEffect, useState } from 'react';
import axios from 'axios';

const InsightsDashboard = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('https://chatassit.onrender.com/api/insights');
        const data=await response.json();
        setInsights(data.Insights.Insights);
        // console.log(data.Insights.Insights);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch research insights');
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const getStatusStyle = (status) => {
    const statusStyles = {
      Ongoing: 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-purple-100 text-purple-800'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
        style={{ width: progress }}
      ></div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Research Insights Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(insight.status)}`}>
                    {insight.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{insight.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned Team:</span>
                    <span className="font-medium text-gray-700">{insight.assigned_to}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress:</span>
                    <span className="font-medium text-green-600">{insight.progress}</span>
                  </div>
                  
                  <ProgressBar progress={insight.progress} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsDashboard;