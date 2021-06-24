//this page is for Material UI styling
import { makeStyles } from '@material-ui/core/styles';

//material ui hook
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#e8eaf6',
    padding: theme.spacing(1, 0, 0),
  },
  icon: {
    color: '#7986cb',
  },
  buttons: {
    backgroundColor: '#bbdefb',
    borderRadius: '8px',
  },
}));
export default useStyles;

export const styles = (theme) => ({
  spring: {
    flexGrow: 1,
  },
  bikeBox: {
    height: '300px',
    width: '200px',
  },
  img: {
    height: '120px',
  },
  btn: {
    fontSize: '10px',
    width: '50%',
  },
  formContainer: {
    maxWidth: '15%',
    margin: '0 auto',
  },
  bikeBoxText: {
    height: '236px',
  },
});
