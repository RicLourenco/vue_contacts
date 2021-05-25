<template>
  <div>
    <h1>List</h1>
    <div class="card" v-for="contact in contacts" :key="contact.id">
      <a>Name: {{contact.name}}</a>
      <br />
      <a>Contact: {{contact.contact}}</a>
      <br />
      <a>E-Mail: {{contact.email}}</a>
      <!--<br/>-->
      <!--Picture tag here-->
      <br/>
      <button v-on:click="$router.push(`/editcontact/${contact.id}`)">Edit</button>
      <button v-on:click="$router.push(`/contactdetails/${contact.id}`)">Details</button>
      <button class="deleteBtn" v-on:click="openDeleteModal(contact.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      contacts: this.getContacts()
    }
  },
  methods: {
    getContacts: function() {
      let contacts = JSON.parse(localStorage.getItem('vueContacts') || '[]');

      return contacts;
    },
    openDeleteModal: function(contactId) {
      let deleteAnswer = window.confirm('Are you sure you want to delete?');

      if(deleteAnswer){
        for(let i = 0; i < this.contacts.length; i++){
                if(this.contacts[i].id === contactId){
                    this.contacts.splice(i, 1);

                    let stringifiedList = JSON.stringify(this.contacts);

                    localStorage.setItem('vueContacts', stringifiedList);

                    // this.$router.push('/');

                    return;
                }
            }
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid black;
  margin-bottom: 10px;
  width: 40%;
  padding: 4px;
}

.deleteBtn {
  color: red;
}
</style>