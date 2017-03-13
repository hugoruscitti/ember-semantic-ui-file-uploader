import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onUpload(file) {
      console.log(file);
    }
  }
});
