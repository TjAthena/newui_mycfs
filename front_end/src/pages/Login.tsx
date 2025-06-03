
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ForgotPasswordDialog from '@/components/ForgotPasswordDialog';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!credentials.id || !credentials.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(credentials.id, credentials.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect based on user role
        if (credentials.id.startsWith('admin')) {
          navigate('/admin/dashboard');
        } else {
          navigate('/employee/profile');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/4cd0f138-e865-4e5d-b5f5-d130269dc53d.png" 
              alt="Confidence Financial Services" 
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-white border-opacity-30"
            />
          </div>
          
          {/* Abstract Design */}
          <div className="space-y-6 opacity-80">
            <div className="flex justify-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full animate-pulse delay-100"></div>
            </div>
            <div className="flex justify-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-25 rounded-full animate-bounce"></div>
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full animate-bounce delay-200"></div>
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full animate-bounce delay-300"></div>
            </div>
            <div className="h-32 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/lovable-uploads/4cd0f138-e865-4e5d-b5f5-d130269dc53d.png" 
              alt="Confidence Financial Services" 
              className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-4 border-white border-opacity-30"
            />
          </div>

          <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Sign In</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID / Admin ID
                  </label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="Enter your ID"
                    value={credentials.id}
                    onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                    <DialogTrigger asChild>
                      <button 
                        type="button" 
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Forgot Password?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                      </DialogHeader>
                      <ForgotPasswordDialog onClose={() => setIsForgotPasswordOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-3 text-center">Demo Credentials:</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span className="font-medium text-blue-600">Admin:</span>
                    </div>
                    <span className="text-gray-600">ID: admin001, Password: admin123</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-green-600" />
                      <span className="font-medium text-green-600">Employee:</span>
                    </div>
                    <span className="text-gray-600">ID: emp001, Password: emp123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <div className="text-center mt-6 text-white text-sm opacity-80">
            <p>Error in Login: Contact admin for help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
