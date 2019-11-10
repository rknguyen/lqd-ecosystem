export default {
  on: ['body'],
  schema: {
    documentID: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  }
}