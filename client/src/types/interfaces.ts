export interface MarkerObjectTypes {
  _nmarker_id?: string;
  setIcon: (
    icon:
      | string
      | naver.maps.ImageIcon
      | naver.maps.SymbolIcon
      | naver.maps.HtmlIcon
  ) => void;
}
