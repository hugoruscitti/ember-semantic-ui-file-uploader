import Ember from 'ember';

export default Ember.Controller.extend({
  base64Content: Ember.computed('fileData.result', function() {
    return this.get('fileData.result').slice(0, 50) + "...";
  }),

  actions: {
    onUpload(fileData, extraArgumentForUpload) {
      console.log("called onUpload, filedata is", fileData);
      console.log("ExtraArg", extraArgumentForUpload);
      this.set('fileData', fileData);
    }
  }
});
