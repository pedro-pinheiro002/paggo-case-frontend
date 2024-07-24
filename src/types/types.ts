export type ExtractedText = {
  table: {
    [key: string]: string[];
  };
};

export type User = {
  id: string;
  email: string;
  name: string;
  familyName: string;
  emailVerified: boolean;
  profilePicture: string;
};
