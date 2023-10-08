import socket from "@libs/socket"
import { trpc } from "@libs/trpc"
import React, { useState, useCallback, useEffect, useLayoutEffect } from "react"
import { Text } from "react-native"
import { Avatar, Bubble, GiftedChat } from "react-native-gifted-chat"

export function Message({ navigation, route }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.receiver?.username,
        })
    })

    const [messages, setMessages] = useState([])
    const { chat, receiver, user } = route.params
    const { isLoading, data } = trpc.allMessage.useQuery(chat._id.toString())
    const { mutate: sendMessageMutate } = trpc.sendMessage.useMutation()

    const [typing, setTyping] = useState({
        name: "",
        state: false,
    })

    useEffect(() => {
        socket.on("getMessage", (data) => {
            setMessages((previous) => GiftedChat.append(previous, data.messages))
        })

        socket.on("getTyping", (data) => {
            setTyping({
                name: data?.sender?.username,
                state: data?.typing,
            })
        })

        return () => {
            socket.off("getMessage")

            socket.off("getTyping")
        }
    }, [])

    useEffect(() => {
        socket.emit("addUser", user?._id)
    }, [user])

    useEffect(() => {
        if (!data) {
            return
        }
        setMessages(data)
    }, [data])

    const onSend = useCallback((messages = []) => {
        socket.emit("sendMessage", {
            sender: user,
            receiverId: receiver?._id,
            messages,
        })

        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        sendMessageMutate({
            content: messages[0].text,
            chat_id: chat._id,
        })
    }, [])

    const renderFooter = () => {
        if (!typing.state) {
            return null
        }
        return <Text className="p-2 px-4">{typing.name} is typing</Text>
    }

    const handleTyping = (text: string) => {
        if (!text) {
            socket.emit("typing", { sender: user, receiverId: receiver?._id, typing: false })
            return
        }
        socket.emit("typing", { sender: user, receiverId: receiver?._id, typing: true })
    }

    return (
        <GiftedChat
            messages={messages}
            onInputTextChanged={handleTyping}
            onSend={(messages) => onSend(messages)}
            renderAvatar={(props) => <Avatar {...props} showAvatarForEveryMessage />}
            user={{
                _id: user?._id.toString(),
                avatar: user.profile_pic,
            }}
            scrollToBottom
            renderFooter={renderFooter}
            isLoadingEarlier={isLoading}
            alwaysShowSend
            renderBubble={(props) => (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        left: {
                            backgroundColor: "#C5C6D0",
                        },
                    }}
                />
            )}
        />
    )
}

export default Message
