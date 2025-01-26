import { forwardRef } from "react"
import { Input, Label, Stack, Text, XStack, styled } from "tamagui"
import { Ionicons } from "@expo/vector-icons"
import { ResponsiveStyles } from "@/types/home"
import { KeyboardTypeOptions } from "react-native/Libraries/Components/TextInput/TextInput";

interface AuthInputProps {
  label: string,
  placeholder: string,
  styles: ResponsiveStyles
  icon?: keyof typeof Ionicons.glyphMap,
  error?: string,
  secureTextEntry?: boolean,
  keyboardType?:
      KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const StyledInput = styled(Input, {
  name: "AuthInput",
  borderWidth: 1,
  borderColor: "$gray5",
  backgroundColor: "$background",
  borderRadius: "$3",
  paddingVertical: "$3",
  paddingHorizontal: "$4",
  fontSize: "$4",
  variants: {
    error: {
      true: {
        borderColor: "$red8",
      },
    },
    focus: {
      true: {
        borderColor: "$blue8",
      },
    },
  },
})

export const AuthInput = ({
                            label,
                            placeholder,
                            icon,
                            error,
                            secureTextEntry,
                            styles,
                            keyboardType,
                            autoCapitalize
                          }: AuthInputProps) => {
  return (
      <Stack gap={ styles.spacing.gap / 2 }>
        <Label
            fontSize={ 16 }
            fontWeight="500"
            color={ error ? "$red10" : "$gray10" }
        >
          { label }
        </Label>

        <XStack
            alignItems="center"
            gap="$2"
        >
          { icon && (
              <Ionicons
                  name={ icon }
                  size={ 20 }
                  color={ error ? "#ef4444" : "#6b7280" }
              />
          ) }
          <StyledInput
              placeholder={ placeholder }
              keyboardType={ keyboardType }
              autoCapitalize={ autoCapitalize }
              secureTextEntry={ secureTextEntry }
              placeholderTextColor="$gray9"
              color="$gray12"
              borderColor={ error ? "$red8" : "$gray5" }
              focusStyle={ {
                borderColor: "$blue8",
                shadowColor: "$blue5",
                shadowRadius: 4,
              } }
          />
        </XStack>

        { error && (
            <Text
                color="$red10"
                // fontSize={ styles.typography.caption }
            >
              { error }
            </Text>
        ) }
      </Stack>
  )
}
