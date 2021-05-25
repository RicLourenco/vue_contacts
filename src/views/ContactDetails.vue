<template>
  <div>
    <h1>Contact details</h1>
    <div>ID: {{contactDetails.id}}</div>
    <div>Name: {{contactDetails.name}}</div>
    <div>Contact: {{contactDetails.contact}}</div>
    <div>E-Mail: {{contactDetails.email}}</div>
    <br/>
    <br/>
    <!-- <button v-on:click="$router.push('/')">Go back</button> -->
    <!-- <div>Picture: {{picture}}</div> -->
  </div>
</template>

<script>
export default {
    name: 'ContactDetails',
    data() {
      return {
        contactDetails: {
        id: '',
        name: '',
        contact: '',
        email: '',
        picture: null
      },
      contacts: JSON.parse(localStorage.getItem('vueContacts') || '[]')
     }
  },
    mounted() {

        if(this.$route.name === 'ContactDetails'){
            for(let i = 0; i < this.contacts.length; i++){
                if(this.contacts[i].id === this.$route.params.id){
                    this.contactDetails = this.contacts[i];
                    return;
                }
            }

            this.$router.push('/');
        }
        
    }
}

</script>

<style>

</style>