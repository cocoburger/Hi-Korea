// types/component.ts
import { ChipVariant } from "@/components/ui/Chip";

export type VariantType =
    | 'full'
    | 'compact'
    | 'list'
    | 'timeline'
    | 'grid'
    | 'carousel';

export type LayoutType = 'grid' | 'carousel' | 'list' | 'map';

export type FilterType = {
  id: number;
  label: string;
  value: string;
  variant: ChipVariant
};

export type SectionConfig = {
  showHeader?: boolean;
  showMoreButton?: boolean;
  maxItems?: number;
};

export interface CarouselItemLayout {
  length: number
  offset: number
  index: number
}
