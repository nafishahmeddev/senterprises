declare interface MainMenuChildItem {
  label: string;
  route?: string;
  url?: string;
  target?: string;
  onClick?: () => void;
}
declare interface MainMenuItem {
  label: string;
  icon: string;
  route?: string;
  url?: string;
  target?: string;
  onClick?: () => void;
  children?: Array<MainMenuChildItem>;
}


declare interface MainMenuGroup {
  label: string;
  items: Array<MainMenuItem>;
}