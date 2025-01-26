import { Stack, styled, Text, YStack } from "tamagui"
import { ResponsiveStyles } from "@/types/home"

interface AuthCardProps {
  title: string
  styles: ResponsiveStyles
  children: React.ReactNode
}

const CardContainer = styled(Stack, {
  name: "AuthCard",
  backgroundColor: "$background",
  borderRadius: "$4",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  variants: {
    responsive: {
      true: {
        padding: "$4",
        width: "90%",
        maxWidth: 500,
      },
    },
  },
})

export const AuthCard = ({ title, styles, children }: AuthCardProps) => {
  return (
      <CardContainer responsive>
        <YStack gap={ styles.spacing.gap * 1.5 }>
          <Text
              // fontSize={ styles.typography.title }
              fontWeight="700"
              textAlign="center"
              color="$gray12"
              marginBottom={ styles.spacing.gap }
          >
            { title }
          </Text>
          { children }
        </YStack>
      </CardContainer>
  )
}
