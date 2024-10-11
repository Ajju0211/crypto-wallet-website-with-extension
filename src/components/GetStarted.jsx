import styles from "../style";
import { arrowUp } from "../assets";

const GetStarted = () => {
  
  const downloadFolder = () => {
    window.location.href = "https://github.com/Ajju0211/walletextension-website/tree/main/beta";
  };
  return (
  <div  onClick={downloadFolder} className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <a href="/Users/ajay/Documents/blockchain wallet/simple/metamask-starter-file" download={true}><span className="text-gradient">Get</span></a>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-gradient">Started</span>
      </p>
    </div>
  </div>
)};

export default GetStarted;
