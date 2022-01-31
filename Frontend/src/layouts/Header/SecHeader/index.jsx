import ConnectWallet from "../../../components/ConnectWallet";
import Logo from '../logo.png';

const SecHeader = (props) => {

  return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top " id="banner">
        <div className="container text-center ">
          {/* Brand */}
          <a className="navbar-brand" href="#"><span><img draggable="false" src={Logo} alt="logo" height="80" width="80" /></span> Open Rpg</a>
          {/* Toggler/collapsibe Button */}
          <button className="navbar-toggler button-md" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* Navbar links */}

          <div className="collapse navbar-collapse text-center rounded align-items-center" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto ">
            {props.MenuInfo && props.MenuInfo.map((item , key) => (
                <li className="nav-item" key={key}>
                  <a className="nav-link text-white" href={item.path}>{item.nameLink}</a>
                </li>
              ))}
             
                <ConnectWallet />
                
                
                
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default SecHeader;