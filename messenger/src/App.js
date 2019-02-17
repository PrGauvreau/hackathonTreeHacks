import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
// import { FlatList, View, Text } from 'react-native-web';
import Button from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import gql from 'graphql-tag';
import Chatbox from './components/Chatbox';
import './App.css';

class App extends Component {
  state = {
    from: 'codebeast',
    content: '',
    callType: 'messenger',
  };
  componentDidMount() {
    // const from = window.prompt('username');
    // from && this.setState({ from });
    this._subscribeToNewChats();
  }
  _subscribeToNewChats = () => {
    this.props.allChatsQuery.subscribeToMore({
      document: gql`
        subscription {
          Chat(filter: { mutation_in: [CREATED] }) {
            node {
              id
              from
              content
              createdAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newChatLinks = [
          ...previous.allChats,
          subscriptionData.data.Chat.node
        ];
        const result = {
          ...previous,
          allChats: newChatLinks
        };
        console.log(result, previous, subscriptionData);
        return result;
      }
    });
  };
  
  _createChat = async e => {
    if (e.key === 'Enter') {
      this._sendMessage();
    }
  };
  
  _setCallType = (callType) => {
    console.log("current cal type is:", this.state.callType)
    console.log("Nex cal type is:", callType)
    this.setState({ callType: callType });
  } 

  _sendMessage = async => {
    const { content, from } = this.state;
    
    if (this.state.callType != 'messenger') {
      this._sendAjaxReq(content)
    } else {
      const { content, from } = this.state;
      this.props.createChatMutation({
        variables: { content, from }
      });
    }
    this.setState({ content: '' });
  }

  _sendBotMessage = (from, content) => {
    this.props.createChatMutation({
      variables: { content, from }
    });
    this._sendAjaxReq(content)
    this.setState({ content: '' });
  }

  _sendAjaxReq = (context) => {
      // opinion
      // topic
      // sentiment
      // fact
      let callType = this.state.callType;
      context = context.replace(' ', '%20');
      const { content, from } = this.state;
      this.props.createChatMutation({
        variables: { content, from: 'REQUEST TO THE BOT' }
      });
      
      switch (callType) {
        case "topic":
        fetch('http://127.0.0.1:8080/request?category='+callType+'&text='+context)///, {mode: 'CORS', headers: {'Access-Control-Allow-Origin': '*'}})
        //fetch('0.0.0.0:8080', {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {
          let that = this
          const { content, from } = this.state;
            response.text().then(function (text) {
            that.props.createChatMutation({
              variables: { content: text, from: 'BOT' }
            });
          })
          // 
        })
        .catch(error => {
          const { content, from } = this.state;
          this.props.createChatMutation({
            variables: { content: error.toString(), from }
          });
           //this._sendBotMessage(`Bot - ${callType}`, response.json());
        })
        fetch('http://127.0.0.1:8080/request?category='+callType+'&text='+context)///, {mode: 'CORS', headers: {'Access-Control-Allow-Origin': '*'}})
        //fetch('0.0.0.0:8080', {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {
          let that = this
          const { content, from } = this.state;
            response.text().then(function (text) {
            that.props.createChatMutation({
              variables: { content: text, from: 'BOT' }
            });
          })
          // 
        })
        .catch(error => {
          const { content, from } = this.state;
          this.props.createChatMutation({
            variables: { content: error.toString(), from }
          });
           //this._sendBotMessage(`Bot - ${callType}`, response.json());
        })
        fetch('http://127.0.0.1:8080/request?category='+callType+'&text='+context)///, {mode: 'CORS', headers: {'Access-Control-Allow-Origin': '*'}})
        //fetch('0.0.0.0:8080', {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {
          let that = this
          const { content, from } = this.state;
            response.text().then(function (text) {
            that.props.createChatMutation({
              variables: { content: text, from: 'BOT' }
            });
          })
          // 
        })
        .catch(error => {
          const { content, from } = this.state;
          this.props.createChatMutation({
            variables: { content: error.toString(), from }
          });
           //this._sendBotMessage(`Bot - ${callType}`, response.json());
        })
        default:
        fetch('http://127.0.0.1:8080/request?category='+callType+'&text='+context)///, {mode: 'CORS', headers: {'Access-Control-Allow-Origin': '*'}})
        //fetch('0.0.0.0:8080', {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {
          let that = this
          const { content, from } = this.state;
            response.text().then(function (text) {
            that.props.createChatMutation({
              variables: { content: text, from: 'BOT' }
            });
          })
          // 
        })
        .catch(error => {
          const { content, from } = this.state;
          this.props.createChatMutation({
            variables: { content: error.toString(), from }
          });
           //this._sendBotMessage(`Bot - ${callType}`, response.json());
        })
      }
  }

  render() {
    const allChats = this.props.allChatsQuery.allChats || [];
    return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{width: '100%', padding: 50, marginHorizontal: 25, height: '100%'}}
          >
            <Typography variant="h6" style={{padding: 10}} >
              Messenger - Fractal Hive
            </Typography>

            <Grid
            container
            direction="column"
            justify="center"
            style={{height:'95%', maxHeight: 575, width: '100%'}}
            >
            <li style={{overflowY: 'scroll'}}>
            {allChats.map(message => (
                <ui
                  ><Chatbox key={message.id} message={message} />
                </ui>
              ))}
            </li>
            </Grid>

            <Grid
              container
              direction="column"
              justify="center"
              alignContent="center"
            > 
              <div align="center" style={{ width: '100%', height: 50, marginBottom: 0 }}>
                <a href="#" onClick={() => {this._setCallType('messenger')}}>
                  <img src={require("./images/mail.png")} style={{marginLeft: -15, marginRight: 30, padding: 5, width: 40, height: 40, borderStyle: 'solid', borderRadius: 10, borderWidth: 5, borderColor: (this.state.callType == 'messenger' ? '#27ae60': 'white')}}/>
                </a>
                <a href="#" onClick={() => {this._setCallType('opinion')}}>
                  <img src={require("./images/mic.png")} style={{marginLeft: 30, marginRight: 30, padding: 5, width: 40, height: 40, borderStyle: 'solid', borderRadius: 10, borderWidth: 5, borderColor: (this.state.callType == 'opinion' ? '#27ae60': 'white')}}/>
                </a>
                <a href="#" onClick={() => {this._setCallType('fact')}}>
                  <img src={require("./images/check.png")} style={{marginLeft: 30, marginRight: 30, padding: 5, width: 40, height: 40, borderStyle: 'solid', borderRadius: 10, borderWidth: 5, borderColor: (this.state.callType == 'fact' ? '#27ae60': 'white')}}/>
                </a>
                <a href="#" onClick={() => {this._setCallType('topic')}}>
                  <img 
                    src={require("./images/topic.jpg")} 
                    style={{marginLeft: 30, marginRight: 30, padding: 5, width: 40, height: 40, borderStyle: 'solid', borderRadius: 10, borderWidth: 5, borderColor: (this.state.callType == 'topic' ? '#27ae60': 'white')}}
                  />
                </a>
                <a href="#" onClick={() => {this._setCallType('sentiment')}}>
                  <img src={require("./images/sentiment.png")} style={{marginLeft: 30, marginRight: 30, padding: 5, width: 40, height: 40, borderStyle: 'solid', borderRadius: 10, borderWidth: 5, borderColor: (this.state.callType == 'sentiment' ? '#27ae60': 'white')}}/>
                </a>
              </div>

              <div style={{ width: '100%', height: 50, marginBottom: 10, marginTop: 10, }}>  
                <input
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                  type="text"
                  style={{ width: 575, height: 38, marginBottom: 45, marginHorizontal: 25 }}
                  placeholder="Write a message"
                  onKeyPress={this._createChat}
                />
                <a href="#" onClick={this._sendMessage}>
                  <img src={require("./images/download.png")} style={{width: 28, height: 28, paddingLeft: 10, marginLeft: '90%', paddingTop: 11 }}/>
                </a>
              </div>
            </Grid>
              
              {/* <TextField
                id="message"
                label="Write a message"
                style={[styles.textField, {width: 600}]}
                value={this.state.content} 
                onChange={e => this.setState({ content: e.target.value })} 
                margin="normal"
                InputProps={{
                    className: styles.input,
                }}
            /> */}
        </Grid>
    );
  }
}

const styles = theme => ({
  textField: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
  input: {
      color: 'white'
  }
});

const ALL_CHATS_QUERY = gql`
  query AllChatsQuery {
    allChats {
      id
      createdAt
      from
      content
    }
  }
`;

const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($content: String!, $from: String!) {
    createChat(content: $content, from: $from) {
      id
      createdAt
      from
      content
    }
  }
`;


export default compose(
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' })
)(App);
