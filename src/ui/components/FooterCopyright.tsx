type IFooterCopyrightProps = {
  site_name: string;
};

const FooterCopyright = (props: IFooterCopyrightProps) => (
  <div className="flex justify-between border-t border-gray-600 pt-5">
    <a href="/polityka-prywatnosci/" className="text-sm text-gray-200">
      {' '}
      Polityka prywatności
    </a>
    <div className="text-sm text-gray-200">
      © Copyright {new Date().getFullYear()} by {props.site_name}
    </div>
    <div>
      Ikony pochodzą z{' '}
      <a target="_blank" href="https://icons8.com">
        Icons8
      </a>
    </div>
  </div>
);

export { FooterCopyright };
