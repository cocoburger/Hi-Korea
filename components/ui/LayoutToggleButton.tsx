// components/ui/LayoutToggleButton.tsx
import { Button, styled } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { LayoutType } from "@/types/component";

type LayoutToggleButtonProps = {
  type: LayoutType
  isActive: boolean
  onPress: () => void
}

const ToggleButton = styled(Button, {
  padding: 8,
  borderRadius: 8,
  variants: {
    active: {
      true: {
        backgroundColor: '$blue5',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
})

export const LayoutToggleButton = ({ type, isActive, onPress }: LayoutToggleButtonProps) => {
  const iconName = type === 'grid' ? 'grid-outline' : 'list-outline'

  return (
      <ToggleButton
          active={ isActive }
          onPress={ onPress }
          icon={
            <Ionicons
                name={ iconName }
                size={ 20 }
                color={ isActive ? '$blue10' : '$gray10' }
            />
          }
      />
  )
}
