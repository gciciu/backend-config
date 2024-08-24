<template>
  <div class="file-upload-wrapper" ref="fileform" @click="triggerClick" :class="{disabled:disabled}">
    <div class="file-upload" :style="{height: `${height}px`}">
      <div class="message" v-if="internalFiles.length==0">
        <svg viewBox="0 0 700 500" height="50px">
          <path class="upload-icon" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"/>
        </svg>
        <p>{{ message }}</p>
        <p class="error-message" v-if="sizeError">{{ generalErrorText }}</p>
      </div>

      <label>
        <input type="file" class="file-input" ref="input" @change="handleFileUpload" :multiple="multiple" :accept="accept"/>
      </label>

      <div class="previews" v-if="internalFiles.length>0">
        <div v-for="(file, key) in internalFiles" :key="key" class="single-preview">
          <span v-if="isPicture(file.name)">
            <img :ref="`image${parseInt(key)}`"/>
          </span>
          <span class="flex-icon-wrap" v-else>
            <svg viewBox="0 0 384 512" height="100px" class="file-icon">
              <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"/>
            </svg>
          </span>
          <div class="detail" :class="{'invisible-until-hover':hover}">
            <button class="remove-file-btn" @click.stop="removeFile( key )">
              <span>{{ btnText }}
                <svg viewBox="190 0 1 500" height="10px" width="10px">
                  <path class="trashcan-icon" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/>
                </svg>
              </span>
            </button>
            <div class="detail-inner">
              <p>{{ file.name }} </p>
              <p class="secondary">{{ secondaryMessage }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="error-overlay" v-if="sizeError">
        <ul>
          <li>{{ fileTooBigText }}</li>
        </ul>
      </div>
      <progress max="100" :value.prop="percentageUploaded" v-if="percentageUploaded"></progress>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mdb-file-upload',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    percentageUploaded: {
      type: Number,
      default: 0,
    },
    height: {
      type: [Number, String],
      default: 200
    },
    hover: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Object,
      default: () => { }
    },
    secondaryText: {
      type: Object,
      default: () => { }
    },
    btnText: {
      type: String,
      default: 'remove'
    },
    generalErrorText: {
      type: String,
      default: 'Ooops, something wrong happended.'
    },
    fileTooBigText: {
      type: String,
      default: 'The file size is too big.'
    },
    accept: {
      type: String,
    },
    files: {
      type: Array,
      default: () => []
    },
    maxSize: {
      type: String
    }
  },
  data(){
    return {
      internalFiles: [],
      showPreview: false,
      dragAndDropAble: false,
      sizeError: false,
    }
  },
  mounted() {
    this.dragAndDropAble = this.isDragAndDropAble();
    if (this.dragAndDropAble) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( evt => {
        this.$refs.fileform.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
        });
      })
      this.$refs.fileform.addEventListener('drop', e => {
        this.handleFileUpload(e);
      })
      if (this.files !== []) {
        this.internalFiles = this.files;
        this.$emit('change', this.files);
      }
    }
  },
  methods: {
    isDragAndDropAble() {
      const div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    },
    handleFileUpload(event) {
      // depending on whether the event object's dataTransfer property exists, we assign variable to appropriate file source
      const uploadedFiles = event.dataTransfer !== undefined ? event.dataTransfer.files : this.$refs.input.files;
      this.sizeError = false;
      if (this.multiple) {
        for (let i = 0; i < uploadedFiles.length; i++ ) {
          if (this.isFileSizeRight(uploadedFiles[i])) {
            this.internalFiles.push(uploadedFiles[i]);
          } else {this.sizeError = true}
        }
      } else {
        this.internalFiles = [];
        (this.isFileSizeRight(uploadedFiles[0])) && this.internalFiles.push(uploadedFiles[0]);
      }
      this.$emit('change', this.internalFiles)
      this.getImagePreviews();
    },
    getImagePreviews() {
      if (this.internalFiles.length > 0) {
        for (let i = 0; i < this.internalFiles.length; i++) {
          if (this.isPicture(this.internalFiles[i].name)) {
            let reader = new FileReader();
            reader.addEventListener('load', () => {
              this.$refs[`image${parseInt(i)}`][0].src = reader.result;
            });
            reader.readAsDataURL(this.internalFiles[i])
          }
        }
      }
    },
    removeFile(key) {
      this.$emit('change', this.internalFiles);
      this.internalFiles.splice(key, 1);
      this.getImagePreviews();
    },
    isPicture(file) {
      return /\.(jpe?g|png|gif)$/i.test( file );
    },
    triggerClick() {
      if (this.internalFiles.length > 0 || this.sizeError) {
        this.$refs.input.click();
      }
    },
    isFileSizeRight(file) {
      if (this.isMaxSizeProvided) {
        if (this.sizeToByte(this.maxSize) > file.size) {
          return true
        } else {
          this.sizeError = true;
          return false;
        }
      }
      return true;
    },
    sizeToByte(size) {
      let value = 0;

      if (size !== 0) {
        let unit = size.slice(-1).toUpperCase();
        let kb = 1024;
        let mb = kb * 1024;
        let gb = mb * 1024;

        if (unit === 'K') {
          value = parseFloat(size) * kb;
        } else if (unit === 'M') {
          value = parseFloat(size) * mb;
        } else if (unit === 'G') {
          value = parseFloat(size) * gb;
        }
      }
      return value;
    }
  },
  computed: {
    message() {
      let output;
      if (this.isDragAndDropAble) {
        if (this.multiple) {
          output = this.text.able.multi || 'Drag and drop files here or click'
        } else {
          output = this.text.able.single || 'Drag and drop a file here or click'
        }
      } else {
        if (this.multiple) {
          output = this.text.unable.multi || 'Click here to upload files'
        } else {
          output = this.text.unable.single || 'Click here to upload a file'
        }
      }
      return output;
    },
    secondaryMessage() {
      let output;
      if (this.isDragAndDropAble) {
        if (this.multiple) {
          output = this.secondaryText.able.multi || 'Drag and drop or click to add files'
        } else {
          output = this.secondaryText.able.single || 'Drag and drop or click to replace file'
        }
      } else {
        if (this.multiple) {
          output = this.secondaryText.unable.multi || 'Click here to add files'
        } else {
          output = this.secondaryText.unable.single || 'Click here to replace file'
        }
      }
      return output;
    },
    isMaxSizeProvided() {
      return typeof this.maxSize !== 'undefined';
    }
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
.file-upload {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  color: #ccc;
  -webkit-border-radius: 0!important;
  border-radius: 0!important;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  border: 0;
  font-weight: 400;
  position: relative;
  overflow: hidden;
  cursor: default;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  transition: .3s
}

.file-upload:hover .overlay {
  background-color: rgba(0, 0, 0, .1);
  transition: .3s
}

.overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0);
  transition: .3s
}

