
import firebase from '../firebase';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

export const sendMessage = (text, user) => {
    return function (dispatch) {
        let msg = {
                text: text,
                time: Date.now(),
                author: {
                    name: user.name,
                }
            };

        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(30)
                .on('value', (snapshot) => {

                    setTimeout(() => {
                        const messages = snapshot.val() || [];

                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}

export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
}

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
}

//
// User actions
//

export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => {
                    const { name, avatar } = getState().user;

                    firebase.database()
                            .ref(`users/${DeviceInfo.getUniqueID()}`)
                            .set({
                                name,
                                avatar
                            });

                    startChatting(dispatch);
                });
    }
}

export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => firebase.database()
                                    .ref(`users/${DeviceInfo.getUniqueID()}`)
                                    .once('value', (snapshot) => {
                                        const val = snapshot.val();

                                        if (val === null) {
                                            dispatch(userNoExist());
                                        }else{
                                            dispatch(setUserName(val.name));
                                            startChatting(dispatch);
                                        }
                                    }))
                .catch(err => console.log(err))
    }
}

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchMessages());
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
