import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Download, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const metrics = [
    {
      title: 'Total Employees',
      value: '127',
      change: '+8 this month',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Average Salary',
      value: '₹8,50,000',
      change: '+5.2% from last year',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Total Announcements',
      value: '24',
      change: '6 this month',
      changeType: 'neutral' as const,
      icon: FileText
    }
  ];

  const recentEmployees = [
    {
      id: 'EMP127',
      name: 'Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      contact: 'priya.sharma@confidencefs.com',
      joinDate: '2024-01-15'
    },
    {
      id: 'EMP126',
      name: 'Rahul Patel',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      contact: 'rahul.patel@confidencefs.com',
      joinDate: '2024-01-10'
    },
    {
      id: 'EMP125',
      name: 'Anita Kumar',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      contact: 'anita.kumar@confidencefs.com',
      joinDate: '2024-01-08'
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: 'Q4 Performance Review Results',
      date: '2024-01-15',
      hasResultPdf: true
    },
    {
      id: 2,
      title: 'Annual Company Picnic',
      date: '2024-01-10',
      hasResultPdf: false
    },
    {
      id: 3,
      title: 'Health Insurance Updates',
      date: '2024-01-08',
      hasResultPdf: true
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your employee management system</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-navy">{metric.value}</p>
                    <p className={`text-sm mt-1 ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500 truncate">{employee.contact}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{employee.id}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(employee.joinDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{announcement.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(announcement.date)}
                      </div>
                    </div>
                    {announcement.hasResultPdf && (
                      <Button size="sm" variant="outline" className="shrink-0">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
