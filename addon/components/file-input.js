import Ember from 'ember';
import layout from '../templates/components/file-input';

export default Ember.Component.extend({
  layout,
  placeholder: 'Subir archivo',
  uploadingText: 'Subiendo',
  progress: 0,
  loading: false,
  done: false,
  filename: null,
  error: null,
  fakeDelay: 500,
  allowedFileType: 'image/*',

  progressText: Ember.computed('progress', function() {
    return `${this.get('uploadingText')} ${this.get('progress')} %`;
  }),

  actions: {
    onClick() {
      this.$(".x-file-input label").click();
    },

    whenSelectFile(fileList) {

      if (fileList.length === 0) {
        return;
      }

      this.set('loading', true);
      this.set('done', false);
      this.set('error', null);


      let re = new RegExp(this.get('allowedFileType'));

      if (re.test(fileList[0].type)) {
        let reader = new FileReader();

        reader.onprogress = (data) => {
          if (data.lengthComputable) {
            var progress = parseInt(((data.loaded / data.total) * 100), 10);
            this.set('progress', progress);
          }
        };

        reader.onloadend = () => {

          Ember.run.later(() => {
            this.set('loading', false);
            this.set('done', true);

            this.attrs['onUpload']({
              name: fileList[0].name,
              size: fileList[0].size,
              type: fileList[0].type,
              result: reader.result
            });

            this.set('filename', fileList[0].name);
          }, this.get('fakeDelay'));

        };

        reader.readAsDataURL(fileList[0]);
      } else {
        let type = fileList[0].type;
        this.set('loading', false);
        this.set('done', false);
        this.set('error', `El tipo de archivo que se quiere subir no está permitido. Intentó subir ${type}.`);
      }

    }
  }
});
