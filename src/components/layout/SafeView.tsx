import { PropsWithChildren } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../ThemedView';

export const SafeView = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </ThemedView>
  );
};
