import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, FileText, Loader2 } from 'lucide-react';
import { useRegister } from '@/hooks/auth/useRegister';
import {
  registerSchema,
  type RegisterFormData,
} from '@/schemas/register.schema';
import { Button } from '@/components/ui/button';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    ownerName: '',
    ownerEmail: '',
    companyName: '',
    password: '',
    planSectionId: 0,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, error } = useRegister();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'planSectionId' ? Number(value) : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      setErrors(fieldErrors);
      return;
    }

    mutate(result.data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Create your account</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* API error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">
                  {(error as any)?.response?.data?.message ||
                    'Registration failed'}
                </p>
              </div>
            )}

            {/* Full name */}
            <Input
              label="Full name"
              icon={<User />}
              name="ownerName"
              value={formData.ownerName}
              error={errors.ownerName}
              onChange={handleChange}
            />

            {/* Email */}
            <Input
              label="Email"
              icon={<Mail />}
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              error={errors.ownerEmail}
              onChange={handleChange}
            />

            {/* Company name */}
            <Input
              label="Company name"
              icon={<FileText />}
              name="companyName"
              value={formData.companyName}
              error={errors.companyName}
              onChange={handleChange}
            />

            {/* Plan section */}
            <div>
              <label className="block text-sm font-medium mb-2">Plan</label>
              <select
                name="planSectionId"
                value={formData.planSectionId}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-3"
              >
                <option value={0}>Select a plan</option>
                <option value={1}>Starter</option>
                <option value={2}>Grow</option>
                <option value={3}>Team</option>
                <option value={4}>Enterprise</option>
              </select>
              {errors.planSectionId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.planSectionId}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-3 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-purple-600 text-white py-3 rounded-lg flex justify-center gap-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600">
            Sign in
          </Link>
        </p>
        <Button
          variant="outline"
          className="w-110 m-5"
          onClick={() => navigate('/plans')}
        >
          Show Plans
        </Button>
      </div>
    </div>
  );
}

/**
 * Small reusable input component
 */
function Input({ label, icon, error, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        <input
          {...props}
          className="w-full border rounded-lg pl-10 pr-3 py-3"
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
