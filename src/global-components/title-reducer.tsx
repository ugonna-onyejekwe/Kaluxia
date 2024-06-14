export const post_title_reducer = (title: string) => {
  return title.length > 30 ? title.slice(0, 20) + "..." : title;
};
