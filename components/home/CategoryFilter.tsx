// components/home/CategoryFilter.tsx
import { ScrollView } from 'react-native'
import { Chip, ChipVariant } from '@/components/ui/Chip'
import { FilterType } from '@/types/component'
import { ResponsiveStyles } from "@/types/home";

type CategoryFilterProps = {
  categories: FilterType[]
  selected: number
  onSelect: (id: number) => void
  styles: ResponsiveStyles
}

export const CategoryFilter = ({ categories, selected, onSelect, styles }: CategoryFilterProps) => {
  return (
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ {
            gap: 8,
            paddingHorizontal: styles.spacing.screenPadding
          } }
      >
        { categories.map((category) => (
            <Chip
                key={ category.id }
                label={ category.label }
                variant={ category.variant as ChipVariant }
                isSelected={ selected === category.id }
                size="medium"
                onPress={ () => onSelect(category.id) }
            />
        )) }
      </ScrollView>
  )
}
