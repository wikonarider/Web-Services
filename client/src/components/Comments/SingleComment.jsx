import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextField from '@mui/material/TextField';
dayjs.extend(relativeTime);

export default function SingleComment({ qualification, cookie }) {
  let [wrap, setWrap] = useState(true);
  let [edit, setEdit] = useState({});
  let [updated, setUpdated] = useState({});
  const IMG_TEMPLATE =
    'https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png';

  const handleEdit = (event, type) => {
    let value = event.target.value;
    switch (type) {
      case 'edit':
        setEdit({
          id: updated.id || id,
          comment: updated.comment || comment,
          score: updated.score || score,
        });
        break;
      case 'clear':
        setEdit({});
        break;
      case 'save':
        axios
          .put('/qualification', {
            newComment: edit.comment,
            newScore: edit.score,
            id,
          })
          .then((response) => {
            setUpdated({ comment: edit.comment, score: edit.score });
            setEdit({});
          })
          .catch((e) => {
            alert('Please try again');
          });
        break;
      case 'score':
        setEdit((edit) => {
          return { ...edit, score: Number(value) };
        });
        break;
      case 'comment':
        setEdit((edit) => {
          return { ...edit, comment: value };
        });
        break;
      default:
        break;
    }
  };

  let { comment, score, createdAt, id, userId } = qualification;
  let { userImg, name, lastname } = qualification.user;

  return (
    <Box
      id={id}
      key={id}
      display='grid'
      gridTemplateColumns='repeat(12, 1fr)'
      gap={1}
      sx={{ m: '5px 0px' }}
    >
      <Box gridColumn='span 1'>
        <CardMedia
          component='img'
          height='50px'
          image={userImg ? userImg : IMG_TEMPLATE}
          alt={`${name} ${lastname}`}
          sx={{
            objectFit: 'contain',
            borderRadius: '20%',
            height: 'minContent',
            width: '100%',
            m: '5px auto',
          }}
        />
      </Box>
      <Box gridColumn='span 11' sx={{ textAlign: 'justify', width: '100%' }}>
        <Box
          gridColumn='span 12'
          sx={{
            textAlign: 'justify',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography variant='subtitle2'>
            {`${name} ${lastname}`}
            <Typography variant='caption'>
              {` - ${dayjs(updated.updatedAt || createdAt).fromNow()}`}
            </Typography>
          </Typography>
          {cookie === userId ? (
            edit.id === id ? (
              <>
                <IconButton
                  aria-label='edit comment'
                  sx={{ m: '0px', p: '0px' }}
                  onClick={(e) => handleEdit(e, 'clear')}
                >
                  <ClearIcon />
                </IconButton>
                <IconButton
                  aria-label='edit comment'
                  sx={{ m: '0px', p: '0px' }}
                  onClick={(e) => handleEdit(e, 'save')}
                  disabled={edit.comment.length === 0 ? true : false}
                >
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                aria-label='edit comment'
                sx={{ m: '0px', p: '0px' }}
                onClick={(e) => handleEdit(e, 'edit')}
              >
                <EditIcon />
              </IconButton>
            )
          ) : null}
          <Rating
            name='rating'
            value={edit.score || updated.score || score}
            readOnly={edit.id ? false : true}
            precision={1}
            sx={{ ml: 'auto' }}
            onChange={(e) => handleEdit(e, 'score')}
          />
        </Box>

        {comment.length > 0 ? (
          edit.id === id ? (
            <TextField
              id={`edit-comment-${id}`}
              label='Edit comment'
              error={edit.comment.length === 0 ? true : false}
              fullWidth
              multiline
              maxRows={4}
              value={edit.comment}
              onChange={(e) => handleEdit(e, 'comment')}
              sx={{ mt: '10px' }}
              helperText={
                edit.comment.length === 0 ? 'Comment cannot be empty' : null
              }
            />
          ) : (
            <>
              {' '}
              <Box
                gridColumn='span 12'
                sx={{
                  textAlign: 'justify',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant='body2' noWrap={wrap}>
                  {edit.comment || updated.comment || comment}
                </Typography>
              </Box>
              <CardActions disableSpacing sx={{ p: '0px' }}>
                <IconButton
                  onClick={() => setWrap(!wrap)}
                  aria-label='share'
                  sx={{ mr: '0px auto 0px auto', p: '0px' }}
                >
                  <Typography variant='caption' sx={{ p: '0px' }}>
                    {updated.comment?.length < 90 || comment.length < 90
                      ? ''
                      : wrap
                      ? 'See more...'
                      : 'See less'}
                  </Typography>
                </IconButton>
              </CardActions>
            </>
          )
        ) : null}
      </Box>
    </Box>
  );
}
