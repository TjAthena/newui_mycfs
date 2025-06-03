
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface ForgotPasswordDialogProps {
  onClose: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ onClose }) => {
  const [step, setStep] = useState(1); // 1: Enter details, 2: Enter OTP, 3: Reset password
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sentOtp, setSentOtp] = useState(''); // Store the generated OTP

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.employeeId || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate sending OTP
    setTimeout(() => {
      const otp = generateOTP();
      setSentOtp(otp);
      console.log('Generated OTP:', otp); // For demo purposes
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your email. Demo OTP: ${otp}`,
      });
      setStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.otp) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.otp !== sentOtp) {
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Code Verified",
        description: "Verification successful. Please enter your new password.",
      });
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now login with your new password.",
      });
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const handleResendOTP = () => {
    const newOtp = generateOTP();
    setSentOtp(newOtp);
    console.log('Resent OTP:', newOtp); // For demo purposes
    toast({
      title: "OTP Resent",
      description: `New verification code sent to your email. Demo OTP: ${newOtp}`,
    });
  };

  if (step === 1) {
    return (
      <form onSubmit={handleStep1Submit} className="space-y-4">
        <div>
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input
            id="employeeId"
            value={formData.employeeId}
            onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
            placeholder="Enter your Employee ID"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
          </Button>
        </div>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form onSubmit={handleStep2Submit} className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Enter the 6-digit verification code sent to your email address.
          </p>
        </div>
        
        <div>
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            value={formData.otp}
            onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
          />
        </div>

        <div className="text-center">
          <Button type="button" variant="link" onClick={handleResendOTP} className="text-sm">
            Didn't receive code? Resend OTP
          </Button>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      </form>
    );
  }

  if (step === 3) {
    return (
      <form onSubmit={handleStep3Submit} className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
            required
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    );
  }

  return null;
};

export default ForgotPasswordDialog;
