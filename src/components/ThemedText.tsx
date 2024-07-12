import { styled } from 'nativewind';
import { Text, type TextProps } from 'react-native';

const StyledText = styled(Text);

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

const getClassNames = (type: ThemedTextProps['type']): string => {
  const classNames = [
    type === 'default' ? 'text-base' : undefined,
    type === 'title' ? 'text-2xl font-bold' : undefined,
    type === 'defaultSemiBold' ? 'text-base font-semibold' : undefined,
    type === 'subtitle' ? 'text-xl font-bold' : undefined,
    type === 'link' ? 'text-base text-sky-600' : undefined,
  ];

  return classNames.filter((e) => e !== undefined).join(' ');
};

export function ThemedText({
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <StyledText className={`${className} ${getClassNames(type)}`} {...rest} />
  );
}
