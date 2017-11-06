
import React, { Component } from 'react';
import {View} from 'react-native';
import {
    ListView, Text, Row,
     Subtitle, Caption, Heading
} from '@shoutem/ui';
import moment from 'moment';

const Message = ({ msg }) => (
    <Row>
        <View styleName="vertical">
            <View styleName="horizontal space-between">
                <Subtitle>{msg.author.name}</Subtitle>
                <Caption>{moment(msg.time).from(Date.now())}</Caption>
            </View>
            <Text styleName="multiline">{msg.text}</Text>
        </View>
    </Row>
);

const MessageList = ({ messages, onLayout }) => (
    <ListView data={messages}
              autoHideHeader={true}
              renderRow={msg => <Message msg={msg} />}
              onLayout={onLayout}
              />
);

export default MessageList;
