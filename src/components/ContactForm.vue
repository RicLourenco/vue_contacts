<template>
    <form>
        <div class="error" v-if="error != ''">{{error}}</div>
        <br v-if="error === ''"/>
        <br />
        <input v-model="contact.name" placeholder="Name..."/>
        <br>
        <br>
        <input v-model="contact.contact" placeholder="Contact number..."/>
        <br>
        <br>        
        <input v-model="contact.email" placeholder="E-Mail..."/>
        <br>
        <br>
        <!--image tag here-->
        <input v-if="$route.name === 'AddContact'" type="submit" value="Submit new contact" v-on:click="SaveContact()"/>
        <input v-else type="submit" value="Update" v-on:click="SaveContact()"/>
    </form>
</template>

<script>
export default {
    name: 'ContactForm',
    data() {
        return {
            contact: {
                id: '',
                name: '',
                contact: '',
                email: '',
                picture: null
            },
            contacts: JSON.parse(localStorage.getItem('vueContacts') || '[]'),
            error: ''
        }
    },
    mounted() {

        if(this.$route.name === 'EditContact'){
            for(let i = 0; i < this.contacts.length; i++){
                if(this.contacts[i].id === this.$route.params.id){
                    this.contact = this.contacts[i];
                    return;
                }
            }
            this.$router.push('/');
        }
        
    },
    methods: {
        SaveContact: function() {

            if(!this.ValidateFields()){
                return;
            }

            for(let i = 0; i < this.contacts.length; i++){
                if(this.contacts[i].id === this.$route.params.id){
                    this.contacts[i] = this.contact;

                    let stringifiedList = JSON.stringify(this.contacts);

                    localStorage.setItem('vueContacts', stringifiedList);

                    this.$router.push('/');

                    return;
                }
            }

            
            this.SaveNewContact();

            this.$router.push('/');
        },
        GenerateId: function(max) {
            let generatedId = String(Math.floor(Math.random() * max));
            
            let i = 0;

            while(i < this.contacts.length){

                if(generatedId === this.contacts[i].id){
                    generatedId = String(Math.floor(Math.random() * max));

                    i = -1;
                }

                i++;
            }

            return generatedId;
        },
        SaveNewContact: function(){
            this.contact.id = this.GenerateId(1000001);

            this.contacts.push(this.contact);

            let stringifiedList = JSON.stringify(this.contacts);

            localStorage.setItem('vueContacts', stringifiedList);
        },
        ValidateFields: function(){
            let contactRegEx = /^\d{9}$/;
            let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(this.contact.name.length < 5){
                this.error = 'Invalid name, has to be at least 5 characters long';
                return false;
            }

            if(!this.contact.contact.match(contactRegEx)){
                this.error = 'Invalid contact, should be 9 digits';
                return false;
            }

            if(!this.contact.email.match(emailRegEx)){
                this.error = 'Invalid e-mail address';
                return false;
            }

            for(let i = 0; i < this.contacts.length; i++){

                if(this.contacts[i].id !== this.contact.id) {
                    if(this.contacts[i].contact === this.contact.contact) {
                        this.error = 'Contact number already exists'

                        return false;
                    }


                if(this.contacts[i].email === this.contact.email){
                        this.error = 'E-Mail already exists'

                        return false;
                    }
                }
                
            }

            return true;
        }
    }
}
</script>

<style scoped>
.error{
    color: red;
}
</style>