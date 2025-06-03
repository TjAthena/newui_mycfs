
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, GraduationCap, UserCheck } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  photo: string;
  role: string;
  department: string;
  email: string;
  joinDate: string;
  phone?: string;
  address?: string;
  salary?: {
    annual: number;
    monthly: number;
    breakdown: {
      basic: number;
      hra: number;
      conveyance: number;
      medical: number;
      pf: number;
      incentives: number;
      other: number;
    };
  };
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
  };
  education?: {
    degree: string;
    institute: string;
    year: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface EmployeeDetailsViewProps {
  employee: Employee;
}

const EmployeeDetailsView: React.FC<EmployeeDetailsViewProps> = ({ employee }) => {
  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
            />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <Badge variant="outline">{employee.id}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {employee.phone || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">{employee.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Information */}
      {employee.salary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Salary Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Annual CTC</p>
                <p className="text-2xl font-bold text-green-600">₹{employee.salary.annual.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Monthly CTC</p>
                <p className="text-2xl font-bold text-blue-600">₹{employee.salary.monthly.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Salary Breakdown (Monthly)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">Basic</p>
                  <p className="font-medium">₹{employee.salary.breakdown.basic.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">HRA</p>
                  <p className="font-medium">₹{employee.salary.breakdown.hra.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">Conveyance</p>
                  <p className="font-medium">₹{employee.salary.breakdown.conveyance.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">Medical</p>
                  <p className="font-medium">₹{employee.salary.breakdown.medical.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">PF</p>
                  <p className="font-medium">₹{employee.salary.breakdown.pf.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">Incentives</p>
                  <p className="font-medium">₹{employee.salary.breakdown.incentives.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-600">Other</p>
                  <p className="font-medium">₹{employee.salary.breakdown.other.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-blue-600 font-medium">Total</p>
                  <p className="font-bold text-blue-700">₹{employee.salary.monthly.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bank Details */}
      {employee.bankDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="font-medium">{employee.bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-medium">{employee.bankDetails.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">IFSC Code</p>
                <p className="font-medium">{employee.bankDetails.ifsc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {employee.education && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Degree</p>
                <p className="font-medium">{employee.education.degree}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Institute</p>
                <p className="font-medium">{employee.education.institute}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{employee.education.year}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contact */}
      {employee.emergencyContact && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{employee.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="font-medium">{employee.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{employee.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeDetailsView;
