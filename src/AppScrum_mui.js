import React, { Component } from 'react';
import BoardView from './BoardView_mui';
import data from './Data';
// import {Board} from "./Data";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon  from '@material-ui/icons/MenuIcon';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DlgAbout from './DlgAbout_mui';
import DlgInput from './DlgInput_mui';
import DlgOkCancel from './DlgOkCancel_mui';

const ipcRenderer = window.require('electron').ipcRenderer; //
const styles = {
  root: { flexGrow: 1 },
  grow: { flexGrow: 1 },
  menuButton: { marginLeft: -12, marginRight: 20 },
};
class AppScrum extends Component<Props> {
  constructor(props) {
    super();
    data.getconfig();
    this.state = {
      boards: data.config.boards,
      value: 0,
      class_anim: '',
      show_input: false,
      show_about: false,
      show_delete_sure: false,
    };
    if (ipcRenderer) {
      ipcRenderer.on('request_close', () => {
        data.saveconfig();
        ipcRenderer.send('close');
      });
      ipcRenderer.on('about', () => {
        this.setState({ show_about: true });
      });
      ipcRenderer.on('save', () => {
        data.saveconfig();
        this.anim();
      });
    }
  }
  updateValue = e => {
    //console.log(e.target.value);
    this.setState({
      class_anim: e.target.value + ' animated',
    });
    setTimeout(this.check, 1000);
  };
  componentDidMount = () => {
    this.anim();
  };
  anim = () => {
    //console.log(e.target.value);
    this.setState(
      {
        class_anim: 'bounceOutRight animated',
      },
      () => {
        setTimeout(this.check, 1000);
      }
    );
  };
  animationEnd = el => {
    var animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    };

    for (var t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
    return;
  };

  check = () => {
    if (this.animationEnd(this.refs.div_anim)) {
      // console.log("end");
      this.setState({ class_anim: '' });
    } else {
      setTimeout(this.check, 1000);
    }
  };
  new_board = () => {
    // console.log("new board");
    // boards=this.state.boards;
    console.log(data);
    // data.boards.push(new Board('aaaaa'));
    this.setState({ show_input: true }); // boards:data.boards});
  };
  clearStage = stage => {
    console.log(this);

    data.clearStage(stage);
    this.setState({ boards: data.config.boards });
  };
  clickBoard = id => {
    console.log(id);
    console.log(this.props);
    this.setState({ activeid: id });
    this.props.history.push('/board/' + id);
  };
  deleteBoard = key => {
    this.idx = key;
    this.setState({ show_delete_sure: true });
  };
  delete_board = () => {
    this.deleteBoard(this.state.value);
  };
  close_input = name => {
    if (name) {
      data.new_Board(name);
      this.setState({ boards: data.config.boards });
    }
    this.setState({ show_input: false, value: data.config.boards.length - 1 });
  };
  close_ok = sure => {
    this.setState({ show_delete_sure: false });
    if (sure) {
      const filteredFoods = data.config.boards.filter(
        (item, idx) => this.idx !== idx
      );
      data.config.boards = filteredFoods;
      this.setState({ boards: data.config.boards, value: 0 });
    }
  };
  handleChange = (e, value) => {
    // console.log(e);
    // console.log(value);
    this.setState({ value: value });
  };
  render() {
    const { classes } = this.props;
    // console.log("render");
    // console.log(this.state);
    // let boarditem_views=this.state.boards.map((item,key)=>{
    //     return(<Tab eventKey={key} key={key} title={item.title}>
    //       <BoardView id={key} />
    //     </Tab>);
    // });
    let boarditem_list = this.state.boards.map((item, key) => {
      return <Tab key={key} label={item.title} />;
    });
    let boarditem_panels = this.state.boards.map((item, key) => {
      let stories = item.stories;
      return (
        <BoardView index={key} clearStage={this.clearStage} stories={stories} />
      );
    });
    return (
      <div
        ref="div_anim"
        className={classes.root + ' ' + this.state.class_anim}
      >
        <AppBar position="static">
          <ToolBar>
            <Typography color="inherit" className={classes.grow}>
              note board
            </Typography>
            <Button onClick={this.new_board} color="inherit" variant="outlined">
              新建事项板
            </Button>
            <Button
              onClick={this.delete_board}
              color="inherit"
              variant="outlined"
            >
              删除事项板
            </Button>
          </ToolBar>
        </AppBar>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          {boarditem_list}
        </Tabs>
        {boarditem_panels[this.state.value]}
        <DlgInput
          showModal={this.state.show_input}
          closeModal={this.close_input}
        />
        <DlgOkCancel
          description="删除事项板"
          showModal={this.state.show_delete_sure}
          closeModal={this.close_ok}
        />
        <DlgAbout
          showModal={this.state.show_about}
          closeModal={() => {
            this.setState({ show_about: false });
          }}
        />
      </div>
    );
  }
}
export default withStyles(styles)(AppScrum);
