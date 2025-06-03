
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Calendar, FileText, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminAnnouncements = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Q4 Performance Review Results',
      description: 'Individual performance review results for Q4 2023 are now available. Please review your scores and feedback.',
      priority: 'high',
      date: '2024-01-15',
      hasResultPdf: true,
      pdfFileName: 'q4-performance-results.pdf'
    },
    {
      id: 2,
      title: 'Annual Company Picnic - Save the Date',
      description: 'Our annual company picnic is scheduled for March 15th, 2024. More details including venue and activities will be shared soon.',
      priority: 'medium',
      date: '2024-01-10',
      hasResultPdf: false,
      pdfFileName: null
    },
    {
      id: 3,
      title: 'New Health Insurance Policy Updates',
      description: 'We have updated our health insurance policy with enhanced coverage. Please review the new benefits and coverage details.',
      priority: 'high',
      date: '2024-01-08',
      hasResultPdf: true,
      pdfFileName: 'health-insurance-updates.pdf'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    priority: 'medium',
    hasResultPdf: false,
    pdfFile: null
  });

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

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const announcement = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      description: newAnnouncement.description,
      priority: newAnnouncement.priority,
      date: new Date().toISOString().split('T')[0],
      hasResultPdf: newAnnouncement.hasResultPdf,
      pdfFileName: newAnnouncement.hasResultPdf ? 'document.pdf' : null
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', description: '', priority: 'medium', hasResultPdf: false, pdfFile: null });
    setIsAddModalOpen(false);
    
    toast({
      title: "Success",
      description: "Announcement created successfully"
    });
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    toast({
      title: "Success",
      description: "Announcement deleted successfully"
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewAnnouncement({
        ...newAnnouncement,
        hasResultPdf: true,
        pdfFile: file
      });
      toast({
        title: "File uploaded",
        description: `${file.name} has been selected`
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-2">Manage Announcements</h1>
          <p className="text-gray-600">Create, edit, and manage company announcements</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-accent hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
                  placeholder="Enter announcement description"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Attach Document (Optional)</Label>
                <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-accent transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-blue-accent hover:text-blue-600 font-medium">
                        Click to upload PDF
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF files only, max 10MB</p>
                    {newAnnouncement.pdfFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {newAnnouncement.pdfFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAnnouncement} className="bg-blue-accent hover:bg-blue-600">
                Create Announcement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover-scale">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg text-navy">{announcement.title}</CardTitle>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(announcement.date)}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{announcement.description}</p>
              
              {announcement.hasResultPdf && (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      {announcement.pdfFileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Replace PDF
                    </Button>
                    <Button size="sm" className="bg-blue-accent hover:bg-blue-600">
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">No announcements yet</p>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-accent hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Announcement
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
