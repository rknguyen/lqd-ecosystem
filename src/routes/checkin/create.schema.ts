export default {
  on: ["body"],
  schema: {
    userId: {
      type: String,
      required: true
    },
    face: {
      type: String,
      required: true
    }
  }
};
