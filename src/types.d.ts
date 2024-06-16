interface blog_card1_types {
  thumbnail: {
    url: string | any;
  };
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
  thumbnail: {
    url: string;
  };
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
  avatar: {
    url: string | any;
  };
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
