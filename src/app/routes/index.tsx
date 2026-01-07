import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { HomePage } from '@/pages/Home';
import { ExampleFormPage } from '@/pages/ExampleForm';
import { NotFoundPage } from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<ExampleFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
