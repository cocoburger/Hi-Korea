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
        caption: 10,
      },
      spacing: {
        padding: 12,
        gap: 8,
        screenPadding: 8,
        cardGap: 8,
      },
      iconSize: {
        large: 22,
        medium: 18,
        small: 14,
      },
      cardWidth: "45%",
      layout: {
        card: "grid",
        section: "grid",
      },
    };
  }
  // Small: 381-480px
  else if (width < 480) {
    return {
      fontSize: {
        title: 24,
        subtitle: 20,
        body: 16,
        caption: 10,
        small: 14,
      },
      spacing: {
        padding: 16,
        gap: 12,
        screenPadding: 16,
        cardGap: 16,
      },
      iconSize: {
        large: 24,
        medium: 20,
        small: 16,
      },
      cardWidth: "47%",
      layout: {
        card: "grid",
        section: "grid",
      },
    };
  }
  // Medium: 481px 이상
  return {
    fontSize: {
      title: 28,
      subtitle: 24,
      body: 20,
      caption: 10,
      small: 16,
    },
    spacing: {
      padding: 20,
      gap: 16,
      screenPadding: 24,
      cardGap: 24,
    },
    iconSize: {
      large: 26,
      medium: 22,
      small: 18,
    },
    cardWidth: "48%",
    layout: {
      card: "grid",
      section: "grid",
    },
  };
};
