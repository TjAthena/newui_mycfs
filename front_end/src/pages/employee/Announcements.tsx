
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, FileText } from 'lucide-react';

const EmployeeAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Q4 Performance Review Results',
      date: '2024-01-15',
      description: 'Individual performance review results for Q4 2023 are now available. Please review your scores and feedback.',
      hasResultPdf: true,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Annual Company Picnic - Save the Date',
      date: '2024-01-10',
      description: 'Our annual company picnic is scheduled for March 15th, 2024. More details including venue and activities will be shared soon.',
      hasResultPdf: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'New Health Insurance Policy Updates',
      date: '2024-01-08',
      description: 'We have updated our health insurance policy with enhanced coverage. Please review the new benefits and coverage details.',
      hasResultPdf: true,
      priority: 'high'
    },
    {
      id: 4,
      title: 'IT Security Training - Mandatory',
      date: '2024-01-05',
      description: 'All employees are required to complete the IT security training by January 31st, 2024. Access the training portal with your credentials.',
      hasResultPdf: false,
      priority: 'high'
    },
    {
      id: 5,
      title: 'Office Renovation Schedule',
      date: '2024-01-03',
      description: 'The office renovation will begin on February 1st. Temporary seating arrangements and schedule details are attached.',
      hasResultPdf: true,
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Welcome New Team Members',
      date: '2024-01-01',
      description: 'We are excited to welcome 5 new team members who joined us this month. Please extend a warm welcome to our new colleagues.',
      hasResultPdf: false,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Announcements</h1>
        <p className="text-gray-600">Stay updated with the latest company announcements and news</p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover-scale">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg text-navy">{announcement.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority.toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(announcement.date)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{announcement.description}</p>
              
              {announcement.hasResultPdf && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 flex-1">
                    Additional documents available
                  </span>
                  <Button size="sm" className="bg-blue-accent hover:bg-blue-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No More Announcements */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">You're all caught up! No more announcements to show.</p>
      </div>
    </div>
  );
};

export default EmployeeAnnouncements;
