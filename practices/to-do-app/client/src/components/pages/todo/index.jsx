import {
  Button,
  Card, CardActions, CardContent, Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../atoms/Spinner';
import ToDoComponent from '../../atoms/ToDo';
import useFetchToDo from './useFetchToDo';

function ToDo() {
  const { toDoId } = useParams();
  const [loading, toDo, error] = useFetchToDo(toDoId);

  if (loading && !error) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Typography variant="h5">
        An error has ocurred
      </Typography>
    );
  }

  return (
    <Card>
      <CardActions>
        <Link to="/todos">
          <Button>
            Regresar a la lista de tareas
          </Button>
        </Link>
      </CardActions>
      <CardContent>
        <Card>
          <CardContent>
            <ToDoComponent title={toDo?.title} text={toDo?.text} priority={toDo?.priority} />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default ToDo;
