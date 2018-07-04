<template>
  <div class="table-container">
    <el-table
      :data="allRapports"
      style="width: 100%"
      size="small"
      height="100%"
      
    >
      <el-table-column
        fixed
        label="Procedure"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{procType(scope.$index)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="no_lot"
        label="Lot"
        width="60">
      </el-table-column>
      <el-table-column
        label="# cause"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.no_cause | noCause}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Adresse"
        width="200">
        <template slot-scope="scope">
          <span>{{formatAddress(scope.$index)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="demarche_date"
        label="Demarche"
        width="300">
      </el-table-column>
      <el-table-column
        prop="secteur"
        label="Secteur"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

/**
 * 
 * :row-style="rowStyle"
      :header-cell-style="headerCellStyle"
      id="my-fucking-table"
 */
import { mapGetters, mapActions } from 'vuex'
import helpers from './helpers'
export default {
  methods: {

    ...mapActions(['fetchRapports', 'nextPage', 'prevPage']),

    loadRecords() {
      this.fetchRapports({
        limit: 50,
        no_lot__gte: 258
        // no_cause__iexact: '83417302333'
      })
    },
    // eslint-disable-next-line
    rowStyle({row, index}) {
      return {
        // 'backgroundColor': '#282f37',
        'backgroundColor': 'transparent',
        'border': 'none'
      }
    },

    headerCellStyle() {
      return {
        'backgroundColor':'#282f37',
        'color': 'white',
        'font-size': '1.4rem',
        'border': 'none'
      }
    },
    
    formatNoCause(numero) {
      return helpers.formatNoCause(numero)
      // return row.no_cause
    },
    formatAddress(index) {
      // return helpers.formatNoCause(numero)
      return helpers.formatAddress(this.allRapports[index])
    },
    procType(index) {
      const row = this.allRapports[index]
      // console.log('row :', row)
      return this.procedureTypes[row.procedure_type]
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters(['allRapports', 'hasNext', 'hasPrev', 'pageNumber', 'pageCount', 'procedureTypes']),
    
  },
  created() {
    this.loadRecords()
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
  .el-table__header-wrapper {
    background-color: red;
  }
  .table-container{
    height: calc(100vh - 200px);
    background-color: yellow;

  }
  .has-gutter {
    background-color: yellow;
  }
  .el-table {
    background: transparent;
    border: none;

    .el-table__fixed-right-patch {
      background-color: #282f37;
      border-bottom: none;
    }

    &__row {
      

        border: none;
      
    }
  }
 
</style>

