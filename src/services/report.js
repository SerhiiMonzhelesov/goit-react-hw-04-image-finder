import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function errorInfo(error) {
  Report.failure(`${error.code}`, `${error.response.data}`, 'OK', {
    width: '400px',
    messageFontSize: '16px',
    titleFontSize: '32px',
    svgSize: '65px',
    backOverlayClickToClose: true,
  });
}

function infoCorrectRequest(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
    timeout: '1700',
    backOverlayColor: (0, 0, 0, 0.7),
    useIcon: false,
    background: 'black',
  });
}

export { errorInfo, infoCorrectRequest };
