
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import EmployeeLayout from "./layouts/EmployeeLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeProfile from "./pages/employee/Profile";
import EmployeeAnnouncements from "./pages/employee/Announcements";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageEmployees from "./pages/admin/ManageEmployees";
import AdminAnnouncements from "./pages/admin/Announcements";
import DocumentUpload from "./pages/admin/DocumentUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            
            {/* Employee Routes */}
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="announcements" element={<EmployeeAnnouncements />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="employees" element={<ManageEmployees />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="document-upload" element={<DocumentUpload />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
