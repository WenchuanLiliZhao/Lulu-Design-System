import UserAvatar from "./PlaceHolder/UserAvatar.svg";

const PlaceholerMap = {
  UserAvatar,
}

type PlaceholderProps = {
  element: keyof typeof PlaceholerMap;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ element, className }) => {
  const PlaceholderComponent = PlaceholerMap[element];
  return PlaceholderComponent ? (
    <img className={className} src={PlaceholderComponent} alt="logo" />
  ) : null;
};