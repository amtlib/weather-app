import { View } from 'react-native';
import { styled } from 'nativewind';
import { ComponentProps } from 'react';

const StyledView = styled(View);
export type ThemedViewProps = ComponentProps<typeof StyledView>;

export function ThemedView(props: ThemedViewProps) {
  return <StyledView {...props} />;
}
