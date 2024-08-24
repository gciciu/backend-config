<template>
  <div id="demo" @contextmenu="openMenu">
    <h1 class="center">
      Right click anywhere to bring up a menu.
    </h1>
    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" v-on:blur="closeMenu"  v-bind:style="{top:top, left:left}">
      <li>First list item</li>
      <li>Second list item</li>
    </ul>
  </div>
</template>
<script>
  import { mdbFormInline,mdbSwitch,mdbCollapse, mdbBtn, mdbModal,mdbBtnGroup, mdbBtnToolbar, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, Popover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody,mdbCard, mdbCardBody,mdbJumbotron,mdbSelect,FormInline,mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbCardTitle, mdbCardText,  mdbCardHeader} from 'mdbvue';
  import { cloneDeep, tap, set } from 'lodash'
  import FileCsvUpload from '@/datatypes/FileCsvUpload'
  import FileDragDropInstant from '@/datatypes/FileDragDropInstant'
  import ConfigSelect from '@/datatypes/ConfigSelect'
  import axios from 'axios';
  import mdbWysiwyg from 'mdb-wysiwyg';
  import draggable from 'vuedraggable';
  import brace from 'brace';
  import { Ace as AceEditor, Split as SplitEditor } from 'vue2-brace-editor';
  import 'brace/mode/javascript';
  import 'brace/theme/chrome';
  import Fullscreen from "vue-fullscreen/src/component.vue";
  import mdbFileUpload from 'mdb-file-upload';

  const obj = {};

  export default {
    name: 'demo',

    data() {
      return {
        viewMenu: false,
        top: '0px',
        left: '0px'
      }
    },

    methods: {
      setMenu: function(top, left) {
        this.top = top + 'px';
        this.left = left + 'px';
      },

      closeMenu: function() {
        this.viewMenu = false;
      },

      openMenu: function(e) {
        this.viewMenu = true;

        let obj = e.target
        let objSet = obj.getBoundingClientRect();
        console.log(objSet);

        this.$nextTick(function() {
          this.$refs.right.focus();
          this.setMenu(objSet.top, (objSet.right-objSet.left + objSet.width))
          e.preventDefault();
        }.bind(this));
      }
    }
  };
