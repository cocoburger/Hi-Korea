// sections/ExperienceTypes.tsx
import { YStack } from "tamagui";
import { ScrollView } from "react-native";
import { ResponsiveStyles } from "@/types/home";
import { ExperienceTypeCard } from "@/components/home/ExperienceTypeCard";
import { EXPERIENCE_TYPES } from "@/data/constants/experiences";

interface ExperienceTypesProps {
  styles: ResponsiveStyles;
}

export function ExperienceTypes({ styles }: ExperienceTypesProps) {
  return (
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ { gap: 16, paddingHorizontal: styles.spacing.screenPadding } }
      >
        { EXPERIENCE_TYPES.map((experience) => (
            <ExperienceTypeCard
                key={ experience.id }
                icon={ experience.icon }
                title={ experience.title }
                styles={ styles }
            />
        )) }
      </ScrollView>
  );
}
