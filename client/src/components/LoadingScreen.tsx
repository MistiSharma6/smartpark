import smartParkLogo from '../assets/image.png';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen-inner">
        <div className="loading-circle" />
        <img src={smartParkLogo} alt="SmartPark" className="loading-logo" />
      </div>
    </div>
  );
}
