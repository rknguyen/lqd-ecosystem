export default {
  on: ["body"],
  schema: {
    userId: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    schoolYear: {
      type: String,
      required: true
    }
  }
};
