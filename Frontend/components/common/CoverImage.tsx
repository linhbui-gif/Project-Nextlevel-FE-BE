type TProps = {
  variant?: string;
  url?: string;
  children?: any;
  className?: string;
};

const CoverImage = ({
  variant,
  url,
  children,
  className,
}: TProps): JSX.Element =>
  url ? (
    <div
      className={`bg-${variant} ${className}`}
      style={{
        backgroundImage: `url(${url})`,
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  ) : (
    <div className={`bg-${variant} h-100 ${className}`}>{children}</div>
  );

CoverImage.defaultProps = {
  variant: "light",
  url: false,
};
export default CoverImage;
