import Swal from 'sweetalert2';
import { ReactNode, useEffect } from 'react';

type PopUpProps = {
  title: string;
  html: ReactNode;
  icon: 'success' | 'error' | 'warning' | 'info';
  confirmButtonText?: string;
  show?: boolean;
  onClose?: () => void;
};

const PopUp: React.FC<PopUpProps> = ({ title, html, icon, confirmButtonText = "Cerrar", show = false, onClose }) => {
  useEffect(() => {
    if (show) {
      Swal.fire({
        title,
        html : String(html),
        icon,
        confirmButtonText
      }).then(() => {
        if (onClose) {
          onClose();
        }
      });
    }
  }, [show, title, html, icon, confirmButtonText, onClose]);

  return null; 
};

export default PopUp;
