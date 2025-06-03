
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({});

  const employees = [
    { id: 'EMP001', name: 'John Doe' },
    { id: 'EMP002', name: 'Priya Sharma' },
    { id: 'EMP003', name: 'Rahul Patel' },
    { id: 'EMP004', name: 'Anita Kumar' }
  ];

  const documentTypes = [
    'Offer Letter',
    'Appointment Letter',
    'Increment Letter',
    'Payslip',
    'Aadhaar',
    'PAN',
    '12th Marksheet',
    'Bank Passbook'
  ];

  const documentChecklist = [
    { name: 'Offer Letter', category: 'Employment', required: false },
    { name: 'Appointment Letter', category: 'Employment', required: false },
    { name: 'Promotion Letter', category: 'Employment', required: false },
    { name: 'Increment Letter', category: 'Employment', required: false },
    { name: 'Aadhaar', category: 'Identity', required: false },
    { name: 'PAN', category: 'Identity', required: false },
    { name: 'Certificates', category: 'Education', required: false },
    { name: 'Cheque', category: 'Banking', required: false },
    { name: 'Photo', category: 'Personal', required: false }
  ];

  const handleFileUpload = (docType: string, file: File | null) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [docType]: file }));
      toast({
        title: "File Uploaded",
        description: `${file.name} uploaded for ${docType}`
      });
    }
  };

  const handleSingleUpload = () => {
    if (!selectedEmployee || !selectedDocType) {
      toast({
        title: "Error",
        description: "Please select employee and document type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Document uploaded for ${employees.find(e => e.id === selectedEmployee)?.name}`
    });
  };

  const handleBulkUpload = () => {
    if (!selectedEmployee) {
      toast({
        title: "Error",
        description: "Please select an employee",
        variant: "destructive"
      });
      return;
    }

    const uploadedCount = Object.keys(uploadedFiles).length;
    toast({
      title: "Success",
      description: `${uploadedCount} documents uploaded for ${employees.find(e => e.id === selectedEmployee)?.name}`
    });
  };

  const removeFile = (docType: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[docType];
      return newFiles;
    });
    toast({
      title: "File Removed",
      description: `File removed for ${docType}`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Document Upload</h1>
        <p className="text-gray-600">Upload and manage employee documents</p>
      </div>

      {/* Single Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Single Document</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employee">Select Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name} ({emp.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doctype">Document Type</Label>
              <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Upload File</Label>
            <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-accent transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label htmlFor="single-file-upload" className="cursor-pointer">
                  <span className="text-blue-accent hover:text-blue-600 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <input
                  id="single-file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && selectedDocType) {
                      handleFileUpload(selectedDocType, file);
                    }
                  }}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG files only, max 10MB</p>
              </div>
            </div>
          </div>

          <Button onClick={handleSingleUpload} className="bg-blue-accent hover:bg-blue-600">
            Upload Document
          </Button>
        </CardContent>
      </Card>

      {/* Bulk Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Document Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bulk-employee">Select Employee</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Choose employee for bulk upload" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name} ({emp.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEmployee && (
            <div>
              <h3 className="font-semibold mb-4">Document Upload Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentChecklist.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-accent" />
                        <span className="font-medium text-sm">{doc.name}</span>
                      </div>
                      {uploadedFiles[doc.name] ? (
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-green-600" />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(doc.name)}
                            className="p-1 h-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Upload className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">{doc.category}</p>
                    
                    {uploadedFiles[doc.name] ? (
                      <p className="text-xs text-green-600 font-medium">
                        {uploadedFiles[doc.name]?.name}
                      </p>
                    ) : (
                      <label htmlFor={`file-${index}`} className="cursor-pointer">
                        <div className="border-2 border-dashed border-gray-200 rounded p-2 text-center hover:border-blue-accent transition-colors">
                          <span className="text-xs text-gray-500">Upload file</span>
                        </div>
                        <input
                          id={`file-${index}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(doc.name, file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  {Object.keys(uploadedFiles).length} of {documentChecklist.length} documents uploaded
                </span>
                <Button onClick={handleBulkUpload} className="bg-blue-accent hover:bg-blue-600">
                  Upload All Documents
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
