import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default class DlgInput extends Component {
  state = { description: '' };
  onChange = e => {
    this.setState({ description: e.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = nextProps => {
    this.setState({ description: '' });
  };
  onHide = () => {};
  ok = () => {
    this.props.closeModal(this.state.description);
  };
  cancel = () => {
    this.props.closeModal();
  };
  render = () => {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.closeModal}>
        <DialogTitle>Input name</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={this.state.description}
            margin="dense"
            onChange={this.onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={this.ok}>
            Ok
          </Button>
          <Button variant="outlined" onClick={this.cancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}
