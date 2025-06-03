
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Users, Plus, Edit, Trash2, Search, Upload, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddEmployeeForm from '@/components/forms/AddEmployeeForm';
import EditEmployeeForm from '@/components/forms/EditEmployeeForm';
import EmployeeDetailsView from '@/components/EmployeeDetailsView';
import { Link } from 'react-router-dom';

const ManageEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'John Doe',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Senior Analyst',
      department: 'Finance',
      email: 'john.doe@confidencefs.com',
      joinDate: '2022-03-15',
      phone: '+91 9876543210',
      salary: {
        annual: 800000,
        monthly: 66667,
        breakdown: {
          basic: 30000,
          hra: 15000,
          conveyance: 5000,
          medical: 2000,
          pf: 3600,
          incentives: 8000,
          other: 3067
        }
      },
      bankDetails: {
        bankName: 'State Bank of India',
        accountNumber: '12345678901',
        ifsc: 'SBIN0001234'
      },
      education: {
        degree: 'MBA Finance',
        institute: 'Delhi University',
        year: '2020'
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+91 9876543211'
      }
    },
    {
      id: 'EMP002',
      name: 'Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      role: 'HR Manager',
      department: 'Human Resources',
      email: 'priya.sharma@confidencefs.com',
      joinDate: '2021-08-10',
      phone: '+91 9876543211',
      salary: {
        annual: 700000,
        monthly: 58333,
        breakdown: {
          basic: 25000,
          hra: 12500,
          conveyance: 4000,
          medical: 2000,
          pf: 3000,
          incentives: 6000,
          other: 5833
        }
      },
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '12345678902',
        ifsc: 'HDFC0001234'
      },
      education: {
        degree: 'MBA HR',
        institute: 'Mumbai University',
        year: '2019'
      },
      emergencyContact: {
        name: 'Raj Sharma',
        relationship: 'Father',
        phone: '+91 9876543212'
      }
    },
    {
      id: 'EMP003',
      name: 'Rahul Patel',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      role: 'Software Developer',
      department: 'Technology',
      email: 'rahul.patel@confidencefs.com',
      joinDate: '2023-01-20',
      phone: '+91 9876543212',
      salary: {
        annual: 900000,
        monthly: 75000,
        breakdown: {
          basic: 35000,
          hra: 17500,
          conveyance: 6000,
          medical: 2500,
          pf: 4200,
          incentives: 10000,
          other: -200
        }
      },
      bankDetails: {
        bankName: 'ICICI Bank',
        accountNumber: '12345678903',
        ifsc: 'ICIC0001234'
      },
      education: {
        degree: 'B.Tech Computer Science',
        institute: 'IIT Delhi',
        year: '2022'
      },
      emergencyContact: {
        name: 'Meera Patel',
        relationship: 'Mother',
        phone: '+91 9876543213'
      }
    },
    {
      id: 'EMP004',
      name: 'Anita Kumar',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      role: 'Marketing Specialist',
      department: 'Marketing',
      email: 'anita.kumar@confidencefs.com',
      joinDate: '2022-11-05',
      phone: '+91 9876543213',
      salary: {
        annual: 600000,
        monthly: 50000,
        breakdown: {
          basic: 22000,
          hra: 11000,
          conveyance: 3500,
          medical: 1500,
          pf: 2640,
          incentives: 5000,
          other: 4360
        }
      },
      bankDetails: {
        bankName: 'Axis Bank',
        accountNumber: '12345678904',
        ifsc: 'UTIB0001234'
      },
      education: {
        degree: 'MBA Marketing',
        institute: 'Pune University',
        year: '2021'
      },
      emergencyContact: {
        name: 'Suresh Kumar',
        relationship: 'Father',
        phone: '+91 9876543214'
      }
    }
  ]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || employee.department.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage);

  const handleAddEmployee = (employeeData: any) => {
    const employee = {
      id: employeeData.employeeId,
      name: `${employeeData.firstName} ${employeeData.lastName}`,
      photo: employeeData.profilePhoto ? URL.createObjectURL(employeeData.profilePhoto) : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: employeeData.designation,
      department: employeeData.department,
      email: employeeData.email,
      joinDate: new Date().toISOString().split('T')[0],
      phone: employeeData.phoneNumber,
      salary: {
        annual: parseInt(employeeData.annualCtc) || 0,
        monthly: parseInt(employeeData.monthlyCtc) || 0,
        breakdown: {
          basic: parseInt(employeeData.basicMonthly) || 0,
          hra: parseInt(employeeData.hraMonthly) || 0,
          conveyance: parseInt(employeeData.conveyanceMonthly) || 0,
          medical: parseInt(employeeData.medicalMonthly) || 0,
          pf: parseInt(employeeData.pfMonthly) || 0,
          incentives: parseInt(employeeData.incentives) || 0,
          other: parseInt(employeeData.otherMonthly) || 0
        }
      },
      bankDetails: {
        bankName: employeeData.bankName || '',
        accountNumber: employeeData.accountNumber || '',
        ifsc: employeeData.ifscCode || ''
      },
      education: {
        degree: employeeData.degree || '',
        institute: employeeData.institute || '',
        year: employeeData.graduationYear || ''
      },
      emergencyContact: {
        name: employeeData.emergencyContactName || '',
        relationship: employeeData.emergencyContactRelationship || '',
        phone: employeeData.emergencyContactPhone || ''
      }
    };

    setEmployees([...employees, employee]);
    setIsAddModalOpen(false);
    toast({
      title: "Success",
      description: "Employee added successfully. Login credentials have been created."
    });
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast({
      title: "Success",
      description: "Employee deleted successfully. Login credentials have been removed."
    });
  };

  const handleUpdateEmployee = (updatedData: any) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { 
            ...emp, 
            name: `${updatedData.firstName} ${updatedData.lastName}`,
            email: updatedData.email,
            phone: updatedData.phoneNumber,
            role: updatedData.designation,
            department: updatedData.department,
            salary: {
              ...emp.salary,
              annual: parseInt(updatedData.annualCtc) || emp.salary.annual,
              monthly: parseInt(updatedData.monthlyCtc) || emp.salary.monthly,
              breakdown: {
                basic: parseInt(updatedData.basicMonthly) || emp.salary.breakdown.basic,
                hra: parseInt(updatedData.hraMonthly) || emp.salary.breakdown.hra,
                conveyance: parseInt(updatedData.conveyanceMonthly) || emp.salary.breakdown.conveyance,
                medical: parseInt(updatedData.medicalMonthly) || emp.salary.breakdown.medical,
                pf: parseInt(updatedData.pfMonthly) || emp.salary.breakdown.pf,
                incentives: parseInt(updatedData.incentives) || emp.salary.breakdown.incentives,
                other: parseInt(updatedData.otherMonthly) || emp.salary.breakdown.other
              }
            },
            photo: updatedData.profilePhoto ? URL.createObjectURL(updatedData.profilePhoto) : emp.photo
          }
        : emp
    ));
    setIsEditModalOpen(false);
    toast({
      title: "Success",
      description: "Employee details updated successfully"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-2">Manage Employees</h1>
          <p className="text-gray-600">Add, edit, and manage employee records</p>
        </div>
        
        <div className="flex gap-2">
          <Link to="/admin/document-upload">
            <Button variant="outline" className="border-blue-accent text-blue-accent hover:bg-blue-50">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-accent hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <AddEmployeeForm 
                onSubmit={handleAddEmployee}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="human resources">Human Resources</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Employees ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Employee</th>
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Role</th>
                  <th className="text-left py-3 px-2">Department</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.photo}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline">{employee.id}</Badge>
                    </td>
                    <td className="py-3 px-2">{employee.role}</td>
                    <td className="py-3 px-2">{employee.department}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewEmployee(employee)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {employee.name}? This action cannot be undone and will remove their login credentials.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteEmployee(employee.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + employeesPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm px-3 py-1 bg-gray-100 rounded">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Employee Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Employee Details - {selectedEmployee?.name}</DialogTitle>
          </DialogHeader>
          {selectedEmployee && <EmployeeDetailsView employee={selectedEmployee} />}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Employee - {selectedEmployee?.name}</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <EditEmployeeForm 
              onSubmit={handleUpdateEmployee}
              onCancel={() => setIsEditModalOpen(false)}
              initialData={selectedEmployee}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEmployees;
