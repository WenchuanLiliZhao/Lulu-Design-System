import BlackNoText from "./Logo/BlackNoText.svg";
import BlackWithBlackText from "./Logo/BlackWithBlackText.svg";
import FullColorNoText from "./Logo/FullColorNoText.svg";
import FullColorWithBlackText from "./Logo/FullColorWithBlackText.svg";
import FullColorWithWhiteText from "./Logo/FullColorWithWhiteText.svg";
import WhiteNoText from "./Logo/WhiteNoText.svg";
import WhiteWithWhiteText from "./Logo/WhiteWithWhiteText.svg";

export const LogoMap = {
  BlackNoText,
  BlackWithBlackText,
  FullColorNoText,
  FullColorWithBlackText,
  FullColorWithWhiteText,
  WhiteNoText,
  WhiteWithWhiteText,
};

type LogoProps = {
  mode: keyof typeof LogoMap;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const Logo: React.FC<LogoProps> = ({ mode, className }) => {
  const LogoComponent = LogoMap[mode];
  return LogoComponent ? (
    <img className={className} src={LogoComponent} alt="logo" />
  ) : null;
};
