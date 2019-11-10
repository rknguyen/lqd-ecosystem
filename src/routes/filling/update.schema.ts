export default {
  on: ['body'],
  schema: {
    fillingID: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  }
}