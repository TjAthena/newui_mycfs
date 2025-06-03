
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface EditEmployeeFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData: any;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    designation: '',
    annualCtc: '',
    monthlyCtc: '',
    basicMonthly: '',
    hraMonthly: '',
    conveyanceMonthly: '',
    medicalMonthly: '',
    pfMonthly: '',
    otherMonthly: '',
    incentives: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    degree: '',
    institute: '',
    graduationYear: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    profilePhoto: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.id || '',
        firstName: initialData.name?.split(' ')[0] || '',
        lastName: initialData.name?.split(' ').slice(1).join(' ') || '',
        email: initialData.email || '',
        phoneNumber: initialData.phone || '',
        department: initialData.department || '',
        designation: initialData.role || '',
        annualCtc: initialData.salary?.annual?.toString() || '',
        monthlyCtc: initialData.salary?.monthly?.toString() || '',
        basicMonthly: initialData.salary?.breakdown?.basic?.toString() || '',
        hraMonthly: initialData.salary?.breakdown?.hra?.toString() || '',
        conveyanceMonthly: initialData.salary?.breakdown?.conveyance?.toString() || '',
        medicalMonthly: initialData.salary?.breakdown?.medical?.toString() || '',
        pfMonthly: initialData.salary?.breakdown?.pf?.toString() || '',
        otherMonthly: initialData.salary?.breakdown?.other?.toString() || '',
        incentives: initialData.salary?.breakdown?.incentives?.toString() || '',
        bankName: initialData.bankDetails?.bankName || '',
        accountNumber: initialData.bankDetails?.accountNumber || '',
        ifscCode: initialData.bankDetails?.ifsc || '',
        degree: initialData.education?.degree || '',
        institute: initialData.education?.institute || '',
        graduationYear: initialData.education?.year || '',
        emergencyContactName: initialData.emergencyContact?.name || '',
        emergencyContactRelationship: initialData.emergencyContact?.relationship || '',
        emergencyContactPhone: initialData.emergencyContact?.phone || '',
        profilePhoto: null
      });
      
      if (initialData.photo) {
        setPhotoPreview(initialData.photo);
      }
    }
  }, [initialData]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Photo size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Only JPG, JPEG, and PNG files are allowed",
          variant: "destructive"
        });
        return;
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    setPhotoPreview(initialData.photo || null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img 
                    src={photoPreview} 
                    alt="Profile preview" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              
              <div>
                <Label htmlFor="profilePhoto" className="cursor-pointer">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
                    {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </div>
                </Label>
                <Input
                  id="profilePhoto"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">Max 5MB, JPG/PNG only</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee ID */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                placeholder="Employee ID"
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">Employee ID cannot be changed</p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter Phone Number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Enter Designation"
              />
            </div>
          </CardContent>
        </Card>

        {/* Salary Information */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annualCtc">Annual CTC (₹)</Label>
                <Input
                  id="annualCtc"
                  type="number"
                  value={formData.annualCtc}
                  onChange={(e) => handleInputChange('annualCtc', e.target.value)}
                  placeholder="Enter Annual CTC"
                />
              </div>
              <div>
                <Label htmlFor="monthlyCtc">Monthly CTC (₹)</Label>
                <Input
                  id="monthlyCtc"
                  type="number"
                  value={formData.monthlyCtc}
                  onChange={(e) => handleInputChange('monthlyCtc', e.target.value)}
                  placeholder="Enter Monthly CTC"
                />
              </div>
            </div>

            <h4 className="font-medium text-lg">Monthly Salary Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basicMonthly">Basic (₹)</Label>
                <Input
                  id="basicMonthly"
                  type="number"
                  value={formData.basicMonthly}
                  onChange={(e) => handleInputChange('basicMonthly', e.target.value)}
                  placeholder="Basic Amount"
                />
              </div>
              <div>
                <Label htmlFor="hraMonthly">HRA (₹)</Label>
                <Input
                  id="hraMonthly"
                  type="number"
                  value={formData.hraMonthly}
                  onChange={(e) => handleInputChange('hraMonthly', e.target.value)}
                  placeholder="HRA Amount"
                />
              </div>
              <div>
                <Label htmlFor="conveyanceMonthly">Conveyance (₹)</Label>
                <Input
                  id="conveyanceMonthly"
                  type="number"
                  value={formData.conveyanceMonthly}
                  onChange={(e) => handleInputChange('conveyanceMonthly', e.target.value)}
                  placeholder="Conveyance Amount"
                />
              </div>
              <div>
                <Label htmlFor="medicalMonthly">Medical (₹)</Label>
                <Input
                  id="medicalMonthly"
                  type="number"
                  value={formData.medicalMonthly}
                  onChange={(e) => handleInputChange('medicalMonthly', e.target.value)}
                  placeholder="Medical Amount"
                />
              </div>
              <div>
                <Label htmlFor="pfMonthly">PF (₹)</Label>
                <Input
                  id="pfMonthly"
                  type="number"
                  value={formData.pfMonthly}
                  onChange={(e) => handleInputChange('pfMonthly', e.target.value)}
                  placeholder="PF Amount"
                />
              </div>
              <div>
                <Label htmlFor="otherMonthly">Other (₹)</Label>
                <Input
                  id="otherMonthly"
                  type="number"
                  value={formData.otherMonthly}
                  onChange={(e) => handleInputChange('otherMonthly', e.target.value)}
                  placeholder="Other Amount"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="incentives">Monthly Incentives (₹)</Label>
              <Input
                id="incentives"
                type="number"
                value={formData.incentives}
                onChange={(e) => handleInputChange('incentives', e.target.value)}
                placeholder="Enter Monthly Incentives"
              />
              <p className="text-xs text-gray-500 mt-1">Incentives are added separately to monthly salary</p>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="Enter Bank Name"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Enter Account Number"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                placeholder="Enter IFSC Code"
              />
            </div>
          </CardContent>
        </Card>

        {/* Education Details */}
        <Card>
          <CardHeader>
            <CardTitle>Education Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree/Qualification</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="Enter Degree"
              />
            </div>
            <div>
              <Label htmlFor="institute">Institute/University</Label>
              <Input
                id="institute"
                value={formData.institute}
                onChange={(e) => handleInputChange('institute', e.target.value)}
                placeholder="Enter Institute"
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                placeholder="Enter Year"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContactName">Contact Name</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                placeholder="Enter Contact Name"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactRelationship">Relationship</Label>
              <Select value={formData.emergencyContactRelationship} onValueChange={(value) => handleInputChange('emergencyContactRelationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Father">Father</SelectItem>
                  <SelectItem value="Mother">Mother</SelectItem>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                placeholder="Enter Contact Phone"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
