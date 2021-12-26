type Nweet = {
  id: string,
  contents: string,
  createdAt: number,
  creatorId: string,
  attachmentUrl?: string,
}

type User = {
  displayName: string | null,
  uid: string,
};