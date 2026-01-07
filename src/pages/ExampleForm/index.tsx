import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/shared/ui';
import { useState } from 'react';

// Form schema with Zod validation
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Please enter a valid email address'),
    age: z
      .string()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(
        z
          .number({ invalid_type_error: 'Age must be a number' })
          .min(18, 'You must be at least 18 years old')
          .max(120, 'Please enter a valid age')
          .optional()
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export function ExampleFormPage() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    console.log('Form submitted:', data);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Form Example</h1>
        <p className="mt-2 text-gray-600">
          This form demonstrates React Hook Form with Zod validation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Age (optional)"
          type="number"
          placeholder="25"
          error={errors.age?.message}
          {...register('age')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          helperText="Must contain uppercase, lowercase, and number"
          {...register('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register('terms')}
            />
            <span className="text-sm text-gray-700">I accept the terms and conditions</span>
          </label>
          {errors.terms && <p className="error-message">{errors.terms.message}</p>}
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              setSubmittedData(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      {submittedData && (
        <div className="card mt-6 bg-green-50">
          <h2 className="mb-2 font-semibold text-green-800">Form Submitted Successfully!</h2>
          <pre className="overflow-auto rounded bg-white p-4 text-sm">
            {JSON.stringify({ ...submittedData, password: '***', confirmPassword: '***' }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
