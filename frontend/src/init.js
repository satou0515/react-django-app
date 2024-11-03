import axios from "axios";

const initializeApp = () => {
  // axios経由ですべてのAPIリクエストのベースURLを設定
  axios.defaults.baseURL = process.env.REACT_APP_URL;
}
export default initializeApp
