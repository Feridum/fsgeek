import { GradientText, HeroAvatar, HeroSocial, Section } from '@/ui';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Cześć. Jestem <GradientText>Olek</GradientText> 👋
        </>
      }
      description={
        <>
          Mam 6+ lat doświadczenia zawodowego z JavaScript. Przez ten cały czas
          skupiłem się na efektywnym tworzeniu oprogramowania. Lubię
          wykorzystywać automatyzacje do upraszczania sobie pracy. Na blogu
          pokazuję jak praktycznie korzystać z JS'a i wykorzystać go w pracy.
        </>
      }
      avatar={
        <img
          className="w-64"
          src="/profilowe.png"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://www.instagram.com/fsgeek/">
            <HeroSocial src="/social/instagram-icon.png" alt="Instagram icon" />
          </a>
          <a href="https://www.linkedin.com/in/aleksanderpatschek/">
            <HeroSocial src="/social/linkedin-icon.png" alt="Linkedin icon" />
          </a>
          <a href="https://www.youtube.com/channel/UCooPcxqwzgbQUpnh4FAoZpw">
            <HeroSocial src="/social/youtube-icon.png" alt="Youtube icon" />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
