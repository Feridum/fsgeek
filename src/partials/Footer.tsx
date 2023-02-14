import { FooterCopyright, Section } from '@/ui';
import { AppConfig } from '@/utils/AppConfig';

const Footer = () => (
  <Section>
    <FooterCopyright site_name={AppConfig.site_name} />
  </Section>
);

export { Footer };
