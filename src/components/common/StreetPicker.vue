<template>
  <modal
    name="street-picker" 
    transition="pop-out" 
    :width="modalWidth" 
    height="auto"
    @closed="onCancel"
    @opened="opened"
    classes=[modal_panel]
  >
    <div class="modal">
      <header class="modal__header">
        <h3 class="modal__title">{{ title }}</h3>
        <p class="txt-grey small">Trouvé {{ rues.length }} rues correpondant à votre recherche.</p>
      </header>
      <section class="modal__content">

        <div class="autocomplete-fix">
          <!-- hack for tab ordering -->
          <input type="password" tabindex="0">
        </div>

        <table class="table" ref="table" tabindex="1">
          <thead>
            <th>#</th>
            <th>Nom</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Secteur</th>
          </thead>
          <tbody>
            <tr v-for="(rue, index) in rues"
              :key=rue.id
              @click=onSelectStreet(rue)
              @keydown="onKeydown(rue, $event)"
              :tabindex="index + 2"
            >
              <td>{{ index }}</td>
              <td>{{rue.name}}</td>
              <td>{{rue.no_civique_debut}}</td>
              <td>{{rue.no_civique_fin}}</td>
              <td>{{rue.secteur}}</td>
            </tr>
          </tbody>
        </table>
       
      </section>
      <footer>
        <button @click="onCancel" class="btn btn-warning">Annuler</button>
      </footer>
      
      
    </div>
  </modal>
</template>

<script>

const MODAL_WIDTH = 500
const TABLE_TAB_INDEX = 1
//@keyup="onKeyup(rue, $event)"
export default {
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      lastTabIndex: TABLE_TAB_INDEX
    }
  },
  created() { 
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  
  props: ['rues', 'title', 'pick', 'cancel'],
  methods: {
    onSelectStreet(rue) {
      this.$modal.hide('street-picker')
      this.pick(rue)
    },
    onCancel() {
      this.lastTabIndex = TABLE_TAB_INDEX
      this.$modal.hide('street-picker')
      this.$root.modalOpen = false
    },
    opened() {
      console.log('modal opened')
      this.$refs.table.focus()
      this.lastTabIndex = this.rues.length + TABLE_TAB_INDEX
      this.$root.modalOpen = true
    },
    onKeydown(rue, event) {
      let nextTabIndex
      if (event.key === 'ArrowDown') {
        nextTabIndex = event.target.tabIndex + 1
        if (nextTabIndex > this.lastTabIndex) {
          nextTabIndex = TABLE_TAB_INDEX + 1
        }
        document.querySelector(`[tabIndex='${nextTabIndex}']`).focus()
      }

      if (event.key === 'ArrowUp') {
        nextTabIndex = event.target.tabIndex - 1
        if (nextTabIndex < (TABLE_TAB_INDEX + 1)) {
          nextTabIndex = this.lastTabIndex
        }
        document.querySelector(`[tabIndex='${nextTabIndex}']`).focus()
      }
      if (event.key === 'Enter') {
        this.$modal.hide('street-picker')
        this.pick(rue)
      }
    }
    
    
  }
}
</script>

<style lang="scss" scoped>
 
  $border: 1px solid #3d404c;
  $header-footer-color: #1d1f24;


  .modal {
    background-color: #21242a;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 0 40px black;
    color: white;
    position: relative;

    &__title {
      font-size: 2.2rem;
      text-align: center;
    }

    &__header {
      padding: 1rem;
      border-bottom: $border;
      background-color:$header-footer-color;
      
      p {
        text-align: center;
      }

    }

    &__content {
      // overflow-y: auto;
      // overflow-x: hidden;
      padding: 1rem 1.5rem;
      
      // position: absolute;
      // top: 60px;
      // left: 0;
      // width: 100%;
      // height: 100%;

    }
    footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1.8rem;
      border-top: $border;
      background-color: $header-footer-color;
    }

  }

  .list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      cursor: pointer;
    }
  }

  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }


  .pop-out-enter-active,
  .pop-out-leave-active {
    transition: all 0.5s;
  }

  .pop-out-enter,
  .pop-out-leave-active {
    opacity: 0;
    transform: translateY(24px);
  }
</style>