</script>
<style>
  body {
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 3em;
  }

  .center {
    text-align: center;
  }

  #demo {
    width: 100%;
    height: 100%;
  }

  #right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
  }

  #right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
  }

  #right-click-menu li:last-child {
    border-bottom: none;
  }

  #right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
  }
  .liIsActive{
    background: #33B5E6 !important;
    cursor: pointer;
  }
  .input-group-append, .input-group-prepend {
    display: -ms-flexbox !important;
    display: -webkit-box !important;
  }
  .width90{
    width: 90%;
  }
  .input-group {
    display: -ms-flexbox !important;
    display: -webkit-box !important;
  }
  .form-inline .form-check {
    margin-right: -40px;
  }

  @media (min-width: 768px){

    .modal .modal-dialog.modal-bottom-right {
      bottom: 2.15em;
      right: 3.75em;
    }
  }

  .dropleft .dropdown-toggle::before {

    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
  }
  .btn-primary.dropdown-toggle {
    background-color: transparent!important;
    border: none;
    box-shadow: none;
    color: #000000;
  }
  .btn-primary.dropdown-toggle:hover, .btn-primary.dropdown-toggle:focus {
    background-color: transparent !important;
    color: #33B5E6;
  }
  .dropdown .dropdown-menu .dropdown-item:hover, .dropdown .dropdown-menu .dropdown-item:active, .dropup .dropdown-menu .dropdown-item:hover, .dropup .dropdown-menu .dropdown-item:active, .dropleft .dropdown-menu .dropdown-item:hover, .dropleft .dropdown-menu .dropdown-item:active, .dropright .dropdown-menu .dropdown-item:hover, .dropright .dropdown-menu .dropdown-item:active {
    -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    background-color: #A4B87B;
    border-radius: 0.125rem;
    -webkit-transition: all 0.1s linear;
    transition: all 0.1s linear;
  }
  .white-text, .card.card-cascade .view.view-cascade.gradient-card-header, .dropdown .dropdown-menu .dropdown-item:hover, .dropdown .dropdown-menu .dropdown-item:active, .dropup .dropdown-menu .dropdown-item:hover, .dropup .dropdown-menu .dropdown-item:active, .dropleft .dropdown-menu .dropdown-item:hover, .dropleft .dropdown-menu .dropdown-item:active, .dropright .dropdown-menu .dropdown-item:hover, .dropright .dropdown-menu .dropdown-item:active, .side-nav, .side-nav .search-form .form-control, .md-toast-message a, .md-toast-message label, .md-toast-close-button, #toast-container > div, .picker__list-item--selected, .picker__list-item--selected:hover, .picker--focused .picker__list-item--selected, .picker--time .picker__button--clear:hover, .picker--time .picker__button--clear:focus, .picker--time .picker__button--clear:hover:before, .picker--time .picker__button--clear:focus:before, .picker__date-display, .picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary, .picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary, .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary, .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary, .clockpicker-display .clockpicker-display-column #click-am.text-primary, .clockpicker-display .clockpicker-display-column #click-pm.text-primary, .darktheme .picker__box .picker__date-display .clockpicker-display, .darktheme .picker__box .picker__date-display .clockpicker-display .clockpicker-span-am-pm, .darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick, .darktheme .picker__box .picker__footer button, .picker__box .picker__header .picker__date-display, .picker__box .picker__table .picker__day--outfocus, .picker__box .picker__table .picker__day--selected, .picker__box .picker__table .picker__day--selected:hover, .picker__box .picker__table .picker--focused {
    color: inherit;
  }

  .md-form input[type=text]:focus:not([readonly]) + label, .md-form input[type=password]:focus:not([readonly]) + label, .md-form input[type=email]:focus:not([readonly]) + label, .md-form input[type=url]:focus:not([readonly]) + label, .md-form input[type=time]:focus:not([readonly]) + label, .md-form input[type=date]:focus:not([readonly]) + label, .md-form input[type=datetime-local]:focus:not([readonly]) + label, .md-form input[type=tel]:focus:not([readonly]) + label, .md-form input[type=number]:focus:not([readonly]) + label, .md-form input[type=search-md]:focus:not([readonly]) + label, .md-form input[type=search]:focus:not([readonly]) + label, .md-form textarea.md-textarea:focus:not([readonly]) + label {
    color: #33B5E6;
  }
  .success-color {
    background-color: #33b5e5 !important;
  }


  .previews, .error-overlay {
    position: absolute;
    z-index: 3;
    background-color: #fff;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    cursor: pointer;
  }
  .single-preview {
    border-radius: 20px;
    overflow: hidden;
    width: 180px !important;
    height: 180px;
    position: relative;
    display: block;
    z-index: 10;
    margin-right: 5px;
  }
  .remove-file-btn {
    position: absolute;
    top: auto !important;
    bottom: 10px !important;
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
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent !important;
    -webkit-transition: .3s;
    transition: .3s;
  }

  .mdb-wysiwyg-container {
    display: block;
    border: 1px solid #ededed;
    border-radius: 3px 3px 0 0;
    height: 100%;
  }

  .mdb-wysiwyg-textarea {
    display: block;
    padding: 15px;
    width: 100%;
    min-height: 100% !important;
    border: 0;
    outline: none;
    resize: none;
    background: #fff;
  }
  .gcm-cardTitle {
    margin-bottom: .75rem;
    background: #BBBBBB;
    padding: 15px;
  }
  .gcm-container-fluid {
    width: 98.6%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: 25px;
    #background: #EEEEEE;
  }
  .gcm-ruleCheckbox div label{
    top: 0;
  }
  .ruleRow{
    margin-left: 25px;
  }
  .gcm-hoverableRow:hover{
    #background: #D8D8D8;
    cursor: pointer;
  }
  .gcm-checkboxMargin{
    margin-top: -25px !important;
  }
  /*.collapse-item[data-v-2d7bb3a4] {
    overflow: hidden !important;
    padding: 0;
    -webkit-transition: height 0.5s !important;
    transition: height 0.5s !important;
    position: relative !important;
    padding-bottom: 25px;
    margin-bottom: 59px;
    position: relative;
    height: 300px !important;
  }*/
  .switch label input[type=checkbox]:checked + .lever:after {
    background-color: #33B5E6;
    left: 1.5rem;
  }
  .gcm-selectFontSize{
    font-size: 14px;
  }
  .collapse.show.collapse-item{
    width: 115%;
  }
  .gcm-colHeight{
    height: 0;
  }
  div.gcm-conditionBorder{
    border-left: 1px solid #000000;
    height: 20px;
    border-bottom: 1px solid #000000;
    width: 14px;
    position: absolute;
    left: 0;
    top: 0;
  }
  div.gcm-conditionBorderDynamic{
    border-left: 1px solid #000000;
    height: 55px;
    border-bottom: 1px solid #000000;
    width: 14px;
    position: absolute;
    left: 0;
    top: -38px;
  }
  .dmg-radio-toolbar input[type="radio"] {
    display: none;
  }
  .dmg-radio-toolbar label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    background-color: #ddd;
    text-align: center;
    padding: 4px 2px;
    font-size: 12px;
    margin:2px ;
    width:70px;
    cursor: pointer;
  }

  .dmg-radio-toolbar input[type="radio"]:checked+label {
    background-color: #bbb;
  }

  .list-group-item:first-child, :not(.list-group-item) + .list-group-item { border-top: 0px solid #000000;}

  .list-group-item {
    padding: 0px !important;
    border-right: 0px;
    border-left: 0px;
  }
  .list-property-item:first-child, :not(.list-group-item) + .list-group-item { border-top: 0px solid #000000;}

  .list-property-item {
    width: 100%;
    padding: 2px;
    border-left: 0px solid #000000;
    border-right: 0px solid #000000;
  }
  .dmg-table-template {
    display: table;
    #border-spacing: 0.5em;
    width: 100%;
  }

  .dmg-table-template-row {display: table-row; }
  .dmg-table-template-cell {display: table-cell;  border-right: 0px solid #000000;}
  .cellWidth78 {
    width: 78%;
  }
  .cellWidth22 {
    width: 22%;
  }
  .cellWidth80 {
    width: 80%;
  }

  [type="radio"]:not(:checked), [type="radio"]:checked {
    opacity: inherit;
    position: inherit;
  }
  #right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute !important;
    width: 250px;
    z-index: 999999;
  }

  #right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
  }

  #right-click-menu li:last-child {
    border-bottom: none;
  }

  #right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
  }
</style>
