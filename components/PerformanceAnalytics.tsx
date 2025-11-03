
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { PerformanceData, Subject } from '../types';
import Card from './common/Card';
import Button from './common/Button';

interface PerformanceAnalyticsProps {
  performance: PerformanceData;
  onRestart: () => void;
  agencyColor: string;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ performance, onRestart, agencyColor }) => {
  const chartData = Object.entries(performance.bySubject).map(([subject, data]) => ({
    name: subject,
    correct: data.correct,
    total: data.total,
    score: (data.correct / data.total) * 100,
  }));

  const overallScoreColor = performance.score >= 70 ? 'text-green-500' : performance.score >= 40 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="p-4 space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Practice Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overall Score</p>
            <p className={`text-4xl font-bold ${overallScoreColor}`}>{performance.score.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</p>
            <p className="text-4xl font-bold text-green-500">{performance.correctAnswers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Incorrect Answers</p>
            <p className="text-4xl font-bold text-red-500">{performance.incorrectAnswers}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Performance by Subject</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
              <YAxis tick={{ fill: '#a0aec0' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: '#4a5568',
                  color: '#ffffff'
                }}
                formatter={(value: number, name: string) => [name === 'score' ? `${value.toFixed(0)}%` : value, name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Legend />
              <Bar dataKey="score" name="Score (%)" fill="#8884d8">
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#48bb78' : entry.score >= 40 ? '#f6e05e' : '#f56565'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <div className="text-center">
        <Button onClick={onRestart} color={agencyColor} >
          Start a New Practice
        </Button>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
