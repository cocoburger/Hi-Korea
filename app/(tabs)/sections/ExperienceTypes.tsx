import { ScrollView } from "react-native";
import { ResponsiveStyles } from "@/types/home";
import { ExperienceTypeCard } from "@/components/home/ExperienceTypeCard";
import { EXPERIENCE_TYPES } from "@/data/constants/experiences";
import { IconName } from "@/types/home";

interface ExperienceTypesProps {
  styles: ResponsiveStyles;
}

export function ExperienceTypes({ styles }: ExperienceTypesProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: styles.spacing.screenPadding,
      }}
    >
      {EXPERIENCE_TYPES.map((experience) => (
        <ExperienceTypeCard
          key={experience.id}
          icon={experience.icon as IconName}
          title={experience.title}
          description={experience.description}
          styles={styles}
        />
      ))}
    </ScrollView>
  );
}
