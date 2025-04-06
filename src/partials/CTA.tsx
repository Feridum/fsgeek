import { ArrowRight, Bell } from 'lucide-react';

import { Section } from '@/ui';

const CTA = () => (
  <Section>
    <div className="overflow-hidden rounded-lg border border-[#004b4d] bg-gradient-to-r from-[#003739] to-[#002729] shadow-lg">
      <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400">
            <Bell className="h-6 w-6" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white">
              Dołącz do newsletter'a na Substack
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Cotygodniowa dawka najlepszych artykułów dotyczących AI,
              architektury, ekosystemu JS i szerokopojętego developementu
            </p>
          </div>
        </div>
        <a href="https://fspulse.substack.com/">
          <button className="group flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-auto">
            Dołącz
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </a>
      </div>
    </div>
  </Section>
);

export { CTA };
