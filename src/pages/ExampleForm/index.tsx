import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/shared/ui';
import { useState, useMemo } from 'react';

type FormData = {
  name: string;
  email: string;
  age?: number;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export function ExampleFormPage() {
  const { t } = useTranslation();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Create schema with translated messages
  const formSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, t('validation.nameMin')).max(50, t('validation.nameMax')),
          email: z.string().email(t('validation.emailInvalid')),
          age: z
            .string()
            .transform((val) => (val ? parseInt(val, 10) : undefined))
            .pipe(
              z
                .number({ invalid_type_error: t('validation.ageNumber') })
                .min(18, t('validation.ageMin'))
                .max(120, t('validation.ageMax'))
                .optional()
            ),
          password: z
            .string()
            .min(8, t('validation.passwordMin'))
            .regex(/[A-Z]/, t('validation.passwordUppercase'))
            .regex(/[a-z]/, t('validation.passwordLowercase'))
            .regex(/[0-9]/, t('validation.passwordNumber')),
          confirmPassword: z.string(),
          terms: z.boolean().refine((val) => val === true, {
            message: t('validation.termsRequired'),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('validation.passwordMismatch'),
          path: ['confirmPassword'],
        }),
    [t]
  );

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
        <h1 className="text-3xl font-bold text-gray-900">{t('form.title')}</h1>
        <p className="mt-2 text-gray-600">{t('form.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
        <Input
          label={t('form.fullName')}
          placeholder={t('form.fullNamePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label={t('form.email')}
          type="email"
          placeholder={t('form.emailPlaceholder')}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label={t('form.age')}
          type="number"
          placeholder={t('form.agePlaceholder')}
          error={errors.age?.message}
          {...register('age')}
        />

        <Input
          label={t('form.password')}
          type="password"
          placeholder={t('form.passwordPlaceholder')}
          error={errors.password?.message}
          helperText={t('form.passwordHint')}
          {...register('password')}
        />

        <Input
          label={t('form.confirmPassword')}
          type="password"
          placeholder={t('form.passwordPlaceholder')}
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
            <span className="text-sm text-gray-700">{t('form.terms')}</span>
          </label>
          {errors.terms && <p className="error-message">{errors.terms.message}</p>}
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={isSubmitting}>
            {t('common.submit')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              setSubmittedData(null);
            }}
          >
            {t('common.reset')}
          </Button>
        </div>
      </form>

      {submittedData && (
        <div className="card mt-6 bg-green-50">
          <h2 className="mb-2 font-semibold text-green-800">{t('form.success')}</h2>
          <pre className="overflow-auto rounded bg-white p-4 text-sm">
            {JSON.stringify({ ...submittedData, password: '***', confirmPassword: '***' }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
