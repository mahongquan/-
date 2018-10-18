import React, { Component } from 'react';
import data from './Data';
import StoryForm from './StoryForm_mui';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
var moment = require('moment');
var locale = require('moment/locale/zh-cn');
// var DateTime=require('react-datetime');
class BoardView extends Component {
  state = { showModal: false, stage: null, story: null, stories: [] };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  newStroy = stage => {
    // console.log(stage)
    this.setState({ showModal: true, stage: stage, story: null });
  };
  clear = stage => {
    console.log(this.props);
    this.props.clearStage(stage);
    // this.setState({showModal:true,stage:stage,story:null});
  };
  editStory = story => {
    this.setState({ showModal: true, story: story, stage: null });
  };
  render = () => {
    // let index=this.props.index;
    // let item=data.config.boards[index];//index
    let stories = this.props.stories; //data.config.boards[index].stories;
    let stages = [
      {
        duan: 0,
        board_index: this.props.index,
        stories: [],
        title: data.duan_name[0],
      },
      {
        duan: 1,
        board_index: this.props.index,
        stories: [],
        title: data.duan_name[1],
      },
      {
        duan: 2,
        board_index: this.props.index,
        stories: [],
        title: data.duan_name[2],
      },
    ];
    for (var i = 0; i < stories.length; i++) {
      let item = stories[i];
      item.time = moment(item.time);
      window.t = item.time;
      stages[item.duan].stories.push(item);
    }
    let div_stages = stages.map((item, key) => {
      let div_stories = item.stories.map((item, key) => {
        if (item.duan == 2) {
          return (
            <ListItem
              key={key}
              onClick={() => {
                this.editStory(item);
              }}
              style={{ backgroundColor: item.color }}
            >
              <ListItemText>
                {item.time.month() +
                  1 +
                  '-' +
                  item.time.date() +
                  ':' +
                  item.description}
              </ListItemText>
            </ListItem>
          );
        } else {
          return (
            <ListItem
              key={key}
              onClick={() => {
                this.editStory(item);
              }}
              style={{ backgroundColor: item.color }}
            >
              <ListItemText>
                {item.time.month() +
                  1 +
                  '-' +
                  item.time.date() +
                  ':' +
                  item.description}
              </ListItemText>
            </ListItem>
          );
        }
      });
      div_stories.reverse();
      if (item.duan === 2) {
        return (
          <ExpansionPanel key={key} className="stage">
            <ExpansionPanelSummary>{item.title}</ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>{div_stories}</List>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button
                variant="outlined"
                className="btn btn-warning"
                onClick={() => {
                  this.clear(item);
                }}
              >
                清除
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      } else {
        return (
          <ExpansionPanel
            key={key}
            className="stage"
            defaultExpanded={item.duan === 1}
          >
            <ExpansionPanelSummary>{item.title}</ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>{div_stories}</List>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button
                variant="outlined"
                onClick={() => {
                  this.newStroy(item);
                }}
              >
                增加
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      }
    });
    return (
      <div style={{ width: '100%' }}>
        {div_stages}
        <StoryForm
          story={this.state.story}
          stage={this.state.stage}
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  };
}
export default BoardView;
