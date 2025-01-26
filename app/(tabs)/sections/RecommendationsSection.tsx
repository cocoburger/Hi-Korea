import { ScrollView } from "react-native";
import { Section } from "@/components/common/layout/Section";
import { RecommendationCard } from "@/components/home/RecommendationCard";
import { ResponsiveStyles, Recommendation } from "@/types/home";
import { SectionConfig, VariantType } from "@/types/component";

interface RecommendationsSectionProps {
  styles: ResponsiveStyles;
  data: Recommendation[];
  variant?: VariantType;
  config?: SectionConfig;
}

export function RecommendationsSection({
                                         styles,
                                         data,
                                         variant = 'compact'
                                       }: RecommendationsSectionProps) {
  return (
      <Section
          title='오늘의 추천'
          styles={ styles }
      >
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={ false }
        >
          { data.map((item) => (
              <RecommendationCard
                  key={ item.id }
                  data={ item }
                  styles={ styles }
              />
          )) }
        </ScrollView>
      </Section>
  );
}
