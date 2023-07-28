export type participantDataType = {
  name: string
  url: string
  messages: string[]
}

export type participantsDataType = {
  websites: participantDataType[]
}