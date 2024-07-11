import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const StyledView = styled(View);

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <StyledView className="dark:bg-slate-800" style={[style]} {...otherProps} />
  );
}
