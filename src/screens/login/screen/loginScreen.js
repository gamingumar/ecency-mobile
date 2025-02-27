import React, { PureComponent } from 'react';
import { View, Platform, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { injectIntl } from 'react-intl';
import { debounce } from 'lodash';

// Actions
import HiveSigner from '../../steem-connect/hiveSigner';

// Internal Components
import {
  FormInput,
  InformationArea,
  LoginHeader,
  MainButton,
  Modal,
  TabBar,
  TextButton,
} from '../../../components';

// Constants
import { default as ROUTES } from '../../../constants/routeNames';

// Styles
import styles from './loginStyles';
import globalStyles from '../../../globalStyles';

import STEEM_CONNECT_LOGO from '../../../assets/steem_connect.png';
import { ECENCY_TERMS_URL } from '../../../config/ecencyApi';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: props.initialUsername || '',
      password: '',
      isUsernameValid: true,
      keyboardIsOpen: false,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.initialUsername) {
      this._handleUsernameChange(this.props.initialUsername);
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _handleOnPasswordChange = (value) => {
    this.setState({ password: value });
  };

  _handleUsernameChange = (username) => {
    const { getAccountsWithUsername } = this.props;

    this.setState({ username });

    getAccountsWithUsername(username).then((res) => {
      const isValid = res.includes(username);

      this.setState({ isUsernameValid: isValid });
    });
  };

  _handleOnModalToggle = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({ keyboardIsOpen: true }),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({ keyboardIsOpen: false }),
    );
  }

  render() {
    const { navigation, intl, handleOnPressLogin, handleSignUp, isLoading } = this.props;
    const { username, isUsernameValid, keyboardIsOpen, password, isModalOpen } = this.state;

    console.log('keyboardIsOpen : ', keyboardIsOpen);
    return (
      <View style={styles.container}>
        <LoginHeader
          isKeyboardOpen={keyboardIsOpen}
          title={intl.formatMessage({
            id: 'login.signin',
          })}
          description={intl.formatMessage({
            id: 'login.signin_title',
          })}
          onPress={() => handleSignUp()}
          rightButtonText={intl.formatMessage({
            id: 'login.signup',
          })}
        />
        <ScrollableTabView
          locked={isLoading}
          style={globalStyles.tabView}
          renderTabBar={() => (
            <TabBar
              style={styles.tabbar}
              tabUnderlineDefaultWidth={100}
              tabUnderlineScaleX={2} // default 3
              activeColor="#357ce6"
              inactiveColor="#222"
            />
          )}
        >
          <View
            tabLabel={intl.formatMessage({
              id: 'login.signin',
            })}
            style={styles.tabbarItem}
          >
            <KeyboardAwareScrollView
              enableAutoAutomaticScroll={Platform.OS === 'ios'}
              contentContainerStyle={styles.formWrapper}
              enableOnAndroid={true}
            >
              <FormInput
                rightIconName="at"
                leftIconName="close"
                iconType="MaterialCommunityIcons"
                isValid={isUsernameValid}
                onChange={debounce(this._handleUsernameChange, 1000)}
                placeholder={intl.formatMessage({
                  id: 'login.username',
                })}
                isEditable
                type="username"
                isFirstImage
                value={username}
                inputStyle={styles.input}
              />
              <FormInput
                rightIconName="lock"
                leftIconName="close"
                isValid={isUsernameValid}
                onChange={(value) => this._handleOnPasswordChange(value)}
                placeholder={intl.formatMessage({
                  id: 'login.password',
                })}
                isEditable
                secureTextEntry
                type="password"
                numberOfLines={1}
                value={password}
                inputStyle={styles.input}
              />
              <InformationArea
                description={intl.formatMessage({
                  id: 'login.description',
                })}
                link={ECENCY_TERMS_URL}
                iconName="ios-information-circle-outline"
              />
            </KeyboardAwareScrollView>

            <View style={styles.footerButtons}>
              <TextButton
                style={styles.cancelButton}
                onPress={() =>
                  navigation.navigate({
                    name: ROUTES.DRAWER.MAIN,
                  })
                }
                text={intl.formatMessage({
                  id: 'login.cancel',
                })}
              />
              <MainButton
                onPress={() => handleOnPressLogin(username, password)}
                iconName="person"
                iconColor="white"
                text={intl.formatMessage({
                  id: 'login.login',
                })}
                textStyle={styles.mainBtnText}
                isDisable={!isUsernameValid || password.length < 2 || username.length < 2}
                isLoading={isLoading}
              />
            </View>
          </View>
          <View tabLabel="Hivesigner" style={styles.tabbarItem}>
            <InformationArea
              description={intl.formatMessage({
                id: 'login.steemconnect_description',
              })}
              iconName="ios-information-circle-outline"
              link="https://hivesigner.com"
            />
            <MainButton
              wrapperStyle={styles.mainButtonWrapper}
              onPress={() => this._handleOnModalToggle()}
              source={STEEM_CONNECT_LOGO}
              text="hive"
              secondText="signer"
            />
          </View>
        </ScrollableTabView>
        <Modal
          isOpen={isModalOpen}
          isFullScreen
          isCloseButton
          handleOnModalClose={this._handleOnModalToggle}
          title={intl.formatMessage({
            id: 'login.signin',
          })}
        >
          <HiveSigner handleOnModalClose={this._handleOnModalToggle} />
        </Modal>
      </View>
    );
  }
}

export default injectIntl(LoginScreen);
