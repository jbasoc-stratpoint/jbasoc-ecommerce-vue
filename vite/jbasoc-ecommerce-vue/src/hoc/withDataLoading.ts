import { h } from "vue";

function WithCounter(WrappedComponent) {
  // we will return new component that render's WrappedComponent
  return {
    created() {
      console.log("HOC component created");
    },

    render() {
      return h(WrappedComponent);
    },
  };
}

export default WithCounter;
