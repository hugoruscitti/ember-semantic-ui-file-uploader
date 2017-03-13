import Ember from 'ember';
import layout from '../templates/components/file-input';

export default Ember.Component.extend({
  layout,
  placeholder: 'Subir archivo',
  progress: 0,

  actions: {
    onClick() {
      this.$(".x-file-input label").click();
    },

    whenSelectFile(fileList) {
      //let re = new RegExp('image/*');

      console.log(fileList);

      //if (re.test(fileList[0].type)) {
        let reader = new FileReader();

        reader.onprogress = (data) => {
          if (data.lengthComputable) {
            var progress = parseInt(((data.loaded / data.total) * 100), 10);
            console.log(progress);
          }
        };

        reader.onloadend = () => {
          this.attrs['onUpload']({
            name: fileList[0].name,
            size: fileList[0].size,
            type: fileList[0].type,
            result: reader.result
          });
          console.log("done!");
          //model.set(property, reader.result);
        };

        reader.readAsDataURL(fileList[0]);
      //} else {
      //  alert(`File must be an image. You tried to upload: ${fileList[0].type}`);
      //}

    }
  }
});
