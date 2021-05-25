<template>
  <div>
    <h1>Add a new contact</h1>
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm';

export default {
    name: 'AddContact',
    components: {
        ContactForm
    }
}
</script>

<style>

</style>