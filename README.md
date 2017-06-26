# ember-semantic-ui-file-uploader

A file uploader for emberjs

Install it with:

```
ember install ember-semantic-ui-file-uploader
```

And then, in your template:

```
{{file-input onUpload=(action "onUpload")}}
```

and in your controller or component:

```
actions: {
  onUpload(fileData) {

    console.log("called onUpload, filedata is", fileData);
    // note: fileData.result is the base64 string.

    this.set('fileData', fileData);
  }
}
```


* DEMO: http://ember-semantic-ui-file-uploader.surge.sh/

