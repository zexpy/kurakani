export const getSender = (logUser: any, users: any) =>
    users[0]?._id === logUser._id ? users[1] : users[0]

export const getReceiver = (users: any, user: any) => users.find((u: any) => u._id !== user._id)
