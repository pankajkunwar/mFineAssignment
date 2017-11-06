
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { Screen, Title, Text, Divider, Button, Spinner } from '@shoutem/ui';

import Input from '../containers/Input';
import LoginButton from '../containers/LoginButton';
import { setUserName } from '../actions';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing
});

class LoginUI extends Component {
    render() {
        return (
            <Screen style={{alignItems: 'center', justifyContent: 'center'}}>
                <Title>Please enter your Name:</Title>
                <Divider />

                <Input placeholder="Name"
                       submitAction={setUserName}
                       submitOnBlur
                       noclear
                       ref="username"/>
                <Divider />

                {this.props.authorizing ? <Spinner /> : <LoginButton />}
            </Screen>
        );
    }
}

export default connect(mapStateToProps)(LoginUI);