.upload-icon {
  height: 100%;
  width: 100%;
  fill: #ccc
}

.trashcan-icon {
  height: 100%;
  width: 100%;
  fill: #fff
}

.file-icon {
  position: relative;
  top: 25%;
}

.flex-icon-wrap {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  flex-direction: row;
}

.remove-file-btn span {
  white-space: nowrap;
}

.remove-file-btn span svg {
  position: relative;
  display: inline;
}

.file-upload:hover .detail {
  opacity: 1;
}

.message {
  position: relative;
}

.file-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}
.previews, .error-overlay {
  position: absolute;
  z-index: 3;
  background-color: #fff;
  padding: 5px;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  display:flex;
  flex-direction: row;
  cursor: pointer;
}

.single-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.previews span img {
  width: 100%;
  height: 100%;
  background-color: #fff;
  -webkit-transition: border-color .15s linear;
  -o-transition: border-color .15s linear;
  transition: border-color .15s linear;
  -o-object-fit: cover;
  object-fit: cover;
  position: relative;
  display: block;
  vertical-align: middle;
  border-style: none;
}

.detail.invisible-until-hover {
  opacity: 0;
}
.detail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
  transition: .3s;
}

.file-upload:hover .detail.invisible-until-hover {
  opacity:1;
  transition: .3s;
}

.detail p {
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #fff;
  text-align: center;
  line-height: 25px;
  font-weight: 700;
}

.detail p.secondary {
  margin-top: 15px;
  padding-top: 15px;
  font-size: 12px;
  position: relative;
  opacity: .5;
}

.detail-inner {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0,-40%);
  -ms-transform: translate(0,-40%);
  transform: translate(0,-40%);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  width: 100%;
  padding: 0 20px;
  -webkit-transition: all .2s ease;
  -o-transition: all .2s ease;
  transition: all .2s ease;
}

.detail p.secondary::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  -webkit-transform: translate(-50%,0);
  -ms-transform: translate(-50%,0);
  transform: translate(-50%,0);
  background: #fff;
  width: 30px;
  height: 2px;
}

.remove-file-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: .5rem 1.6rem;
  font-size: .64rem;
  background-color: #ff3547!important;
  color: #fff!important;
  border: 0;
  border-radius: .125rem;
  text-transform: uppercase;
  line-height: 1.5;
}

.disabled {
  pointer-events: none!important;

}

.disabled .message {
  opacity: 0.5;
}

.disabled .message p {
  text-decoration: line-through;
}

.disabled .message svg path {
  fill: #ccc;
}

.error-message {
  color: #f34141;
  font-weight: 700;
}

.error-overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: rgba(243,65,65,.8);
  text-align: left;
}

.error-overlay ul {
  padding: 10px 20px;
  margin: 0;
  position: absolute;
  left: 0;
  top: 40%;
}

.error-overlay ul li {
  margin-left: 20px;
  color: #fff;
  font-weight: 700;
}

</style>
