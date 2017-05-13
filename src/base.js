import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

export default base;
