export type participantDataType = {
  name: string;
  url: string;
  messages: string[];
  redirect: {
    url: string;
    message: string;
  };
};

export type participantsDataType = {
  websites: participantDataType[];
};
