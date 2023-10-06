import Loading from "@components/Loading"
import socket from "@libs/socket"
import { trpc } from "@libs/trpc"
import React, { useState, useCallback, useEffect, useLayoutEffect } from "react"
import { Text } from "react-native"
import { GiftedChat } from "react-native-gifted-chat"

export function Message({ navigation, route }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.sender.username,
        })
    })
    const [messages, setMessages] = useState([])
    const chatId = route.params.chatId
    const user = route.params.user
    const { isLoading, data } = trpc.allMessage.useQuery(chatId)
    const { mutate: sendMessageMutate } = trpc.sendMessage.useMutation()

    const [typing, setTyping] = useState({
        name: "",
        state: false,
    })
    useEffect(() => {
        socket.emit("join chat", chatId)
    }, [])

    useEffect(() => {
        socket.on("message received", (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        })

        socket.on("typing received", (user: Record<string, any>, typing: boolean) => {
            setTyping({
                name: user.username,
                state: typing,
            })
        })

        return () => {
            socket.off("message received")

            socket.off("typing received")
        }
    }, [])

    useEffect(() => {
        if (!data) {
            return
        }
        setMessages(data)
    }, [data])

    const onSend = useCallback((messages = []) => {
        socket.emit("send message", { messages: messages, chatId })
        sendMessageMutate(
            {
                content: messages[0].text,
                chat_id: chatId,
            },
            {
                onSuccess: () => {
                    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
                },
            },
        )
    }, [])

    const renderFooter = () => {
        if (!typing.state) {
            return null
        }
        return <Text className="p-2 px-4">{typing.name} is typing</Text>
    }

    const handleTyping = (text?: string) => {
        if (!text) {
            socket.emit("typing", { chatId, user: user, typing: false })
            return
        }
        socket.emit("typing", { chatId, user: user, typing: true })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <GiftedChat
            messages={messages}
            onInputTextChanged={handleTyping}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: user._id.toString(),
            }}
            renderFooter={renderFooter}
        />
    )
}

export default Message
