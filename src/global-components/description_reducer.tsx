export const post_desc_reducer = (desc: string) => {
  return desc.length > 200 ? desc.slice(0, 200) + "..." : desc;
};
