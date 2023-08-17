export const matchTagAndColor = (tag: string) => {
  switch (tag) {
    case '일반':
      return 'badge-primary';
    case '엔지니어':
      return 'badge-secondary';
    case '개인사용자':
      return 'badge-accent';
  }
};
