
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface AddEmployeeFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Login Credentials
    employeeId: '',
    password: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    dateOfBirth: null as Date | null,
    gender: '',
    maritalStatus: '',
    nationality: 'Indian',
    
    // Identification
    aadhaarNumber: '',
    panNumber: '',
    
    // Address
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsPermanent: false,
    
    // Bank Details
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountNumber: '',
    accountType: '',
    
    // Education
    degree: '',
    institute: '',
    graduationYear: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactAddress: '',
    
    // Job Details
    department: '',
    designation: '',
    
    // Salary Information
    annualCtc: '',
    monthlyCtc: '',
    basicMonthly: '',
    hraMonthly: '',
    conveyanceMonthly: '',
    medicalMonthly: '',
    pfMonthly: '',
    otherMonthly: '',
    incentives: '',
    
    // Profile Photo
    profilePhoto: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const calculateAnnualBreakdown = () => {
    const monthly = {
      basic: parseFloat(formData.basicMonthly) || 0,
      hra: parseFloat(formData.hraMonthly) || 0,
      conveyance: parseFloat(formData.conveyanceMonthly) || 0,
      medical: parseFloat(formData.medicalMonthly) || 0,
      pf: parseFloat(formData.pfMonthly) || 0,
      other: parseFloat(formData.otherMonthly) || 0
    };

    return {
      basic: monthly.basic * 12,
      hra: monthly.hra * 12,
      conveyance: monthly.conveyance * 12,
      medical: monthly.medical * 12,
      pf: monthly.pf * 12,
      other: monthly.other * 12
    };
  };

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
    setPhotoPreview(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (type: 'permanent' | 'current', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value
      }
    }));
  };

  const handleSameAsPermanent = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsPermanent: checked,
      currentAddress: checked ? { ...prev.permanentAddress } : {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const annual = calculateAnnualBreakdown();
    
    const employeeData = {
      ...formData,
      annualBreakdown: annual
    };

    onSubmit(employeeData);
    
    toast({
      title: "Success",
      description: "Employee added successfully"
    });
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

        {/* Login Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Login Credentials</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                placeholder="Enter Employee ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter Password"
                required
              />
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
            <div>
              <Label htmlFor="alternatePhoneNumber">Alternate Phone</Label>
              <Input
                id="alternatePhoneNumber"
                value={formData.alternatePhoneNumber}
                onChange={(e) => handleInputChange('alternatePhoneNumber', e.target.value)}
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => handleInputChange('dateOfBirth', date)}
                    className="p-3 pointer-events-auto"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Identification */}
        <Card>
          <CardHeader>
            <CardTitle>Identification</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
              <Input
                id="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                placeholder="XXXX XXXX XXXX"
              />
            </div>
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                value={formData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                placeholder="ABCDE1234F"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Permanent Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="permanentStreet">Street Address</Label>
                  <Input
                    id="permanentStreet"
                    value={formData.permanentAddress.street}
                    onChange={(e) => handleAddressChange('permanent', 'street', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="permanentCity">City</Label>
                  <Input
                    id="permanentCity"
                    value={formData.permanentAddress.city}
                    onChange={(e) => handleAddressChange('permanent', 'city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="permanentState">State</Label>
                  <Input
                    id="permanentState"
                    value={formData.permanentAddress.state}
                    onChange={(e) => handleAddressChange('permanent', 'state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="permanentPincode">Pincode</Label>
                  <Input
                    id="permanentPincode"
                    value={formData.permanentAddress.pincode}
                    onChange={(e) => handleAddressChange('permanent', 'pincode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsPermanent"
                checked={formData.sameAsPermanent}
                onCheckedChange={handleSameAsPermanent}
              />
              <Label htmlFor="sameAsPermanent">Current address same as permanent</Label>
            </div>

            {!formData.sameAsPermanent && (
              <div>
                <h4 className="font-medium mb-3">Current Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="currentStreet">Street Address</Label>
                    <Input
                      id="currentStreet"
                      value={formData.currentAddress.street}
                      onChange={(e) => handleAddressChange('current', 'street', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentCity">City</Label>
                    <Input
                      id="currentCity"
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange('current', 'city', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentState">State</Label>
                    <Input
                      id="currentState"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange('current', 'state', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPincode">Pincode</Label>
                    <Input
                      id="currentPincode"
                      value={formData.currentAddress.pincode}
                      onChange={(e) => handleAddressChange('current', 'pincode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
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
              />
            </div>
            <div>
              <Label htmlFor="branchName">Branch</Label>
              <Input
                id="branchName"
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="institute">Institute</Label>
              <Input
                id="institute"
                value={formData.institute}
                onChange={(e) => handleInputChange('institute', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Year</Label>
              <Input
                id="graduationYear"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
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
              <Label htmlFor="emergencyContactName">Name</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactRelationship">Relationship</Label>
              <Input
                id="emergencyContactRelationship"
                value={formData.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Phone</Label>
              <Input
                id="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactAddress">Address</Label>
              <Input
                id="emergencyContactAddress"
                value={formData.emergencyContactAddress}
                onChange={(e) => handleInputChange('emergencyContactAddress', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Job and Salary Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job and Salary Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
