import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import Iconify from '../iconify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ----------------------------------------------------------------------

MediaGallery.propTypes = {
  files: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(5),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2),
    },
  }));

export default function MediaGallery({files, open, onClose}) {
    const { t } = useTranslation()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <BootstrapDialog open={open}>
        <BootstrapDialogTitle onClose={onClose}>
            {t('components.media-gallery.title')}
        </BootstrapDialogTitle>
        <DialogContent>
            <Slider {...settings}>
                {files.map((file) => {
                    const src = URL.createObjectURL(file)
                    if (file.type.includes("image")) {
                        // Show images
                        return (
                            <div key="image">
                                <img src={src} alt="img"/>
                            </div>
                        )
                    }
                    // Show videos or sounds
                    return (
                        <div key="player">
                            <ReactPlayer url={src} controls width={window.innerWidth / 2.7} />
                        </div>
                    )
                })}
            </Slider>
        </DialogContent>
    </BootstrapDialog>
    )
}