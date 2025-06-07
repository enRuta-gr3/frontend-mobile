import { StyleProp, TextStyle, ViewStyle } from "react-native";


export default class StyleRuta {
  static primary = '#FF6900';        // naranja
    static card: StyleProp<ViewStyle>;
    static title: StyleProp<TextStyle>;
    static row: StyleProp<ViewStyle>;
    static label: StyleProp<TextStyle>;
    static separator: StyleProp<ViewStyle>;
    static totalRow: StyleProp<ViewStyle>;
    static totalLabel: StyleProp<TextStyle>;
    static totalPrice: StyleProp<TextStyle>;
    static buyButton: StyleProp<ViewStyle>;
    static buyText: StyleProp<TextStyle>;
    static cancelButton: StyleProp<ViewStyle>;
    static cancelText: StyleProp<TextStyle>;
  static background: string | undefined;



  
static loadingOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};
static loadingBox: {
  padding: 20,
  backgroundColor: '#333',
  borderRadius: 10,
  alignItems: 'center',
};
static loadingText: {
  marginTop: 10,
  color: '#fff',
  fontSize: 16,
};
  

}

