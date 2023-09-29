import { faker } from "@faker-js/faker"

import React, { useState, useCallback, useEffect, useLayoutEffect } from "react"
import { GiftedChat } from "react-native-gifted-chat"

export function Message({ navigation, route }) {
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.user.username,
        })
    })

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: faker.lorem.words(),
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: faker.person.fullName(),
                    avatar: faker.image.avatar(),
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Message
