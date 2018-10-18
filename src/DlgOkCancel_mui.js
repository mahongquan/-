import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
export default class DlgOkCancel extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = nextProps => {};
  onHide = () => {};
  ok = () => {
    this.props.closeModal(true);
  };
  cancel = () => {
    this.props.closeModal();
  };
  render = () => {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.closeModal}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>{this.props.description}</DialogContent>
        <DialogActions>
          <Button onClick={this.ok} variant="outlined">
            Ok
          </Button>
          <Button onClick={this.cancel} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}
