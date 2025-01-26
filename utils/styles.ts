import { ResponsiveStyles } from "@/types/home";

export const getResponsiveStyles = (width: number): ResponsiveStyles => {
  // Extra Small: 0-380px
  if (width < 380) {
    return {
      fontSize: {
        title: 20,
        subtitle: 16,
        body: 14,
        small: 12,
      },
      spacing: {
        padding: "$3",
        gap: "$2",
      },
      iconSize: {
        large: 22,
        medium: 18,
        small: 14,
      },
      cardWidth: "45%",
    };
  }
  // Small: 381-480px
  else if (width < 480) {
    return {
      fontSize: {
        title: 24,
        subtitle: 20,
        body: 16,
        small: 14,
      },
      spacing: {
        padding: "$4",
        gap: "$3",
      },
      iconSize: {
        large: 24,
        medium: 20,
        small: 16,
      },
      cardWidth: "47%",
    };
  }
  // Medium: 481px 이상
  return {
    fontSize: {
      title: 28,
      subtitle: 24,
      body: 20,
      small: 16,
    },
    spacing: {
      padding: "$5",
      gap: "$4",
    },
    iconSize: {
      large: 26,
      medium: 22,
      small: 18,
    },
    cardWidth: "48%",
  };
};
