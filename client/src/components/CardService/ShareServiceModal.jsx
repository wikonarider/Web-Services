import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function ShareServiceModal({ modal, setModal, serviceId }) {
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h3>Share with</h3>
          <FacebookShareButton
            url={`https://pf-web-service.vercel.app/services/${serviceId}`}
          >
            <FacebookIcon size={35} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton
            url={`https://pf-web-service.vercel.app/services/${serviceId}`}
          >
            <WhatsappIcon size={35} round={true} />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={`https://pf-web-service.vercel.app/services/${serviceId}`}
          >
            <LinkedinIcon size={35} round={true} />
          </LinkedinShareButton>
        </Box>
      </Modal>
    </div>
  );
}
