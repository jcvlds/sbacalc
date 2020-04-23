<template>
  <div class="home">
    <Calc />
  </div>
</template>

<script>
// @ is an alias to /src
import Calc from '@/components/Calc.vue'

export default {
  name: 'Home',
  components: {
    Calc
  }
}
</script>
