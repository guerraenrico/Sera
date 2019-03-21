export const commonColors = {
  accentLight: "#31D8C8",
  accent: "#1EBCAD",
  textPrimary: "#fff",
  textSecondary: "#a0acba",
  textThird: "#475b75",
  background: "#25292E",
  backgroundDark: "#1F2226",
  backgroundNight: "#181A1E",
  iconButton: "#2d3b4d",
  iconButtonHover: "#FFF",
  buttonBorder: "1px solid #1e252f",
  buttonBorderHover: "1px solid #1EBCAD",
  textButton: "#35383c",
  textButtonHover: "#475b75",
  inputPlaceholder: "#3C4148"
};

export const buttonColors = {
  default: {
    text: commonColors.textSecondary,
    textHover: commonColors.textPrimary
  },
  accent: {
    text: commonColors.accent,
    textHover: commonColors.accentLight
  }
};

export const buttonIconColors = {
  icon: commonColors.textSecondary,
  iconHover: commonColors.textPrimary
};

export const snackbarColors = {
  errorBackground: "#F44336",
  background: "#2196F3",
  messageText: "#ffffff"
};

export const snackbarActionColors = {
  color: "#ffffff",
  background: "rgba(255, 255, 255, 0)",
  colorHover: "#FFFFFF",
  backgroundHover: " rgba(255, 255, 255, 0.2)"
};

export const drawerColors = {
  background: "#181A1E",
  itemSelectedBackground: "#020810",
  itemIcon: "#97a0ab",
  itemIconSelected: "#1EBCAD",
  itemIconHover: "#1EBCAD"
};

export const loaderLinearColors = {
  background: "#181A1E",
  indicatorBackground: "#1EBCAD"
};

export const buttonDeleteTaskColors = {
  background: commonColors.backgroundDark,
  backgroundHover: "#c74747",
  icon: "#c74747",
  iconHover: "#FFFFFF"
};

export const buttonCompleteTaskColors = {
  background: commonColors.backgroundDark,
  backgroundHover: commonColors.accent,
  icon: commonColors.accent,
  iconHover: "#FFFFFF",
  iconCompleted: "rgba(255, 255, 255, 0.5)",
  backgroundCompleted: "rgba(0, 150, 136, 0.5)"
};

export const buttonAddCategoryTaskColors = {
  background: "rgba(0,0,0,0)",
  icon: commonColors.textThird,
  iconHover: commonColors.textSecondary
};

export const categoryChipColors = {
  text: "#fafafa",
  textHover: "#ffffff",
  background: commonColors.accent,
  backgroundHover: commonColors.accentLight
};

export const buttonDeleteCategoryChipColors = {
  icon: "#0C9487",
  iconHover: "#fafafa"
};
