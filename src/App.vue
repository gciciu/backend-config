<template>
  <div class="configurator-container">
      <router-view>
      </router-view>
  </div>
</template>
<script>
  import { mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, Popover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbCardGroup, mdbCardImage,
    mdbCardTitle, mdbCardBody, mdbCardText, mdbCard, mdbView, mdbDatatable,mdbSideNav, mdbSideNavNav, mdbSideNavCat, mdbSideNavItem, mdbMask, mdbJumbotron} from 'mdbvue';
  import Templatelist from "./components/Templatelist";
  export default {
    name: 'app',
    components: {
      Templatelist,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbTooltip,
      Popover,
      mdbInput,
      mdbTextarea,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbIcon, mdbCardGroup, mdbCardImage,
      mdbCardTitle, mdbCardBody, mdbCardText, mdbCard, mdbView, mdbDatatable,mdbSideNav, mdbSideNavNav, mdbSideNavCat, mdbSideNavItem, mdbMask,mdbJumbotron
    },
    data() {
      return {
        modalComponents: false
      }
    },
    methods: {
    },
    watch: {
    },
    mounted() {
      this.$router.push("/templateList");
    }
  };
</script>

<style>
  .dropdown-content li > a, .dropdown-content li > span {
    font-size: 0.9rem;
    color: #000000;
    display: block;
    padding: 0.5rem;
  }
  .pagination.pg-blue .page-item.active .page-link {
    background-color: #33B5E6;
  }

  .modalCloseButton {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px !important;
    font-size: 20px !important;
    color: #ff2800 !important;
  }

  body {
    font-family:"Helvetica 35 Thin";
    letter-spacing: 0.05rem;
    color: #444444 !important;
    text-shadow: 0.5px 0.5px 0.5px #F2F2F2;
  }

  .geccomCursor{
    cursor: pointer;
  }
  .btn-geccomButtonGreen{
    background: #33b5e5 !important;
    padding: 0.84rem 2.14rem;
    color:#FFFFFF;
  }
  .btn-geccomButtonGreen:hover{
    color:#FFFFFF;
  }

  .btn-geccomButtonRed{
    color: #FFFFFF;
    background: #ff2800 !important;
    padding: 0.84rem 2.14rem;
    color:#FFFFFF;
  }
  .btn-geccomButtonRed:hover{
    color:#FFFFFF;
  }

  .btn-geccomButtonInfo{
    padding:0;
    margin:0;
    background: transparent !important;
    box-shadow: none;
    border:0;
    color:#000000;
  }
  .btn-geccomButtonInfo:hover, .btn-geccomButtonInfo:active, .btn-geccomButtonInfo:focus {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline: 0;
    color:#33B5E6;
  }

  .md-form input[type=text]:focus:not([readonly]), .md-form input[type=password]:focus:not([readonly]), .md-form input[type=email]:focus:not([readonly]), .md-form input[type=url]:focus:not([readonly]), .md-form input[type=time]:focus:not([readonly]), .md-form input[type=date]:focus:not([readonly]), .md-form input[type=datetime-local]:focus:not([readonly]), .md-form input[type=tel]:focus:not([readonly]), .md-form input[type=number]:focus:not([readonly]), .md-form input[type=search-md]:focus:not([readonly]), .md-form input[type=search]:focus:not([readonly]), .md-form textarea.md-textarea:focus:not([readonly]) {
    -webkit-box-shadow: 0 1px 0 0 #33B5E6;
    box-shadow: 0 1px 0 0 #33B5E6;
    border-bottom: 1px solid #33B5E6;
  }
  .modalOptionValues > .modal-dialog {
    max-width: 95%;
  }

  .modalOptionValues > .modal-dialog > .modal-content {
    height: auto;
    min-height: 100%;
    border-radius: 0;
  }

  .md-form label {
    top: 2.2rem;
  }
  .form-check-input[type="radio"]:checked + label:after, .form-check-input[type="radio"].with-gap:checked + label:after, label.btn input[type="radio"]:checked + label:after, label.btn input[type="radio"].with-gap:checked + label:after {
    background-color: #33B5E6;
  }
  .form-check-input[type="radio"]:checked + label:after, .form-check-input[type="radio"].with-gap:checked + label:before, .form-check-input[type="radio"].with-gap:checked + label:after, label.btn input[type="radio"]:checked + label:after, label.btn input[type="radio"].with-gap:checked + label:before, label.btn input[type="radio"].with-gap:checked + label:after {
    border: 2px solid #33B5E6;
  }
  .geccomTextColor{
    color:#33B5E6;
  }
  .geccomIcon{
    width:10px;
    margin-top:-10px;
  }
  .table-responsive, .tab-pane.active {
    overflow: visible !important;
  }

  nav a.router-link-active,nav ul li a.active {
    color:#33B5E6 !important;
  }
  table.table td, table.table th {
    padding: 0.25rem !important;
  }
  .table td, .table th {
    padding: 0.5rem;
    vertical-align: middle;
  }

  .table td .btn{
    margin: 0.25rem;
  }
  .btn-geccomButtonTransparent {
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #000000;
    padding: 0 !important;
    margin: 0 !important;
  }

  .btn-geccomButtonTransparent:hover, .btn-geccomButtonTransparent:active, .btn-geccomButtonTransparent:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 0;
  }
  .display-5 {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.2;
  }

</style>
