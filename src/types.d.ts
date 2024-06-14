interface blog_card1_types {
  thumbnail: string;
  title: string;
  desc: string;
  reduceTxt?: boolean;
  _id: string;
}

type PostType = {
  _id: string;
  title: string;
  tag: string;
  desc: string;
  views: number;
  likes: number;
  date: string;
  thumbnail: string;
  createdAt: string;

  authur: {
    name: string;
    id: string;
  };
};

type UsersType = {
  _id: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  about: string | null;
  posts: number;
};

type CurrentUserType = {
  token: string;
  name: string;
  id: string;
};

type PosterType = {
  createdAt: string;
  authur: { id: string; name: string };
};
