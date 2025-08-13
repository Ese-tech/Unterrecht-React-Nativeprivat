import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, Pressable, Text, PressableProps } from 'react-native';

type ExternalLinkProps = PressableProps & {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const handlePress = (e: any) => {
    if (Platform.OS === 'web') {
      // Im Web: Standardverhalten (neuer Tab)
      return;
    }
    e.preventDefault?.();
    WebBrowser.openBrowserAsync(href);
  };

  return (
    <Pressable onPress={handlePress} {...rest}>
      <Text style={{ color: '#1B95E0', textDecorationLine: 'underline' }}>
        {children}
      </Text>
    </Pressable>
  );
}
