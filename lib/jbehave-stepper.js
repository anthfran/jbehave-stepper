'use babel';

import JbehaveStepperView from './jbehave-stepper-view';
import { CompositeDisposable } from 'atom';
import jbehaveSearch from './jbehave-search';

export default {

  jbehaveStepperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jbehaveStepperView = new JbehaveStepperView(state.jbehaveStepperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jbehaveStepperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jbehave-stepper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jbehaveStepperView.destroy();
  },

  serialize() {
    return {
      jbehaveStepperViewState: this.jbehaveStepperView.serialize()
    };
  },

  toggle() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getLastCursor().getCurrentBufferLine()
      console.log(jbehaveSearch());
    }
  }

};
