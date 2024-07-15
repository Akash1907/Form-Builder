
import {useState} from 'react';
import {
  Typography,
  TextField,
  Container
} from '../../Components/muiIcons/muiIcons';

export default function EnterPostSection() {

  // const [post, setPost] = useState();

  return (
    <div>
      <TextField
        label="Write your post"
        multiline
        rows={8} 
        variant="outlined"
        fullWidth
        sx={{
          mt: 4,
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
